import BeanPile from "../icons/BeanPile"

export default function PhotoTip({ title, bad, children, badBg = "bg-white", badFill, stacked }) {
    return (
        <div className="bg-dark2 rounded-2xl p-5 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
                <div className="grid h-24 place-items-center rounded-lg bg-white">
                    <BeanPile />
                </div>
                <div className={`grid h-24 place-items-center rounded-lg ${badBg}`}>
                    <BeanPile fill={badFill} stacked={stacked} />
                </div>
            </div>
            <div className="flex justify-between text-sm font-semibold">
                <span className="text-ok">✓ ถูก</span>
                <span className="text-no">{bad}</span>
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-dark-muted">{children}</p>
        </div>
    )
}
