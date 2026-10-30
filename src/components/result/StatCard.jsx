export default function StatCard({ label, value, note }) {
  return (
    <div className="flex flex-col rounded-2xl border border-line bg-surface p-5">
      <p className="text-sm text-muted">{label}</p>
      <strong className="text-2xl font-bold">{value}</strong>
      {note && <p className="text-sm text-muted">{note}</p>}
    </div>
  );
}
