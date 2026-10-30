const variants = {
  primary: "bg-accent text-white",
  outline: "border-[1.5px] border-accent text-accent",
  latte: "bg-latte text-ink",
  dark: "bg-dark text-surface",
  ghost: "border-[1.5px] border-latte text-dark-ink"
};


export default function Button({  variant = "primary", className = "", children , ...rest}){
    return (
        <button 
        className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-xl px-6 font-head text-base font-semibold disabled:opacity-45 disabled:cursor-not-allowed ${variants[variant]} ${className}`}

        {...rest}>
            {children}

        </button>
    )
}