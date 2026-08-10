<script setup>
import { Squirrel } from "lucide-vue-next";

defineProps({
	label: { type: String, default: "Agentic AI" },
	iconClass: { type: String, default: "w-7 h-7 text-green-600" },
	textClass: { type: String, default: "text-sm font-bold" },
});
</script>

<template>
	<Squirrel :class="iconClass" />
	<span :class="textClass">{{ label }}</span>
</template>
