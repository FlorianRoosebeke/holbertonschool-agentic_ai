<script setup>
defineProps({
	title: { type: String, required: true },
	description: { type: String, required: true },
	icon: { type: [Object, Function], default: null },
});
</script>

<template>
	<article class="p-8 flex flex-col justify-start items-start gap-4 text-start rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
		<div v-if="icon" class="w-8 h-8 flex flex-row justify-center items-center rounded-lg bg-violet-500 shadow-lg shadow-violet-500/40">
			<component :is="icon" />
		</div>
		<h3 class="text-sm font-bold pt-3 text-slate-50">{{ title }}</h3>
		<p class="text-sm text-slate-400">{{ description }}</p>
	</article>
</template>
