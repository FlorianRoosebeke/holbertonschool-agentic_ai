<script setup>
import Brand from "../ui/Brand.vue";
import SocialLink from "../ui/SocialLink.vue";
import FooterLinkGroup from "../ui/FooterLinkGroup.vue";
import socials from "../../data/socials";
import footerLinks from "../../data/footerLinks";
</script>

<template>
	<footer class="bg-black px-6">
		<div class="max-w-6xl mx-auto pt-24 pb-12 grid md:grid-cols-5 gap-8">

			<div class="md:col-span-2 flex flex-col justify-start items-start gap-4">
				<div class="flex flex-row justify-center items-center gap-2">
					<Brand
						icon-class="w-7 h-7 flex flex-row justify-center items-center text-xs font-black rounded-lg bg-violet-500 shadow-lg shadow-violet-500/40"
						text-class="text-sm font-bold text-slate-50"
					/>
				</div>
				<div><p class="text-xs text-slate-400">Explore the future of development with Agentic AI.</p></div>
				<div class="flex flex-row justify-start items-center gap-2">
					<SocialLink
						v-for="social in socials"
						:key="social.label"
						:href="social.href"
						:label="social.label"
						:icon="social.icon"
					/>
				</div>
			</div>
			<FooterLinkGroup
				v-for="group in footerLinks"
				:key="group.title"
				:title="group.title"
				:links="group.links"
			/>
		</div>
		<div class="max-w-6xl mx-auto pt-6 pb-24 flex flex-col md:flex-row justify-center md:justify-between items-start md:items-center text-xs text-slate-400 border-t border-slate-900">
			<p>
				©
				2026
				<a href="https://github.com/fchavonet" target="_blank" rel="noopener noreferrer"> Florian Roosebeke</a>

			</p>
			<p>Built for the Holberton School Front-end Frameworks curriculum.</p>
		</div>
	</footer>
</template>
