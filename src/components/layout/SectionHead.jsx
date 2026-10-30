export default function SectionHead({ eyebrow, title, desc , dark }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <span className={`text-sm font-semibold ${dark ? "text-latte" : "text-accent"}`}>{eyebrow}</span>
        <h2 className="mt-1 text-3xl font-semibold">{title}</h2>
      </div>
      {desc && <p className="max-w-md text-muted">{desc}</p>}
    </div>
  );
}
