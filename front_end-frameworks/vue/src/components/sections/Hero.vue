<script setup>
import SectionBadge from "../ui/SectionBadge.vue";
import SectionTitle from "../ui/SectionTitle.vue";
import Button from "../ui/Button.vue";
import StatCard from "../cards/StatCard.vue";
import stats from "../../data/stats";
</script>

<template>
	<section id="hero-section" class="bg-slate-950 pt-24 pb-12">
		<div class="flex flex-col items-center text-center gap-8">
			<div>
				<SectionBadge> ✧ The future of coding ✧</SectionBadge>
			</div>
			<div>
				<SectionTitle as="h1" class="text-4xl md:text-6xl font-black tracking-tight leading-none text-slate-50" highlight="with Agentic AI">Build smarter workflows </SectionTitle>
			</div>
			<div>
				<p class="max-w-2xl text-sm md:text-base text-slate-300">Create autonomous AI agents that think, plan, and execute complex tasks. Transform your business with intelligent automation.</p>
			</div>
			<div class="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
				<Button href="https://www.holbertonschool.fr/" class="px-4 py-2 rounded-md shadow-lg shadow-violet-500/30">Start learning with Holberton School</Button>

				<Button href="https://www.holbertonschool.fr/methodologie" variant="secondary" class="px-4 py-2 rounded-md text-slate-50">Methodology</Button>
			</div>
		</div>
		<div class="flex flex-col items-center text-center gap-8">
			<ul class="w-full max-w-4xl mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
				<StatCard
					v-for="stat in stats"
					:key="stat.label"
					:value="stat.value"
					:label="stat.label"
				/>
			</ul>
		</div>
	</section>
</template>
