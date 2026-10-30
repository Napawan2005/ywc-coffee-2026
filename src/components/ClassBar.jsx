import BeanIcon from "./BeanIcon";

export default function ClassBar({ bean, count, total }) {
  const pct = total ? (count /total) * 100 : 0;

  return (
    <div className={`flex flex-col gap-3 rounded-2xl border p-5 ${
      bean.wide ? "col-span-12 md:col-span-4" : "col-span-6 md:col-span-3"
    } ${bean.good ? "border-good bg-good-bg" : "border-line bg-bg"}`}>

      <div className="flex items-center gap-3">
        <BeanIcon id={bean.id} size={44} />
        <h3 className="font-semibold">{bean.name}</h3>
      </div>

      <div className="flex items-baseline justify-between">
        <strong className="font-head text-2xl">{pct.toFixed(1)}%</strong>
        <span className="text-sm text-muted">{count} เมล็ด</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-track">
        <span
          className={`block h-full rounded-full ${bean.good ? "bg-good" : "bg-bar"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
