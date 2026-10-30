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
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-dark text-latte">
            ☕
          </span>
          <span>
            <b className="block font-head">สุด cool 101</b>
            <small className="text-muted">ประเมินราคาสารกาแฟ</small>
          </span>
        </button>
        <nav className=" hidden sm:flex gap-2">
          <button
            onClick={() => goTo("classes")}
            className="rounded-lg px-3 py-2 text-muted hover:bg-soft hover:text-ink"
          >
            ระบบตรวจอะไร
          </button>
          <button onClick={() => goTo("guide")} className="rounded-lg px-3 py-2 text-muted hover:bg-soft hover:text-ink">
            วิธีถ่ายรูป
          </button>
        </nav>
      </div>
    </header>
  );
}
