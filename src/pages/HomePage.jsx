import BeanCard from "../components/home/BeanCard";
import { beans } from "../lib/data_beans";
import PhotoTip from "../components/home/PhotoTip";
import Uploader from "../components/home/Uploader";
import Section from "../components/layout/Section";
import SectionHead from "../components/layout/SectionHead";

export default function HomePage({
  onNavigate,
  file,
  onFileChange,
  loading,
  onAnalyze,
}) {
  return (
    <>
      <main className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-14 md:items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            ถ่ายรูปสารกาแฟ
            <br />
            <span className="text-accent">รู้เกรดและราคา</span>
            <br />
            ในไม่กี่วินาที
          </h1>
          <p>
            ระบบ AI นับเมล็ดดีและเมล็ดเสียทีละเมล็ด
            แล้วประเมินราคาเบื้องต้นจากราคาตลาด
          </p>
        </div>
        <Uploader
          file={file}
          onFileChange={onFileChange}
          onAnalyze={onAnalyze}
          loading={loading}
          onNavigate={onNavigate}
        />
      </main>
      <Section tone="surface" id="classes">
        <SectionHead
          eyebrow="ระบบตรวจอะไรบ้าง"
          title="จำแนกเมล็ดได้ 7 แบบ"
          desc="เมล็ดคุณภาพดี 1 แบบ และข้อบกพร่อง 6 แบบ ใช้คำนวณเปอร์เซ็นต์เมล็ดเสียและเกรด"
        />
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4">
          {beans.map((b) => (
            <BeanCard key={b.id} {...b} />
          ))}
        </div>
      </Section>
      <Section tone="dark" id="guide">
        <SectionHead
          dark
          eyebrow="ก่อนถ่ายรูป"
          title="ถ่ายแบบนี้ ผ่านการตรวจแน่นอน"
        />
        <div className="grid md:grid-cols-4 gap-4">
          <PhotoTip title="วางบนพื้นสีขาวเรียบ" bad="✗ พื้นมีสี/ลาย"  badBg="bg-floor-pattern">
            กระดาษหรือถาด<b>สีขาว</b> ไม่มีลวดลาย
          </PhotoTip>

          <PhotoTip title="เกลี่ยไม่ให้ซ้อนกัน" bad="✗ เมล็ดซ้อนกัน" stacked>
            ประมาณ 100 เมล็ดต่อรูป เห็นทุกเมล็ดชัด
          </PhotoTip>

          <PhotoTip title="แสงสว่างพอ ไม่มีเงา" bad="✗ มืด / มีเงา" badBg="bg-floor-dim" badFill="#5B6142">
            ใช้แสงธรรมชาติ ไม่ใช้แฟลช
          </PhotoTip>

          <div className="bg-dark2 rounded-2xl p-5 flex flex-col gap-3">
            <div className="grid h-24 place-items-center rounded-lg bg-white">
              <svg width="150" height="60" viewBox="0 0 150 60" aria-hidden="true">
                <rect x="8" y="38" width="134" height="16" rx="2" fill="#F1E3CC" stroke="#C9A882" />
                <path
                  d="M18 38v8M32 38v5M46 38v8M60 38v5M74 38v8M88 38v5M102 38v8M116 38v5M130 38v8"
                  stroke="#7A4A24"
                  strokeWidth="1.4"
                />
                <ellipse cx="50" cy="18" rx="7" ry="10" fill="#A4B077" />
                <ellipse cx="84" cy="18" rx="7" ry="10" fill="#A4B077" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-latte">ตัวเลือกเสริม</span>
            <h3 className="text-lg font-semibold">วางไม้บรรทัดเทียบขนาด</h3>
            <p className="text-sm text-dark-muted">ให้ระบบวัดขนาดเมล็ดได้ด้วย</p>
          </div>
        </div>
      </Section>
    </>
  );
}
