<script>
	import steps from "../../data/steps";
	import SectionBadge from "../ui/SectionBadge.svelte";
	import SectionTitle from "../ui/SectionTitle.svelte";
</script>

<section
	id="about-section"
	class="relative py-24 flex flex-col justify-center items-center bg-black overflow-hidden"
>
	<div
		class="relative max-w-6xl mx-auto px-6 flex flex-col justify-center items-center gap-8 text-center"
	>
		<div>
			<SectionBadge>✧ What is Agentic AI? ✧</SectionBadge>
		</div>
		<div>
			<SectionTitle
				class="max-w-4xl font-black tracking-tight leading-none text-4xl md:text-5xl text-slate-50"
				highlight="It acts with purpose">AI that does more than answer</SectionTitle
			>
		</div>
		<div>
			<p class="max-w-2xl text-sm md:text-base text-slate-300 text-start">
				Agentic AI refers to artificial intelligence systems designed to pursue goals, make
				decisions, use tools, and adapt their actions across multiple steps. Instead of only
				responding to a single prompt, an AI agent can break down a task, plan a strategy,
				execute actions, evaluate results, and continue until the objective is reached.
			</p>
		</div>
		<div class="mt-8 grid md:grid-cols-[1fr_1.2fr] justify-center items-center gap-8">
			<div
				class="p-8 flex flex-col justify-center items-start gap-6 text-start rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40"
			>
				<div>
					<h3 class="text-lg font-bold text-slate-50">Traditional AI</h3>
					<p class="mt-2 text-sm text-slate-400">
						Responds to direct instructions, generates content, answers questions, or analyzes
						information within a limited interaction.
					</p>
				</div>
				<div class="w-full h-px bg-slate-800"></div>
				<div>
					<h3 class="text-lg font-bold text-violet-300">Agentic AI</h3>
					<p class="mt-2 text-sm text-slate-400">
						Understands a goal, chooses actions, uses external tools, follows a plan, and adjusts
						its behavior based on feedback.
					</p>
				</div>
			</div>
			<ul class="text-left flex flex-col justify-center items-start gap-6">
				{#each steps as step, index (step.number)}
					<li class="relative">
						<div class="flex items-center gap-3">
							<span
								class="relative z-10 items-center justify-center flex h-8 w-8 rounded-full bg-violet-600 text-slate-50 font-bold"
								>{step.number}</span
							>
							<div class="items-center">
								<h3 class="text-slate-50 font-bold text-left justify-left">{step.title}</h3>
							</div>
							{#if index < steps.length - 1}
								<div class="absolute left-4 top-8 w-px h-full bg-slate-800"></div>
							{/if}
						</div>
						<p class="pl-11 text-sm text-slate-50">{step.description}</p>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
