import { Squirrel } from "lucide-react";

function Brand({ label = "Agentic AI", iconClassName = "w-7 h-7 text-green-600", textClassName = "text-sm font-bold" }) {
	return (
		<>
			<Squirrel className={iconClassName} />
			<span className={textClassName}>{label}</span>
		</>
	);
}

export default Brand;
