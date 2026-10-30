import Button from "../components/Button"
import Beans from "../components/Beans"

const checks = [
  { label: "แสงไม่พอ", detail: "รูปมืดเกินไป ระบบมองไม่เห็นสีเมล็ดชัด", pass: false },
  { label: "ความคมชัด", detail: "รูปไม่เบลอ", pass: true },
  { label: "เป็นสารกาแฟ", detail: "ระบบพบเมล็ดสารกาแฟในรูป", pass: true },
]

export default function ErrorPage({ onNavigate, reason }) {
  const problems = checks.filter((c) => !c.pass).length

  return (
    <main className="max-w-6xl mx-auto px-6 py-14 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <span className="self-start rounded-full bg-bad-bg p-4 text-sm font-semibold text-bad">
          ⚠ รูปไม่ผ่านการตรวจ
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
          รูปนี้ยังประเมิน<span className="text-accent">ราคาไม่ได้</span>
        </h1>
        <p className="text-lg text-muted">
          {reason && `${reason} · `}ระบบพบปัญหา {problems} ข้อ แก้ตามคำแนะนำแล้วอัปโหลดใหม่ได้เลย
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:items-start">
        <div className="rounded-3xl border border-line bg-surface p-5">
          <div className="relative grid h-80 place-items-center rounded-2xl bg-floor-dim">
            <div className="scale-[2.5]">
              <Beans fill="#5B6142" />
            </div>
            <span className="absolute bottom-3 left-3 rounded-full bg-dark/85 px-3 py-1 text-xs text-bg">
              ภาพประกอบ · รูปที่อัปโหลด
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border border-line bg-surface px-6">
            {checks.map((c) => (
              <div key={c.label} className="flex items-center gap-4 border-b border-line py-4 last:border-b-0">
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-bold ${
                    c.pass ? "bg-good-bg text-good" : "bg-bad-bg text-bad"
                  }`}
                >
                  {c.pass ? "✓" : "✕"}
                </span>
                <div className="flex-1">
                  <strong className="font-head">{c.label}</strong>
                  <p className="text-sm text-muted">{c.detail}</p>
                </div>
                <span className={`text-sm font-semibold ${c.pass ? "text-good" : "text-bad"}`}>
                  {c.pass ? "ผ่าน" : "ไม่ผ่าน"}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 rounded-3xl bg-dark p-6 text-dark-ink">
            <div>
              <span className="text-sm font-semibold text-latte">วิธีแก้</span>
              <p className="mt-1 text-dark-muted">
                ถ่ายใกล้หน้าต่างหรือกลางแจ้งที่ไม่โดนแดดตรง ไม่ใช้แฟลช และระวังเงามือบังเมล็ด
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="latte" className="flex-1" onClick={() => onNavigate("home")}>
                อัปโหลดรูปใหม่ →
              </Button>
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => {
                  onNavigate("home");
                  setTimeout(() => document.getElementById("guide")?.scrollIntoView({ behavior: "smooth" }), 0);
                }}
              >
                ดูวิธีถ่ายรูป
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
