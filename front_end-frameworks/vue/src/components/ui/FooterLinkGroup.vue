<script setup>
defineProps({
	title: { type: String, required: true },
	links: { type: Array, required: true },
});
</script>

<template>
	<div>
		<h3 class="mb-4 text-sm font-bold text-slate-50">{{ title }}</h3>
		<ul class="text-xs text-slate-400 flex flex-col justify-start items-start gap-2">
			<li v-for="link in links" :key="link.label">
				<a
					class="hover:text-slate-50"
					:href="link.href"
					:target="link.external ? '_blank' : undefined"
					:rel="link.external ? 'noopener noreferrer' : undefined"
				>
					{{ link.label }}
				</a>
			</li>
		</ul>
	</div>
</template>
