export default function BeanCard({ name, desc , good }) {
  return (
    <div className={`rounded-2xl border p-5 ${good ? "bg-sky-50 border-sky-600" : "" }`}>
        {good && <span>ดี</span>}
        <h3>{name}</h3>
        <p>{desc}</p>
    </div>
  )
}
