import Brand from "../ui/Brand";
import Button from "../ui/Button";

function Header() {
	return (
	<div id="top" className="bg-slate-950 text-slate-50 antialiased">
		<header className="fixed top-0 right-0 left-0 w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur z-50">
			<div className="flex flex-row justify-between items-center px-4 py-3">
				<div className="flex flex-row justify-start items-center gap-2">
					<Brand />
				</div>

				<nav className="flex flex-row justify-center items-center gap-8 text-xs text-slate-400">
					<ul className="hidden md:flex flex-row justify-center items-center gap-8">
						<li>
							<a className="hover:text-slate-50" href="#about-section">About</a>
						</li>
						<li>
							<a className="hover:text-slate-50" href="#features-section">Features</a>
						</li>
						<li>
							<a className="hover:text-slate-50" href="#insights-section">Insights</a>
						</li>
						<li>
							<a className="hover:text-slate-50" href="#contact-section">Contact</a>
						</li>

						<li>
							<Button href="#contact-section" className="px-4 py-2 rounded-md shadow-lg shadow-violet-500/40">
								Enroll now
							</Button>
						</li>
					</ul>
				</nav>
			</div>
		</header>
							</div>
	);
}

export default Header;
