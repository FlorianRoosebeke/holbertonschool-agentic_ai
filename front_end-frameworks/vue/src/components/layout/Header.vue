<script setup>
import Brand from "../ui/Brand.vue";
import Button from "../ui/Button.vue";
</script>

<template>
	<div id="top" class="bg-slate-950 text-slate-50 antialiased">
		<header class="fixed top-0 right-0 left-0 w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur z-50">
			<div class="flex flex-row justify-between items-center px-4 py-3">
				<div class="flex flex-row justify-start items-center gap-2">
					<Brand />
				</div>

				<nav class="flex flex-row justify-center items-center gap-8 text-xs text-slate-400">
					<ul class="hidden md:flex flex-row justify-center items-center gap-8">
						<li>
							<a class="hover:text-slate-50" href="#about-section">About</a>
						</li>
						<li>
							<a class="hover:text-slate-50" href="#features-section">Features</a>
						</li>
						<li>
							<a class="hover:text-slate-50" href="#insights-section">Insights</a>
						</li>
						<li>
							<a class="hover:text-slate-50" href="#contact-section">Contact</a>
						</li>

						<li>
							<Button href="#contact-section" class="px-4 py-2 rounded-md shadow-lg shadow-violet-500/40">
								Enroll now
							</Button>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	</div>
</template>
