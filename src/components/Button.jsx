const variants = {
  primary: "bg-accent text-white",
  outline: "border-[1.5px] border-accent text-accent",
  latte: "bg-latte text-ink",
  ghost: "border-[1.5px] border-latte text-[#F3E6D6]"
};


export default function Button({  variant = "primary", children , ...rest}){
    return (
        <button 
        className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-xl px-6 font-head text-base font-semibold disabled:opacity-45 disabled:cursor-not-allowed ${variants[variant]}`}

        {...rest}>
            {children}

        </button>
    )
}