interface EmojiProps {
	/** 絵文字の種類 */
	type:
		| "keep"
		| "problem"
		| "try"
		| "loading"
		| "summary"
		| "error"
		| "empty-keep"
		| "empty-problem"
		| "empty-try";
	/** 絵文字のサイズ（px） */
	size?: "sm" | "md" | "lg";
	/** 追加のCSSクラス */
	className?: string;
}

const emojiSizes = {
	sm: "w-5 h-5",
	md: "w-6 h-6",
	lg: "w-8 h-8",
};

const BASE_URL =
	"https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis";

const emojiPaths = {
	keep: `${BASE_URL}/Objects/Clipboard.png`,
	problem: `${BASE_URL}/Symbols/Warning.png`,
	try: `${BASE_URL}/Objects/Light%20Bulb.png`,
	loading: `${BASE_URL}/Objects/Magic%20Wand.png`,
	summary: `${BASE_URL}/Travel%20and%20places/Glowing%20Star.png`,
	error: `${BASE_URL}/Smilies/Confounded%20Face.png`,

	"empty-keep": `${BASE_URL}/Smilies/Star-Struck.png`,

	"empty-problem": `${BASE_URL}/Smilies/Thinking%20Face.png`,
	"empty-try": `${BASE_URL}/Smilies/Nerd%20Face.png`,
};

/**
 * アニメーション付き絵文字コンポーネント
 */
export function Emoji({ type, size = "md", className = "" }: EmojiProps) {
	return (
		<img
			src={emojiPaths[type]}
			alt={type}
			className={`${emojiSizes[size]} ${className}`}
			loading="lazy"
		/>
	);
}
