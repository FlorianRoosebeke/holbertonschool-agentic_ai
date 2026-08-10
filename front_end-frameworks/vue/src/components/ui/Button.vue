<script setup>
import { computed } from "vue";

const VARIANTS = {
	primary: "font-semibold text-violet-50 bg-violet-600 hover:bg-violet-700 transition",
	secondary: "font-semibold border border-slate-800 bg-slate-950 hover:bg-slate-900",
};

const props = defineProps({
	href: { type: String, default: undefined },
	variant: { type: String, default: "primary" },
	target: { type: String, default: undefined },
	rel: { type: String, default: undefined },
	type: { type: String, default: "button" },
	disabled: { type: Boolean, default: false },
});

const variantClass = computed(() => VARIANTS[props.variant]);
</script>

<template>
	<a v-if="href" :class="variantClass" :href="href" :target="target" :rel="rel">
		<slot />
	</a>

	<button v-else :type="type" :disabled="disabled" :class="variantClass">
		<slot />
	</button>
</template>
