import type { ReactNode } from "react";

export type Stat = { label: string; value: string; unit?: string };
export type StatGroup = { title: string; stats: Stat[] };

function StatItem({ label, value, unit }: Stat): ReactNode {
  return (
    <div>
      <dt className="text-xs leading-tight text-muted">{label}</dt>
      <dd className="flex items-baseline gap-1.5">
        <span className="font-display whitespace-nowrap text-base font-medium md:text-sm lg:text-base tracking-tight tabular-nums">{value}</span>
        {unit && <span className="text-xs text-muted">{unit}</span>}
      </dd>
    </div>
  );
}

export function AboutStats({
  name,
  meta,
  groups,
}: {
  name: string;
  meta: { label: string; value: string }[];
  groups: StatGroup[];
}) {
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-border bg-card md:max-w-none p-4 shadow-sm sm:p-5">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Карточка</p>
      <h2 className="mt-1.5 font-display text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
        {name}
      </h2>
      <dl className="mt-1.5 space-y-0.5 text-sm">
        {meta.map((item) => (
          <div key={item.label} className="flex flex-wrap gap-x-1.5">
            <dt className="text-muted">{item.label}:</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
      {groups.map((group) => (
        <section key={group.title} className="mt-3 border-t border-border pt-3">
          <h3 className="font-display text-sm font-medium text-accent">{group.title}</h3>
          <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2.5">
            {group.stats.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
