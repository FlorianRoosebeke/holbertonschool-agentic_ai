function FeatureCard({ title, description, Icon }) {
	return (
		<article className="p-8 flex flex-col justify-start items-start gap-4 text-start rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
			{Icon && <div className="w-8 h-8 flex flex-row justify-center items-center rounded-lg bg-violet-500 shadow-lg shadow-violet-500/40"><Icon/></div>}
			<h3 className="text-sm font-bold pt-3 text-slate-50">{title}</h3>
			<p className="text-sm text-slate-400">{description}</p>
		</article>
	);
}

export default FeatureCard;