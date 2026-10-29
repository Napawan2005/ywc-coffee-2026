import BeanCard from "../components/BeanCard";
import { beans } from "../data";
import Tip from "../components/Tip";
import { useEffect, useRef, useState } from "react";


export default function HomePage({ onNavigate }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const MAX_MB = 10;
  const sizeMB = file ? file.size / 1024 / 1024 : 0;
  const tooBig = sizeMB >= MAX_MB;


  const clearFile = () => {
    setFile(null);
    setPreview(null);
    inputRef.current.value = "";
  };

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleUpload = async () => {
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    await fetch("/api/upload", { method: "POST", body: fd });
  };

  return (
    <>
      <main className="wrap hero">
        <div>
          <h1>
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
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file && (
            <>
              <p
                className={
                  tooBig ? "text-sm text-red-600" : "text-sm text-stone-600"
                }
              >
                {file.name} · {sizeMB.toFixed(1)} MB{" "}
                {tooBig && `(เกิน ${MAX_MB} MB)`}
              </p>

              {preview && <img src={preview} width={200} />}
              <button onClick={clearFile}>✕</button>
              <button onClick={handleUpload} disabled={tooBig}>
                อัปโหลด
              </button>
            </>
          )}
        </div>
      </main>
      <div className="flex gap-3 mt-6">
        <button
          className="bg-amber-800 text-white rounded-xl p-6 font-semibold"
          onClick={() => onNavigate("result")}
        >
          ตัวอย่างผลประเมิน
        </button>

        <button
          className="border border-amber-800 text-amber-800 rounded-xl px-5 py-3 font-semibold"
          onClick={() => onNavigate("error")}
        >
          ตัวอย่าง: รูปไม่ผ่าน
        </button>
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
