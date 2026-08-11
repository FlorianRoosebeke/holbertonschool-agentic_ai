<script>
	import { onMount } from "svelte";
	import { getInsights } from "../../services/insightsService";
	import InsightCard from "../cards/InsightCard.svelte";
	import SectionBadge from "../ui/SectionBadge.svelte";
	import SectionTitle from "../ui/SectionTitle.svelte";

	let insights = $state([]);
	let error = $state("");

	onMount(async () => {
		try {
			insights = await getInsights();
		} catch {
			error = "loading insights error";
		}
	});
</script>

<section
	id="insights-section"
	class="relative py-24 flex flex-col justify-center items-center bg-black overflow-hidden"
>
	<div class="pb-10 flex flex-col items-center text-center gap-8">
		<SectionBadge>✧ Insights ✧</SectionBadge>
	</div>
	<div>
		<SectionTitle
			class="text-4xl md:text-6xl font-black tracking-tight leading-none text-slate-50 block text-center"
			highlight="Through real-world scenes"
			highlightClass="justify-center items-center block text-violet-300"
			>Explore Agentic AI</SectionTitle
		>
	</div>
	<div
		class="w-full max-w-6xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6"
	>
		{#each insights as insight, index (insight.title)}
			<InsightCard
				category={insight.category}
				title={insight.title}
				description={insight.description}
				image={insight.image}
				{index}
			/>
		{/each}
	</div>
	<div>
		{#if error}
			<p class="text-red-400">{error}</p>
		{/if}
	</div>
</section>
