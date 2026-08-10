<script setup>
defineProps({
	value: { type: String, required: true },
	label: { type: String, required: true },
});
</script>

<template>
	<li class="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
		<strong class="block text-4xl font-black text-violet-300">{{ value }}</strong>
		<span class="block mt-1 text-xs text-slate-400">{{ label }}</span>
	</li>
</template>
