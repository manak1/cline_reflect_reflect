import { Column } from "../../components/column";
import { useKpt } from "../../hooks/useKpt";
import { Button } from "../../components/ui/button";
import { FeedbackCard } from "../../components/ui/feedback-card";
import { formatWeekRange } from "../../lib/date-utils";
import { Emoji } from "../../components/ui/emoji";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function KptBoard() {
	const {
		items,
		handleAddItem,
		handleDeleteItem,
		handleMoveItem,
		feedback,
		feedbackLoading,
		feedbackError,
		getFeedback,
		currentWeek,
		goToNextWeek,
		goToPreviousWeek,
	} = useKpt();

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between bg-white/50 p-4 rounded-lg shadow-sm">
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="icon"
						onClick={goToPreviousWeek}
						aria-label="前の週"
						className="hover:bg-white/80"
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<h2 className="text-lg font-semibold flex items-center gap-2">
						{formatWeekRange(currentWeek)}の振り返り
					</h2>
					<Button
						variant="ghost"
						size="icon"
						onClick={goToNextWeek}
						aria-label="次の週"
						className="hover:bg-white/80"
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-8">
				<Column
					type="keep"
					title="Keep"
					items={items.keep}
					onAddItem={handleAddItem("keep")}
					onDeleteItem={handleDeleteItem("keep")}
					onMoveItem={handleMoveItem}
				/>
				<Column
					type="problem"
					title="Problem"
					items={items.problem}
					onAddItem={handleAddItem("problem")}
					onDeleteItem={handleDeleteItem("problem")}
					onMoveItem={handleMoveItem}
				/>
				<Column
					type="try"
					title="Try"
					items={items.try}
					onAddItem={handleAddItem("try")}
					onDeleteItem={handleDeleteItem("try")}
					onMoveItem={handleMoveItem}
				/>
			</div>

			<div className="mt-8">
				<Button
					onClick={getFeedback}
					disabled={feedbackLoading}
					className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
				>
					{feedbackLoading ? (
						<div className="flex items-center gap-2 justify-center">
							<Emoji type="loading" size="sm" className="animate-spin" />
							サマリー作成中...
						</div>
					) : (
						<div className="flex items-center gap-2 justify-center">
							<Emoji type="summary" size="sm" />
							振り返りをまとめる
						</div>
					)}
				</Button>

				{feedbackError && (
					<div className="mt-4 bg-red-50 p-4 rounded-lg flex items-start gap-2">
						<Emoji type="error" size="sm" />
						<div className="text-red-600 text-sm">
							申し訳ありません！エラーが発生しました：
							<br />
							{feedbackError}
						</div>
					</div>
				)}

				{feedback && (
					<div className="mt-4 animate-in slide-in-from-bottom duration-500">
						<FeedbackCard className="bg-white/80 backdrop-blur-sm">
							{feedback}
						</FeedbackCard>
					</div>
				)}
			</div>
		</div>
	);
}
