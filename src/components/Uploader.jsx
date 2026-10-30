import { useEffect, useRef, useState } from "react";
import Button from "./Button";

export default function Uploader({ file, onFileChange, onAnalyze, loading }) {
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

    <div className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-6 shadow-[0_20px_40px_rgba(74,44,20,.10)]">
      <label
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
        className={
          dragging
            ? "block border-2 border-accent bg-latte/30 rounded-xl p-8 text-center cursor-pointer"
            : "block border-2 border-dashed border-line bg-soft rounded-xl p-8 text-center cursor-pointer"
        }
      >
        ลากรูปมาวาง หรือคลิกเพื่อเลือก
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => pick(e.target.files[0])}
        />
      </label>
      <p className="text-sm text-muted">
        รองรับ JPG, PNG, WEBP · ไม่เกิน {MAX_MB} MB
      </p>
      {file && (
        <>
          {preview && <img src={preview} alt="รูปที่เลือก" className="w-full max-h-80 object-contain rounded-xl" />}
          <p
            className={
              tooBig ? "text-sm text-bad" : "text-sm text-muted"
            }
          >
            {file.name} · {sizeMB.toFixed(1)} MB{" "}
            {tooBig && `(เกิน ${MAX_MB} MB)`}
          </p>

          <button
            onClick={clearFile}
            className="text-muted hover:text-bad px-3"
          >
            ✕
          </button>

          <Button onClick={handleUpload} disabled={tooBig || loading}>
            {loading ? "กำลังวิเคราะห์…" : "เริ่มประเมินราคา"}
          </Button>
        </>
      )}
    </div>
  );
}
