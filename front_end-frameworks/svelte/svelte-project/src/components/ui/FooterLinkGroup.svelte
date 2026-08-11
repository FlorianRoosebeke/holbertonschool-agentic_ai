<script>
	let { title, links } = $props();
</script>

<div>
	<h3 class="mb-4 text-sm font-bold text-slate-50">{title}</h3>
	<ul class="text-xs text-slate-400 flex flex-col justify-start items-start gap-2">
		{#each links as link (link.label)}
			<li>
				<a
					class="hover:text-slate-50"
					href={link.href}
					target={link.external ? "_blank" : undefined}
					rel={link.external ? "noopener noreferrer" : undefined}
				>
					{link.label}
				</a>
			</li>
		{/each}
	</ul>
</div>
