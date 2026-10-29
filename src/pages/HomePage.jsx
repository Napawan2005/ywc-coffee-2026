import BeanCard from "../components/BeanCard";
import { beans } from "../data";
import Tip from "../components/Tip";
import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";

export default function HomePage({ onNavigate, file, onFileChange, loading, onAnalyze }) {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const MAX_MB = 10;
  const sizeMB = file ? file.size / 1024 / 1024 : 0;
  const tooBig = sizeMB >= MAX_MB;

  const clearFile = () => {
    onFileChange(null);
    setPreview(null);
    inputRef.current.value = "";
  };

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleUpload = () => {
    if (!file) return;
    onAnalyze();
  };

  const pick = (f) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      alert("รองรับเฉพาะไฟล์รูปภาพ");
      return;
    }
    onFileChange(f);
  };

  return (
    <>
      <main className="wrap hero">
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
        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => pick(e.target.files[0])}
          />
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              pick(e.dataTransfer.files[0]);
            }}
            onClick={() => inputRef.current.click()}
            className={
              dragging
                ? "border-2 border-amber-600 bg-amber-50 rounded-xl p-8 text-center cursor-pointer"
                : "border-2 border-dashed border-stone-300 rounded-xl p-8 text-center cursor-pointer"
            }
          >
            ลากรูปมาวาง หรือคลิกเพื่อเลือก
          </div>
          <p className="text-sm text-stone-500">
            รองรับ JPG, PNG, WEBP · ไม่เกิน {MAX_MB} MB
          </p>
          {file && (
            <>
              <img src={preview} width={200} />
              <p
                className={
                  tooBig ? "text-sm text-red-600" : "text-sm text-stone-600"
                }
              >
                {file.name} · {sizeMB.toFixed(1)} MB{" "}
                {tooBig && `(เกิน ${MAX_MB} MB)`}
              </p>

              <button onClick={clearFile} className="text-stone-500 hover:text-red-600 px-3">✕</button>

              <Button onClick={handleUpload} disabled={tooBig || loading}>
                {loading ? "กำลังวิเคราะห์…" : "เริ่มประเมินราคา"}
              </Button>
            </>
          )}
        </div>
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
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6">จำแนกเมล็ดได้ 7 แบบ</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {beans.map((b) => (
            <BeanCard key={b.id} name={b.name} desc={b.desc} good={b.good} />
          ))}
        </div>
      </section>
      <section className="bg-stone-900 text-stone-100">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">
            ถ่ายแบบนี้ ผ่านการตรวจแน่นอน
          </h2>
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
        </div>
      </section>
    </>
  );
}
