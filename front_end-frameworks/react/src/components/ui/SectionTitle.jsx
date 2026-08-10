function SectionTitle({ as: Tag = "h2", className = "", highlight, highlightClassName = "block text-violet-300", children }) {
	return (
		<Tag className={className}>
			{children}
			{highlight && <span className={highlightClassName}>{highlight}</span>}
		</Tag>
	);
}

export default SectionTitle;
