import BeanCard from "../components/BeanCard";
import { beans } from "../data";
import Tip from "../components/Tip";
import Button from "../components/Button";
import Uploader from "../components/Uploader";
import Section from "../components/Section";
import SectionHead from "../components/SectionHead";

export default function HomePage({ onNavigate, file, onFileChange, loading, onAnalyze }) {
  

  return (
    <>
      <main className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <h1 className="text-accent bg-latte">
            ถ่ายรูปสารกาแฟ
            <br />
            <span>รู้เกรดและราคา</span>
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
        />
      </main>
      <div className="flex gap-3 mt-6">
        <Button
          variant="outline"
          onClick={() => onNavigate("result")}
        >
          ตัวอย่างผลประเมิน
        </Button>

        <Button
          variant="outline"
          onClick={() => onNavigate("error")}
        >
          ตัวอย่าง: รูปไม่ผ่าน
        </Button>
      </div>
      <Section tone="surface" id="classes">
        <SectionHead
          eyebrow="ระบบตรวจอะไรบ้าง"
          title="จำแนกเมล็ดได้ 7 แบบ"
          desc="เมล็ดคุณภาพดี 1 แบบ และข้อบกพร่อง 6 แบบ ใช้คำนวณเปอร์เซ็นต์เมล็ดเสียและเกรด"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {beans.map((b) => (
            <BeanCard key={b.id} name={b.name} desc={b.desc} good={b.good} />
          ))}
        </div>
      </Section>
      <Section tone="dark" id="guide">
        <SectionHead dark eyebrow="ก่อนถ่ายรูป" title="ถ่ายแบบนี้ ผ่านการตรวจแน่นอน" />
        <div className="grid md:grid-cols-4 gap-4">
          <Tip title="วางบนพื้นสีขาวเรียบ" bad="✗ พื้นมีสี/ลาย">
            กระดาษหรือถาด<b>สีขาว</b> ไม่มีลวดลาย
          </Tip>

          <Tip title="เกลี่ยไม่ให้ซ้อนกัน" bad="✗ เมล็ดซ้อนกัน">
            ประมาณ 100 เมล็ดต่อรูป เห็นทุกเมล็ดชัด
          </Tip>

          <Tip title="แสงสว่างพอ ไม่มีเงา" bad="✗ มืด / มีเงา">
            ใช้แสงธรรมชาติ ไม่ใช้แฟลช
          </Tip>

          <Tip title="วางไม้บรรทัดเทียบขนาด" bad="✗ ไม่มี (ไม่บังคับ)">
            ให้ระบบวัดขนาดเมล็ดได้ด้วย
          </Tip>
        </div>
      </Section>
    </>
  );
}
