function StatCard({ value, label }) {
	return (
		<li className="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
			<strong className="block text-4xl font-black text-violet-300">{value}</strong>
			<span className="block mt-1 text-xs text-slate-400">{label}</span>
		</li>
	);
}

export default StatCard;
