import ReactMarkdown from "react-markdown";

interface FeedbackCardProps {
	/** マークダウン形式のフィードバック内容 */
	children: string;
	/** 追加のCSSクラス名 */
	className?: string;
}

/**
 * マークダウン形式のフィードバックを表示するカードコンポーネント
 *
 * @example
 * ```tsx
 * <FeedbackCard className="mt-4">
 *   {`# フィードバック
 *
 *   **1. 今週の成果**
 *   - 新しいスキルの習得
 *   - チーム貢献
 *   `}
 * </FeedbackCard>
 * ```
 */
export function FeedbackCard({ children, className = "" }: FeedbackCardProps) {
	return (
		<div className={`bg-white p-4 rounded-lg shadow-sm border ${className}`}>
			<h3 className="text-lg font-semibold mb-4">AIフィードバック</h3>
			<ReactMarkdown
				className="prose prose-blue max-w-none"
				components={{
					h1: ({ children }) => (
						<h1 className="text-xl font-bold mb-4 text-blue-700">{children}</h1>
					),
					h2: ({ children }) => (
						<h2 className="text-lg font-semibold mb-3 text-blue-600">
							{children}
						</h2>
					),
					strong: ({ children }) => (
						<strong className="font-semibold text-blue-700 block mb-2">
							{children}
						</strong>
					),
					p: ({ children }) => (
						<p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
					),
					ul: ({ children }) => (
						<ul className="mb-4 list-disc list-inside text-gray-700">
							{children}
						</ul>
					),
					li: ({ children }) => <li className="mb-2">{children}</li>,
				}}
			>
				{children}
			</ReactMarkdown>
		</div>
	);
}
