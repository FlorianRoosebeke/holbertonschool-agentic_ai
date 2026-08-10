function FooterLinkGroup({ title, links }) {
	return (
		<div>
			<h3 className="mb-4 text-sm font-bold text-slate-50">{title}</h3>
			<ul className="text-xs text-slate-400 flex flex-col justify-start items-start gap-2">
				{links.map((link) => (
					<li key={link.label}>
						<a
							className="hover:text-slate-50"
							href={link.href}
							target={link.external ? "_blank" : undefined}
							rel={link.external ? "noopener noreferrer" : undefined}
						>
							{link.label}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

export default FooterLinkGroup;
