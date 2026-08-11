<script>
	import features from "../../data/features";
	import FeatureCard from "../cards/FeatureCard.svelte";
	import SectionBadge from "../ui/SectionBadge.svelte";
	import SectionTitle from "../ui/SectionTitle.svelte";
</script>

<section
	id="features-section"
	class="relative py-24 flex flex-col justify-center items-center bg-black overflow-hidden"
>
	<div
		class="relative w-full max-w-6xl mx-auto px-6 flex flex-col justify-center items-center gap-8 text-center"
	>
		<div class="flex flex-col items-center text-center gap-8">
			<SectionBadge>✧ Features ✧</SectionBadge>
		</div>
		<div class="flex flex-col item-center text-center">
			<SectionTitle
				class="max-w-4xl font-black tracking-tight leading-none text-4xl md:text-5xl text-slate-50"
				highlight="With powerful AI agents">Everything you need to build</SectionTitle
			>
		</div>
		<div>
			<p class="text-slate-400">
				Powerful tools designed to help your agents plan, reason, and execute — without the
				complexity.
			</p>
		</div>
	</div>
	<div class="w-full mx-auto mt-12 grid md:grid-cols-3 gap-8">
		{#each features as feature (feature.title)}
			<FeatureCard
				Icon={feature.icon}
				title={feature.title}
				description={feature.description}
			/>
		{/each}
	</div>
</section>
