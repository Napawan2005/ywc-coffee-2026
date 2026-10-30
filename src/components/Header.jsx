export default function Header({ onNavigate }) {

    const goTo = (id) => {
        onNavigate("home");
        setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 0);
    };

  return (
    <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => {
            onNavigate("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 text-left"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-dark text-latte">☕</span>
          <span>
            <b className="block font-head">สุด cool 101</b>
            <small className="text-muted">ประเมินราคาสารกาแฟ</small>
          </span>
        </button>
        {/* ขั้น 3: เมนูจะมาอยู่ตรงนี้ */}
      </div>
    </header>
  )
}
