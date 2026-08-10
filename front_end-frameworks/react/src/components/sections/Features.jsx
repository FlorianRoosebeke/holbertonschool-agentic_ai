import features from "../../data/features";
import FeatureCard from "../cards/FeatureCard";
import SectionBadge from "../ui/SectionBadge";
import SectionTitle from "../ui/SectionTitle";

function Features() {
	return (
		<section id="features-section" className="relative py-24 flex flex-col justify-center items-center bg-black overflow-hidden">
			<div className="relative w-full max-w-6xl mx-auto px-6 flex flex-col justify-center items-center gap-8 text-center">

				<div className=" flex flex-col items-center text-center gap-8">
					<SectionBadge> ✧  Features  ✧</SectionBadge>
				</div >
				<div className="flex flex-col item-center text-center">
					<SectionTitle className="max-w-4xl font-black tracking-tight leading-none text-4xl md:text-5xl text-slate-50" highlight="With powerful AI agents"> Everything you need to build </SectionTitle>
				</div>
				<div>
					<p className="text-slate-400">Powerful tools designed to help your agents plan, reason, and execute — without the complexity.</p>
				</div>
			</div>
			<div className="w-full mx-auto mt-12 grid md:grid-cols-3 gap-8">

				{features.map((feature) => (
					<FeatureCard
						key={feature.title}
						Icon={feature.icon}
						title={feature.title}
						description={feature.description}
					/>
				))
				}
			</div>
		</section>
	)
}

export default Features;