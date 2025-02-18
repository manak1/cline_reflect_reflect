import { useRef } from "react";
import { Button } from "./button";
import { X } from "lucide-react";
import { useDrag } from "react-dnd";
import type { Identifier } from "dnd-core";
import { cn } from "../../lib/utils";

interface DragItem {
	id: string;
	type: "keep" | "problem" | "try";
}

interface CardProps {
	id: string;
	type: "keep" | "problem" | "try";
	content: string;
	onDelete: () => void;
}

const cardColors = {
	keep: "hover:bg-green-50",
	problem: "hover:bg-amber-50",
	try: "hover:bg-blue-50",
};

export function Card({ id, type, content, onDelete }: CardProps) {
	const ref = useRef<HTMLDivElement>(null);

	const [{ isDragging }, drag] = useDrag<
		DragItem,
		void,
		{ isDragging: boolean; handlerId: Identifier | null }
	>({
		type: "card",
		item: { id, type },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
			handlerId: monitor.getHandlerId(),
		}),
	});

	drag(ref);

	return (
		<div
			ref={ref}
			className={cn(
				"bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border relative group cursor-move",
				"transition-all duration-200 ease-in-out",
				cardColors[type],
				isDragging && "opacity-50 scale-105 shadow-lg rotate-1",
			)}
			draggable="true"
		>
			<Button
				variant="ghost"
				size="icon"
				className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
				onClick={(e) => {
					e.stopPropagation();
					onDelete();
				}}
				aria-label="削除"
			>
				<X className="h-4 w-4" />
			</Button>
			<p className="text-sm text-gray-700 pr-8 whitespace-pre-wrap">
				{content}
			</p>
		</div>
	);
}
