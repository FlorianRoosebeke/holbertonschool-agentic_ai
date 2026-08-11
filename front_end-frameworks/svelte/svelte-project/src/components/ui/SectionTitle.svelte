<script>
	let {
		as = "h2",
		class: className = "",
		highlight = "",
		highlightClass = "block text-violet-300",
		children,
	} = $props();
</script>

<svelte:element this={as} class={className}>
	{@render children?.()}
	{#if highlight}
		<span class={highlightClass}>{highlight}</span>
	{/if}
</svelte:element>
