const VARIANTS = {
	primary: "font-semibold text-violet-50 bg-violet-600 hover:bg-violet-700 transition",
	secondary: "font-semibold border border-slate-800 bg-slate-950 hover:bg-slate-900",
};

function Button({ href, children, variant = "primary", className = "", target, rel, type = "button", disabled = false, onClick }) {
	const classes = `${VARIANTS[variant]} ${className}`.trim();

	if (href) {
		return (
			<a className={classes} href={href} target={target} rel={rel}>
				{children}
			</a>
		);
	}

	return (
		<button type={type} disabled={disabled} onClick={onClick} className={classes}>
			{children}
		</button>
	);
}

export default Button;
