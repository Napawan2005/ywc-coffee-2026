export default function Tip({ title , bad , children }) {
    return (
        <div className="bg-stone-800 rounded-2xl p-5 flex flex-col gap-3">
            <h3>{title}</h3>
            <p>{children}</p>
            <div className="mt-auto flex justify-between text-sm font-semibold">
                <span className="text-green-400">✓ ถูก</span>
                <span className="text-orange-300">{bad}</span>
            </div>
        </div>
    )
}
