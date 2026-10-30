import { useEffect, useState } from "react";
import { beans, sampleResult } from "../data";
import Button from "../components/ui/Button";
import { calcPrice, priceRange } from "../pricing";
import PriceCard from "../components/result/PriceCard";
import StatCard from "../components/result/StatCard";
import BeanClassBar from "../components/result/BeanClassBar";
import Section from "../components/layout/Section";
import SectionHead from "../components/layout/SectionHead";

export default function ResultPage({ onNavigate, file, result, onRetry }) {
  const [preview, setPreview] = useState(null);

  const data = result ?? sampleResult;
  const counts = data.counts;
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);

  const good = counts[1];
  const defect = total - good;

  const defectPct = ((total - good) / total) * 100;

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
    <>
      <main className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-accent">
              ผลการประเมิน · {new Date().toLocaleString("th-TH")}
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              สารกาแฟของคุณ <span className="text-accent">ได้เกรด {grade}</span>
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={onRetry}>ประเมินรูปใหม่ →</Button>
            <Button variant="outline" onClick={() => onNavigate("home")}>
              กลับหน้าหลัก
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[3fr_2fr]">
          <div className="flex rounded-3xl border border-line bg-surface p-5">
            {preview ? (
              <img
                src={preview}
                alt="รูปที่อัปโหลด"
                className="min-h-72 w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="grid min-h-72 w-full place-items-center rounded-2xl bg-soft text-muted">
                ตัวอย่างผลประเมิน (ยังไม่ได้อัปโหลดรูป)
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <PriceCard
              price={price}
              min={priceMin}
              max={priceMax}
              market={data.marketPrice}
            />
            <div className="grid flex-1 grid-cols-2 gap-4">
              <StatCard label="เกรด" value={grade} note="ตามเกณฑ์ข้อบกพร่อง" />
              <StatCard
                label="เมล็ดมีข้อบกพร่อง"
                value={`${defectPct.toFixed(1)}%`}
                note={`${defect} จาก ${total} เมล็ด`}
              />
            </div>
          </div>
        </div>
      </main>

      <Section tone="surface">
        <SectionHead
          eyebrow="ผลการจำแนกเมล็ด"
          title="ในรูปนี้พบอะไรบ้าง"
          desc="สัดส่วนของแต่ละแบบเทียบกับจำนวนเมล็ดทั้งหมดที่ระบบตรวจพบ"
        />
        <div className="grid grid-cols-12 gap-4">
          {beans.map((b) => (
            <BeanClassBar key={b.id} bean={b} count={counts[b.id]} total={total} />
          ))}
        </div>
      </Section>
    </>
  );
}
