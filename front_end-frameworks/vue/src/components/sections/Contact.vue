<script setup>
import { reactive, ref, computed } from "vue";
import { User, AtSign, Mail } from "lucide-vue-next";
import HighlightCard from "../cards/HighlightCard.vue";
import highlights from "../../data/highlights";
import SectionBadge from "../ui/SectionBadge.vue";
import SectionTitle from "../ui/SectionTitle.vue";
import Button from "../ui/Button.vue";

const DEFAULT_FEEDBACK = "Please fill all required fields.";

const formData = reactive({ fullName: "", email: "", message: "" });
const isSending = ref(false);
const feedbackMsg = ref(DEFAULT_FEEDBACK);

const isNameValid = computed(() => formData.fullName.trim().length >= 2);
const isEmailValid = computed(() => formData.email.includes(".") && formData.email.includes("@"));
const isMessageValid = computed(() => formData.message.trim().length >= 10);
const isValid = computed(() => isEmailValid.value && isMessageValid.value && isNameValid.value);

function fieldBorderClass(valid) {
	const base = "w-full rounded-xl border px-4 py-3 text-sm text-slate-100 outline-none transition border-slate-800 bg-black placeholder:text-slate-500";
	const focusColor = valid ? "focus:border-violet-500" : "focus:border-red-500";
	return `${base} ${focusColor}`;
}

async function handleSubmit() {
	isSending.value = true;
	feedbackMsg.value = "Sending...";
	await new Promise((resolve) => setTimeout(resolve, 1500));
	formData.fullName = "";
	formData.email = "";
	formData.message = "";
	feedbackMsg.value = "Message sent!";
	isSending.value = false;
	await new Promise((resolve) => setTimeout(resolve, 1500));
	feedbackMsg.value = DEFAULT_FEEDBACK;
}
</script>

<template>
	<section id="contact-section" class="relative bg-slate-950">
		<div class="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(168,85,247,0.35),transparent_32%),radial-gradient(circle_at_85%_60%,rgba(59,130,246,0.25),transparent_28%),linear-gradient(135deg,#1e1238_0%,#0f172a_45%,#020617_100%)]" />
		<div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(2,6,23,0.45)_75%)]" />
		<div class="relative w-full max-w-6xl mx-auto px-6 flex flex-col justify-center items-center gap-8 text-center">

			<div class="pt-10 flex flex-col items-center text-center gap-8">
				<SectionBadge> ✧  Start your AI journey  ✧</SectionBadge>
			</div>
			<div>
				<SectionTitle class="text-4xl md:text-6xl font-black tracking-tight leading-none text-slate-50 block text-center" highlight="Agentic AI?" highlight-class="justify-center items-center block text-violet-300">Ready to Explore </SectionTitle>
			</div>
			<div class="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
				<Button href="https://www.holbertonschool.fr/rejoindre-lhippocamp" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-md shadow-lg shadow-violet-500/30">Enroll at Holberton School →</Button>
				<Button href="https://www.holbertonschool.fr/admission" target="_blank" rel="noopener noreferrer" variant="secondary" class="px-4 py-2 rounded-md text-violet-50 transition shadow-lg shadow-slate-950/40">Need more information?</Button>
			</div>
			<ul class="flex flex-wrap justify-center items-center gap-y-2">
				<HighlightCard
					v-for="highlight in highlights"
					:key="highlight.label"
					:icon="highlight.icon"
					:label="highlight.label"
				/>
			</ul>

		</div>
		<form class="relative w-full max-w-2xl mx-auto px-6 py-16" @submit.prevent="handleSubmit">
			<div class="flex flex-col gap-6 p-10 rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">

				<div>
					<label for="fullName" class="flex items-center gap-2 text-sm font-bold text-slate-50 mb-2">
						<User class="h-4 w-4 text-violet-400" />
						Full name
					</label>

					<input
						id="fullName"
						v-model="formData.fullName"
						type="text"
						name="fullName"
						placeholder="Your full name..."
						autocomplete="off"
						:class="fieldBorderClass(isNameValid)"
					/>
				</div>

				<div>

					<label for="email" class="flex items-center gap-2 text-sm font-bold text-slate-50 mb-2">
						<AtSign class="h-4 w-4 text-violet-400" />
						Email
					</label>

					<input
						id="email"
						v-model="formData.email"
						type="email"
						name="email"
						placeholder="you@example.com"
						autocomplete="off"
						:class="fieldBorderClass(isEmailValid)"
					/>
				</div>

				<div>

					<label for="message" class="flex items-center gap-2 text-sm font-bold text-slate-50 mb-2">
						<Mail class="h-4 w-4 text-violet-400" />
						Message
					</label>

					<textarea
						id="message"
						v-model="formData.message"
						rows="5"
						name="message"
						placeholder="Tell us about your project or learning goals!"
						autocomplete="off"
						:class="`${fieldBorderClass(isMessageValid)} resize-none`"
					/>
				</div>
				<div>
					<button
						class="w-full px-7 py-3 font-semibold text-slate-50 rounded-xl shadow-lg shadow-violet-500/40 transition bg-violet-600"
						:class="!isValid || isSending ? 'opacity-60 cursor-not-allowed' : 'hover:bg-violet-700'"
						type="submit"
						:disabled="!isValid || isSending"
					>
						Send message
					</button>
				</div>
				<p class="text-center text-sm text-slate-400">{{ feedbackMsg }}</p>
			</div>
		</form>
	</section>
</template>
