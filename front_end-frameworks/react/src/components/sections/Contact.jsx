import { useState } from "react";
import { User, AtSign, Mail } from "lucide-react";
import HighlightCard from "../cards/HighlightCard";
import highlights from "../../data/highlights";
import SectionBadge from "../ui/SectionBadge";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";

function Contact() {
	const DEFAULT_FEEDBACK = "Please fill all required fields.";
	const [formData, setData] = useState({ fullName: "", email: "", message: "" });
	const [isSending, setIsSending] = useState(false);
	const [feedbackMsg, setFeedbackMsg] = useState(DEFAULT_FEEDBACK);
	function handleChange(e) {
		setData({ ...formData, [e.target.name]: e.target.value });
	}
	const isNameValid = formData.fullName.trim().length >= 2;
	const isEmailValid = formData.email.includes(".") && formData.email.includes("@")
	const isMessageValid = formData.message.trim().length >= 10
	const isValid = isEmailValid && isMessageValid && isNameValid

	function fieldBorderClass(isValid) {
		const base = "w-full rounded-xl border px-4 py-3 text-sm text-slate-100 outline-none transition border-slate-800 bg-black placeholder:text-slate-500";
		const focusColor = isValid ? "focus:border-violet-500" : "focus:border-red-500";
		return `${base} ${focusColor}`;
	}
	async function handleSubmit(e) {
		e.preventDefault();
		setIsSending(true); setFeedbackMsg("Sending...");
		await new Promise((resolve) => setTimeout(resolve, 1500));
		setData({ fullName: "", email: "", message: "" })
		setFeedbackMsg("Message sent!")
		setIsSending(false)
		await new Promise((resolve) => setTimeout(resolve, 1500));
		setFeedbackMsg(DEFAULT_FEEDBACK);
	}
	return (
		<section className="relative bg-slate-950" id="contact-section">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(168,85,247,0.35),transparent_32%),radial-gradient(circle_at_85%_60%,rgba(59,130,246,0.25),transparent_28%),linear-gradient(135deg,#1e1238_0%,#0f172a_45%,#020617_100%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(2,6,23,0.45)_75%)]" />
			<div className="relative w-full max-w-6xl mx-auto px-6 flex flex-col justify-center items-center gap-8 text-center">

				<div className="pt-10 flex flex-col items-center text-center gap-8">

					<SectionBadge> ✧  Start your AI journey  ✧</SectionBadge>
				</div >
				<div>
					<SectionTitle className="text-4xl md:text-6xl font-black tracking-tight leading-none text-slate-50 block text-center" highlight="Agentic AI?" highlightClassName="justify-center items-center block text-violet-300">Ready to Explore </SectionTitle>
				</div>
				<div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
					<Button href="https://www.holbertonschool.fr/rejoindre-lhippocamp" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md shadow-lg shadow-violet-500/30">Enroll at Holberton School →</Button>
					<Button href="https://www.holbertonschool.fr/admission" target="_blank" rel="noopener noreferrer" variant="secondary" className="px-4 py-2 rounded-md text-violet-50 transition shadow-lg shadow-slate-950/40">Need more information?</Button>
				</div>
				<ul className="flex flex-wrap justify-center items-center gap-y-2">
					{highlights.map((highlight, index) => (
						<HighlightCard
							key={index}
							Icon={highlight.icon}
							label={highlight.label}
						/>
					))
					}
				</ul>

			</div>
			<form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto px-6 py-16">
				<div className="flex flex-col gap-6 p-10 rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">

					<div>
						<label htmlFor="fullName" className="flex items-center gap-2 text-sm font-bold text-slate-50 mb-2">
							<User className="h-4 w-4 text-violet-400" />
							Full name
						</label>

						<input
							type="text"
							id="fullName"
							name="fullName"
							placeholder="Your full name..."
							value={formData.fullName}
							onChange={handleChange}
							autoComplete="off"
							className={fieldBorderClass(isNameValid)}
						/>
					</div>

					<div>

						<label htmlFor="email" className="flex items-center gap-2 text-sm font-bold text-slate-50 mb-2">
							<AtSign className="h-4 w-4 text-violet-400" />
							Email
						</label>

						<input
							type="email"
							id="email"
							name="email"
							placeholder="you@example.com"
							value={formData.email}
							onChange={handleChange}
							autoComplete="off"
							className={fieldBorderClass(isEmailValid)}
						/>
					</div>

					<div>

						<label htmlFor="message" className="flex items-center gap-2 text-sm font-bold text-slate-50 mb-2">
							<Mail className="h-4 w-4 text-violet-400" />
							Message
						</label>

						<textarea
							rows={(5)}
							id="message"
							name="message"
							placeholder="Tell us about your project or learning goals!"
							value={formData.message}
							onChange={handleChange}
							autoComplete="off"
							className={`${fieldBorderClass(isMessageValid)} resize-none`}
						/>
					</div>
					<div>
						<button
							className={`w-full px-7 py-3 font-semibold text-slate-50 rounded-xl shadow-lg shadow-violet-500/40 transition bg-violet-600 ${!isValid || isSending ? "opacity-60 cursor-not-allowed" : "hover:bg-violet-700"
								}`}
							type="submit"
							disabled={!isValid || isSending}
						>
							Send message
						</button>
					</div>
					<p className="text-center text-sm text-slate-400">{feedbackMsg}</p>
				</div>
			</form>
		</section>
	);
}

export default Contact;