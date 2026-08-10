import Brand from "../ui/Brand";
import SocialLink from "../ui/SocialLink";
import FooterLinkGroup from "../ui/FooterLinkGroup";
import socials from "../../data/socials";
import footerLinks from "../../data/footerLinks";

function Footer() {
	return (
		<footer className="bg-black px-6">
				<div className="max-w-6xl mx-auto pt-24 pb-12 grid md:grid-cols-5 gap-8">

					<div className="md:col-span-2 flex flex-col justify-start items-start gap-4">
						<div className="flex flex-row justify-center items-center gap-2">
							<Brand
								iconClassName="w-7 h-7 flex flex-row justify-center items-center text-xs font-black rounded-lg bg-violet-500 shadow-lg shadow-violet-500/40"
								textClassName="text-sm font-bold text-slate-50"
							/>
						</div>
						<div><p className="text-xs text-slate-400">Explore the future of development with Agentic AI.</p></div>
						<div className="flex flex-row justify-start items-center gap-2">
							{socials.map((social) => (
								<SocialLink key={social.label} href={social.href} label={social.label} icon={social.icon} />
							))}
						</div>
					</div>
					{footerLinks.map((group) => (
						<FooterLinkGroup key={group.title} title={group.title} links={group.links} />
					))}
				</div>
				<div className="max-w-6xl mx-auto pt-6 pb-24 flex flex-col md:flex-row justify-center md:justify-between items-start md:items-center text-xs text-slate-400 border-t border-slate-900">
					<p>
						©
						2026
						<a href="https://github.com/fchavonet" target="_blank" rel="noopener noreferrer"> Florian Roosebeke</a>

					</p>
					<p>Built for the Holberton School Front-end Frameworks curriculum.</p>
				</div>
		</footer>
	);
}

export default Footer;
