function InsightCard({ category, title, description, image, index }) {
	return (
		<article
			className={`relative h-72 sm:h-80 overflow-hidden rounded-3xl border border-slate-800 ${
				index === 0 ? "col-span-2" : "col-span-1"
			}`}
		>
			<img
				src={image}
				alt={title}
				className="absolute inset-0 h-full w-full object-cover"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
			<div className="relative z-10 flex h-full flex-col justify-end items-start gap-2 p-6 text-left">
				<span className="w-fit rounded-full border border-violet-500/30 bg-violet-500/20 px-3 py-1 text-xs text-violet-300">
					{category}
				</span>
				<h3 className="text-lg font-bold text-slate-50">{title}</h3>
				<p className="text-sm text-slate-400">{description}</p>
			</div>
		</article>
	)
}

export default InsightCard;