import Button from "../components/Button"

export default function ErrorPage({ onNavigate, reason }) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-4">
    <Button variant="outline" onClick={() => onNavigate("home")}>กลับหน้าหลัก</Button>
      <span className="bg-red-100 text-red-800 rounded-full px-3 py-1 self-start">
        ⚠ รูปไม่ผ่านการตรวจ
      </span>
      <h1 className="text-4xl font-bold">รูปนี้ยังประเมินราคาไม่ได้</h1>
      <p className="text-stone-600">{reason || "ระบบพบว่าแสงไม่พอ"} ถ่ายใกล้หน้าต่างแล้วอัปโหลดใหม่</p>
    </main>
  )
}
