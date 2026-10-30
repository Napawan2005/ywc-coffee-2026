const tones = {
  light: "",
  surface: "bg-surface border-y border-line",
  dark: "bg-dark text-[#F3E6D6]",
};

export default function Section({ tone = "light", id, children }) {
  return (
    <section id={id} className={tones[tone]}>
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-7">{children}</div>
    </section>
  );
}
