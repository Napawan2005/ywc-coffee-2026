import { useEffect, useState } from "react";

export default function ResultPage({ onNavigate, file }) {
  const [preview, setPreview] = useState(null);
  const sizeMB = file ? file.size / 1024 / 1024 : 0;

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-4">
      <button onClick={() => onNavigate("home")}>กลับหน้าหลัก</button>
      {file ? (
        <>
          {preview && <img src={preview} width={200} />} 
          <p className="text-sm text-stone-600">
            {file.name} · {sizeMB.toFixed(1)} MB
          </p>
        </>
      ) :(
       <p className="text-stone-500">ตัวอย่างผลประเมิน (ยังไม่ได้อัปโหลดรูป)</p>
      )
      
      }

      <span className="text-amber-800 font-semibold">ผลการประเมิน</span>
      <h1 className="text-4xl font-bold">สารกาแฟของคุณได้เกรด A</h1>
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6">
        <p className="text-sm text-stone-400">ราคาประเมิน</p>
        <p className="text-5xl font-bold">
          ฿185 <small className="text-xl">/ กก.</small>
        </p>
      </div>
    </main>
  );
}
