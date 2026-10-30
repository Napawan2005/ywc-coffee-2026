import { useEffect, useState } from "react";
import { beans, sampleResult } from "../data";
import Button from "../components/Button";
import { calcPrice, goodRatio, priceRange } from "../pricing";
import PriceCard from "../components/PriceCard";
import StatCard from "../components/StatCard";
import ClassBar from "../components/ClassBar";

export default function ResultPage({ onNavigate, file, result }) {
  const [preview, setPreview] = useState(null);
  const sizeMB = file ? file.size / 1024 / 1024 : 0;

  const data = result ?? sampleResult;
  const counts = data.counts;
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);

  const good = counts[1];
  const defect = total - good;

  const defectPct = ((total - good) / total) * 100;
  console.log({ total, good, defectPct });

  let grade;
  if (defectPct <= 5) {
    grade = "A";
  } else if (defectPct <= 10) {
    grade = "B";
  } else if (defectPct <= 20) {
    grade = "C";
  } else {
    grade = "ตกเกรด";
  }

  const price = calcPrice(counts, data.marketPrice);
  const { min: priceMin, max: priceMax } = priceRange(counts, data.marketPrice);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-4">
      <Button variant="outline" onClick={() => onNavigate("home")}>
        กลับหน้าหลัก
      </Button>
      {file ? (
        <>
          {preview && <img src={preview} width={200} />}
          <p className="text-sm text-stone-600">
            {file.name} · {sizeMB.toFixed(1)} MB
          </p>
        </>
      ) : (
        <p className="text-stone-500">
          ตัวอย่างผลประเมิน (ยังไม่ได้อัปโหลดรูป)
        </p>
      )}
      <p className="text-stone-600">
        ทั้งหมด {total} เมล็ด · เมล็ดดี {good} · เสีย {defect}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <StatCard label="เกรด" value={grade} note="ตามเกณฑ์ข้อบกพร่อง" />
        <StatCard
          label="เมล็ดมีข้อบกพร่อง"
          value={`${defectPct.toFixed(1)}%`}
          note={`${defect} จาก ${total} เมล็ด`}
        />
      </div>

      <span className="text-amber-800 font-semibold">ผลการประเมิน</span>
      <h1 className="text-4xl font-bold">สารกาแฟของคุณได้เกรด {grade}</h1>

      <PriceCard
        price={price}
        min={priceMin}
        max={priceMax}
        market={data.marketPrice}
      />

      <h2 className="text-2xl font-semibold mt-6">แยกตามประเภท</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {beans.map((b) => (
          <ClassBar key={b.id} bean={b} count={counts[b.id]} total={total} />
        ))}
      </div>
    </main>
  );
}
