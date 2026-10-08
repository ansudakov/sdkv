#!/usr/bin/env python3
"""Обрезает шрифты, встроенные в SVG-иллюстрации (@font-face с base64 woff2), до букв,
которые реально есть в тексте этого SVG. Вес файла падает в разы, картинка не меняется.

Запуск:  python3 scripts/subset-svg-fonts.py public/blog/<имя>.svg [ещё.svg ...]
Нужно:   pip install fonttools brotli
После правки текста в SVG запускать заново на исходном (полном) файле: если в SVG уже обрезанные шрифты,
новых букв в них нет, и скрипт ничего не вернёт.
"""
from __future__ import annotations

import base64, io, re, sys
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer


def text_chars(svg: str) -> set[str]:
    chars = set()
    for m in re.finditer(r"<(text|tspan|title|desc)\b[^>]*>(.*?)</\1>", svg, re.S):
        chars |= set(re.sub(r"<[^>]+>", "", m.group(2)))
    chars |= set(" 0123456789.,:;!?()-–—«»\"'%/+")  # запас на знаки препинания
    chars.discard("\n")
    return chars


def subset_font(data: bytes, chars: set[str], weight_range: tuple[float, float] | None) -> bytes:
    font = TTFont(io.BytesIO(data))
    # 1) оставляем только нужные буквы и самые нужные возможности шрифта
    opts = subset.Options()
    opts.layout_features = ["kern", "liga", "calt", "ccmp", "locl", "mark", "mkmk", "rlig"]
    opts.notdef_glyph = True
    opts.notdef_outline = True
    opts.name_IDs = [1, 2]
    opts.drop_tables += ["STAT", "MVAR"]
    sub = subset.Subsetter(opts)
    sub.populate(text="".join(sorted(chars)))
    sub.subset(font)
    # 2) у вариативного шрифта оставляем только нужный диапазон жирности (как в font-weight у @font-face)
    if weight_range and "fvar" in font:
        axes = {a.axisTag: a for a in font["fvar"].axes}
        if "wght" in axes:
            lo = max(weight_range[0], axes["wght"].minValue)
            hi = min(weight_range[1], axes["wght"].maxValue)
            font = instancer.instantiateVariableFont(font, {"wght": (lo, hi)})
    out = io.BytesIO()
    font.flavor = "woff2"
    font.save(out)
    return out.getvalue()


def process(path: str) -> None:
    svg = open(path, encoding="utf8").read()
    chars = text_chars(svg)
    before = len(svg)

    def repl_face(m):
        block = m.group(0)
        w = re.search(r"font-weight:\s*(\d+)(?:\s+(\d+))?", block)
        rng = (float(w.group(1)), float(w.group(2) or w.group(1))) if w else None

        def repl(mm):
            new = subset_font(base64.b64decode(mm.group(1)), chars, rng)
            return "base64," + base64.b64encode(new).decode()

        return re.sub(r"base64,([A-Za-z0-9+/=]{100,})", repl, block)

    svg = re.sub(r"@font-face\s*\{[^}]*\}", repl_face, svg)
    open(path, "w", encoding="utf8").write(svg)
    print(f"{path}: {before/1024:.0f} KB -> {len(svg)/1024:.0f} KB, символов в тексте: {len(chars)}")


if __name__ == "__main__":
    for p in sys.argv[1:]:
        process(p)
