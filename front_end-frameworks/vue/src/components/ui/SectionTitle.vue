<script setup>
defineProps({
	as: { type: String, default: "h2" },
	highlight: { type: String, default: "" },
	highlightClass: { type: String, default: "block text-violet-300" },
});
</script>

<template>
	<component :is="as">
		<slot />
		<span v-if="highlight" :class="highlightClass">{{ highlight }}</span>
	</component>
</template>
