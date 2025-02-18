import { render } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { ReactElement } from "react";

export function renderWithProviders(ui: ReactElement) {
	return render(<DndProvider backend={HTML5Backend}>{ui}</DndProvider>);
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
