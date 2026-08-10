import { useState } from "react";
import { useEffect } from "react";
import { getInsights } from "../../services/insightsService";
import InsightCard from "../cards/InsightCard";
import SectionBadge from "../ui/SectionBadge";
import SectionTitle from "../ui/SectionTitle";

function Insights() {
	const [insights, setInsights] = useState([]);
	const [error, setError] = useState("");
	useEffect(() => {
		async function fetchData() {
			try {
				const res = await getInsights()
				setInsights(res)
			} catch {
				setError("loading insights error")
			}
		}
		fetchData()
	}, [])
	return (
		<section id="insights-section" className="relative py-24 flex flex-col justify-center items-center bg-black overflow-hidden">
			<div className="pb-10 flex flex-col items-center text-center gap-8">
				<SectionBadge> ✧  Insights  ✧</SectionBadge>
			</div >
			<div>
				<SectionTitle className="text-4xl md:text-6xl font-black tracking-tight leading-none text-slate-50 block text-center" highlight="Through real-world scenes" highlightClassName="justify-center items-center block text-violet-300">Explore Agentic AI </SectionTitle>
			</div>
			<div className="w-full max-w-6xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
				{insights.map((insight, index) => (
					<InsightCard
						key={insight.title}
						category={insight.category}
						title={insight.title}
						description={insight.description}
						image={insight.image}
						index={index}
					/>
				))}
			</div>
			<div>{error && <p className="text-red-400">{error}</p>}</div>
		</section>
	)
}

export default Insights;