export default function PriceCard({ price, min, max, market }) {
  return (
    <div className="flex flex-col gap-2 rounded-3xl bg-dark p-7 text-dark-ink">
      <span className="text-sm font-semibold text-latte">ราคาประเมิน</span>
      <strong className="font-head text-5xl">
        ฿{price} <small className="text-xl font-medium text-dark-muted">/ กก.</small>
      </strong>
      <span className="text-sm text-dark-muted">ช่วงราคา ฿{min} – ฿{max}</span>
      <span className="mt-2 border-t border-[#4A3426] pt-3 text-sm text-dark-muted">
        อ้างอิงราคาตลาด ฿{market} / กก.
      </span>
    </div>
  );
}
