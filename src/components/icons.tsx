import { type LucideProps, Loader2 } from "lucide-react";

export const Icons = {
	spinner: Loader2,
	logo: ({
		title = "Weekly Reflection Logo",
		...props
	}: LucideProps & { title?: string }) => (
		<svg
			aria-hidden="true"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<title>{title}</title>
			<path d="M12 3a9 9 0 0 0-9 9v.5c0 5 4 9.5 9 9.5s9-4.5 9-9.5V12a9 9 0 0 0-9-9Z" />
			<path d="M12 3v18" />
			<path d="M12 14v4" />
			<path d="M12 6v4" />
			<path d="m9 3 3 3 3-3" />
		</svg>
	),
};
