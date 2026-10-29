export default function ResultPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-4">
      <span className="text-amber-800 font-semibold">ผลการประเมิน</span>
      <h1 className="text-4xl font-bold">สารกาแฟของคุณได้เกรด A</h1>
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6">
        <p className="text-sm text-stone-400">ราคาประเมิน</p>
        <p className="text-5xl font-bold">฿185 <small className="text-xl">/ กก.</small></p>
      </div>
    </main>
  )
}
