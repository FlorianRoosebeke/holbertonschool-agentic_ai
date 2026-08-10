<script setup>
defineProps({
	href: { type: String, required: true },
	label: { type: String, required: true },
	icon: { type: String, required: true },
});
</script>

<template>
	<a
		class="w-8 h-8 flex flex-row justify-center items-center rounded-md border border-slate-800 bg-slate-950 text-slate-50 hover:bg-violet-500 shadow-xl shadow-slate-950/40 hover:shadow-violet-500/40 transition"
		:href="href"
		target="_blank"
		rel="noopener noreferrer"
		:aria-label="label"
	>
		<i :class="`bi bi-${icon}`"></i>
	</a>
</template>
