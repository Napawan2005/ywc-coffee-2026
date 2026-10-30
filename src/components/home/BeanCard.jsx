import BeanIcon from "../icons/BeanIcon";

export default function BeanCard({ id, name, desc, good, wide }) {
  return (
    <div className={`relative h-full rounded-2xl border p-5 flex flex-col gap-3 ${wide ? "md:col-span-4" : "md:col-span-3"} ${good ? "bg-good-bg border-good" : "bg-surface border-line"}`}>
      <span
        className={`absolute right-4 top-4 rounded-full px-3 py-0.5 text-xs font-semibold ${
          good ? "bg-good text-white" : "bg-bad-bg text-bad"
        }`}
      >
        {good ? "ดี" : "ตำหนิ"}
      </span>
      <BeanIcon id={id} />
      <h3 className="text-lg font-semibold leading-snug">{name}</h3>
      <p className="text-sm text-muted">{desc}</p>
    </div>
  )
}

