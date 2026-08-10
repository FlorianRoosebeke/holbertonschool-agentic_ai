<script setup>
import { ref, onMounted } from "vue";
import { getInsights } from "../../services/insightsService";
import InsightCard from "../cards/InsightCard.vue";
import SectionBadge from "../ui/SectionBadge.vue";
import SectionTitle from "../ui/SectionTitle.vue";

const insights = ref([]);
const error = ref("");

onMounted(async () => {
	try {
		const res = await getInsights();
		insights.value = res;
	} catch {
		error.value = "loading insights error";
	}
});
</script>

<template>
	<section id="insights-section" class="relative py-24 flex flex-col justify-center items-center bg-black overflow-hidden">
		<div class="pb-10 flex flex-col items-center text-center gap-8">
			<SectionBadge> ✧  Insights  ✧</SectionBadge>
		</div>
		<div>
			<SectionTitle class="text-4xl md:text-6xl font-black tracking-tight leading-none text-slate-50 block text-center" highlight="Through real-world scenes" highlight-class="justify-center items-center block text-violet-300">Explore Agentic AI </SectionTitle>
		</div>
		<div class="w-full max-w-6xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
			<InsightCard
				v-for="(insight, index) in insights"
				:key="insight.title"
				:category="insight.category"
				:title="insight.title"
				:description="insight.description"
				:image="insight.image"
				:index="index"
			/>
		</div>
		<div>
			<p v-if="error" class="text-red-400">{{ error }}</p>
		</div>
	</section>
</template>
