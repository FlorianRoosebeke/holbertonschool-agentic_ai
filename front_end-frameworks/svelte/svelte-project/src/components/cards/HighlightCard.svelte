<script>
	let { Icon, label } = $props();
</script>

{#if Icon}
	<li
		class="flex items-center gap-2 text-sm text-slate-300 after:ml-6 after:text-slate-600 after:content-['•'] last:after:content-none"
	>
		<Icon class="h-4 w-4 text-violet-400" />
		<p>{label}</p>
	</li>
{/if}
