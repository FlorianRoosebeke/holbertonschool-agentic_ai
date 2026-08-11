<script>
	import { Squirrel } from "@lucide/svelte";

	let {
		label = "Agentic AI",
		iconClass = "w-7 h-7 text-green-600",
		textClass = "text-sm font-bold",
	} = $props();
</script>

<Squirrel class={iconClass} />
<span class={textClass}>{label}</span>
