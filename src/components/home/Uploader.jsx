import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";

export default function Uploader({ file, onFileChange, onAnalyze, loading, onNavigate }) {
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
  const goGuide = () => {
    document.getElementById("guide")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-6 shadow-[0_20px_40px_rgba(74,44,20,.10)]">
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
        className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-6 text-center ${
          dragging
            ? "border-accent bg-latte/30"
            : "border-dashed border-latte bg-soft"
        }`}
      >
        <span className="grid h-20 w-20 place-items-center rounded-full bg-dark text-3xl text-latte">
          📷
        </span>
        <b className="font-head text-xl">อัปโหลดรูปสารกาแฟ</b>
        <small className="text-muted">
          ลากรูปมาวาง หรือเลือกด้านล่าง · JPG, PNG ไม่เกิน {MAX_MB} MB
        </small>
        <Button variant="dark" onClick={() => inputRef.current.click()}>
          เลือกรูป
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => pick(e.target.files[0])}
        />

        {file && preview && (
          <div className="relative w-full">
            <img
              src={preview}
              alt="รูปที่เลือก"
              className="h-56 w-full rounded-xl object-cover"
            />
            <button
              type="button"
              onClick={clearFile}
              aria-label="ลบรูป"
              className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-dark/80 text-white"
            >
              ✕
            </button>
          </div>
        )}

        {file && (
          <div className="flex w-full justify-between gap-3 text-sm text-muted">
            <span className={`truncate ${tooBig ? "text-bad" : ""}`}>
              {file.name}
              {tooBig && ` (เกิน ${MAX_MB} MB)`}
            </span>
            <span className="shrink-0">กด ✕ เพื่อเปลี่ยนรูป</span>
          </div>
        )}
      </div>

      <Button
        className="w-full"
        onClick={handleUpload}
        disabled={!file || tooBig || loading}
      >
        {loading ? "กำลังวิเคราะห์…" : "เริ่มประเมินราคา →"}
      </Button>

      <div className="flex flex-wrap justify-between gap-3 text-sm">
        <button type="button" onClick={goGuide} className="text-accent underline">
          อ่านวิธีถ่ายรูปก่อนอัปโหลด
        </button>
        <div className="flex gap-6">
          <button type="button" onClick={() => onNavigate("result")} className="text-accent underline">
            ตัวอย่างผลประเมิน
          </button>
          <button type="button" onClick={() => onNavigate("error")} className="text-accent underline">
            ตัวอย่าง: รูปไม่ผ่าน
          </button>
        </div>
      </div>
    </div>
  );
}
