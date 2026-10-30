import Button from "../components/Button"

export default function ErrorPage({ onNavigate, reason }) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-14 md:items-start">
      <div className="flex flex-col gap-4">
        <span className="text-sm font-semibold text-bad">⚠ รูปไม่ผ่านการตรวจ</span>
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight">รูปนี้ยังประเมินราคาไม่ได้</h1>
        <p>{reason || "ระบบพบว่าแสงไม่พอ"} ถ่ายใกล้หน้าต่างแล้วอัปโหลดใหม่</p>
        <Button variant="outline" className="self-start" onClick={() => onNavigate("home")}>กลับหน้าหลัก</Button>
      </div>
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-line bg-surface p-6 text-center shadow-[0_20px_40px_rgba(74,44,20,.10)]">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-dark text-3xl text-latte">
          ⚠
        </span>
        <b className="font-head text-xl">ลองถ่ายรูปใหม่อีกครั้ง</b>
        <small className="text-muted">ถ่ายใกล้หน้าต่าง ไม่ใช้แฟลช · JPG, PNG ไม่เกิน 10 MB</small>
      </div>
    </main>
  )
}
