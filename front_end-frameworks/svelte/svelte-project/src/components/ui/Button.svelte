<script>
	const VARIANTS = {
		primary: "font-semibold text-violet-50 bg-violet-600 hover:bg-violet-700 transition",
		secondary: "font-semibold border border-slate-800 bg-slate-950 hover:bg-slate-900",
	};

	let {
		href = undefined,
		variant = "primary",
		class: className = "",
		target = undefined,
		rel = undefined,
		type = "button",
		disabled = false,
		onclick = undefined,
		children,
	} = $props();

	let classes = $derived(`${VARIANTS[variant]} ${className}`.trim());
</script>

{#if href}
	<a class={classes} {href} {target} {rel}>
		{@render children?.()}
	</a>
{:else}
	<button {type} {disabled} {onclick} class={classes}>
		{@render children?.()}
	</button>
{/if}
