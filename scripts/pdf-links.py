"""Печатает JSON со всеми ссылками из PDF: [{"file": ..., "page": ..., "uri": ...}].
Использование: python3 scripts/pdf-links.py public/a.pdf public/b.pdf
Нужен PyMuPDF: pip install pymupdf
"""
import json
import os
import sys

import fitz

out = []
for path in sys.argv[1:]:
    with fitz.open(path) as doc:
        for page in doc:
            for link in page.get_links():
                uri = link.get("uri")
                if uri:
                    out.append({"file": os.path.basename(path), "page": page.number + 1, "uri": uri})
print(json.dumps(out, ensure_ascii=False))
