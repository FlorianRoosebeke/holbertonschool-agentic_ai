<script setup>
defineProps({
	icon: { type: [Object, Function], default: null },
	label: { type: String, required: true },
});
</script>

<template>
	<li
		v-if="icon"
		class="flex items-center gap-2 text-sm text-slate-300 after:ml-6 after:text-slate-600 after:content-['•'] last:after:content-none"
	>
		<component :is="icon" class="h-4 w-4 text-violet-400" />
		<p>{{ label }}</p>
	</li>
</template>
