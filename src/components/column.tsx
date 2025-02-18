import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Plus } from "lucide-react";
import { useDrop } from "react-dnd";
import type { Identifier } from "dnd-core";
import { cn } from "../lib/utils";
import { Emoji } from "./ui/emoji";

interface KptItem {
	id: string;
	content: string;
}

interface ColumnProps {
	type: "keep" | "problem" | "try";
	title: string;
	items: KptItem[];
	onAddItem: (content: string) => void;
	onDeleteItem: (id: string) => void;
	onMoveItem: (
		itemId: string,
		fromType: "keep" | "problem" | "try",
		toType: "keep" | "problem" | "try",
	) => void;
}

interface DragItem {
	id: string;
	type: "keep" | "problem" | "try";
}

const columnColors = {
	keep: "bg-green-50 hover:bg-green-100/50",
	problem: "bg-amber-50 hover:bg-amber-100/50",
	try: "bg-blue-50 hover:bg-blue-100/50",
};

export function Column({
	type,
	title,
	items,
	onAddItem,
	onDeleteItem,
	onMoveItem,
}: ColumnProps) {
	const [isAdding, setIsAdding] = useState(false);
	const [newItemContent, setNewItemContent] = useState("");
	const ref = useRef<HTMLDivElement>(null);

	const [{ isOver }, drop] = useDrop<
		DragItem,
		void,
		{ isOver: boolean; handlerId: Identifier | null }
	>({
		accept: "card",
		drop: (item) => {
			if (item.type !== type) {
				onMoveItem(item.id, item.type, type);
			}
		},
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
			handlerId: monitor.getHandlerId(),
		}),
	});

	drop(ref);

	const handleAddItem = () => {
		if (newItemContent.trim()) {
			onAddItem(newItemContent.trim());
			setNewItemContent("");
			setIsAdding(false);
		}
	};

	return (
		<div
			ref={ref}
			className={cn(
				"flex flex-col gap-4 min-w-[300px] p-4 rounded-lg transition-all duration-300",
				columnColors[type],
				isOver && "scale-[1.02] ring-2 ring-primary ring-opacity-50",
			)}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<Emoji type={type as "keep" | "problem" | "try"} size="md" />
					<h3 className="text-lg font-semibold">{title}</h3>
				</div>
				<Button
					variant="ghost"
					size="icon"
					className="rounded-full w-8 h-8 hover:bg-white/50"
					onClick={() => setIsAdding(true)}
				>
					<Plus className="h-4 w-4" />
				</Button>
			</div>

			<div className="flex flex-col gap-3">
				{isAdding && (
					<div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border animate-in slide-in-from-top duration-300">
						<textarea
							className="w-full min-h-[80px] p-2 border rounded-md text-sm bg-white/80"
							placeholder="内容を入力..."
							value={newItemContent}
							onChange={(e) => setNewItemContent(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter" && e.metaKey) {
									handleAddItem();
								}
							}}
						/>
						<div className="flex justify-end gap-2 mt-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setIsAdding(false)}
							>
								キャンセル
							</Button>
							<Button size="sm" onClick={handleAddItem}>
								追加
							</Button>
						</div>
					</div>
				)}

				{items.map((item, index) => (
					<div
						key={item.id}
						className="animate-in slide-in-from-left duration-300"
						style={{ animationDelay: `${index * 50}ms` }}
					>
						<Card
							id={item.id}
							type={type}
							content={item.content}
							onDelete={() => onDeleteItem(item.id)}
						/>
					</div>
				))}
				{!isAdding && items.length === 0 && (
					<div className="flex flex-col items-center justify-center h-32 text-sm text-muted-foreground">
						<Emoji
							type={
								`empty-${type}` as "empty-keep" | "empty-problem" | "empty-try"
							}
							size="lg"
							className="opacity-50 mb-2"
						/>
						<p>アイテムを追加してください</p>
					</div>
				)}
				{!isAdding && items.length > 0 && (
					<Button
						variant="ghost"
						size="icon"
						className="rounded-full w-8 h-8 mx-auto mt-2 hover:bg-white/50"
						onClick={() => setIsAdding(true)}
					>
						<Plus className="h-4 w-4" />
					</Button>
				)}
			</div>
		</div>
	);
}
