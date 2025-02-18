import { Editor as TiptapEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";

interface EditorProps {
	content: string;
	onChange: (content: string) => void;
}

export function Editor({ content, onChange }: EditorProps) {
	const editor = useEditor({
		extensions: [StarterKit],
		content,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	return (
		<div className="w-full">
			<EditorContent
				editor={editor}
				data-testid="tiptap-editor"
				className="tiptap ProseMirror prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none min-h-[300px] p-6"
			/>
		</div>
	);
}
