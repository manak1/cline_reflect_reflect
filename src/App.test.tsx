import { describe, it, expect } from "vitest";
import App from "./App";
import { renderWithProviders, screen, userEvent } from "./test/utils";

describe("App", () => {
	it("アプリケーションのタイトルが表示される", () => {
		renderWithProviders(<App />);
		expect(screen.getByText("Weekly Reflection")).toBeInTheDocument();
	});

	it("デフォルトでKPTボードが表示される", () => {
		renderWithProviders(<App />);
		expect(screen.getByText("Keep")).toBeInTheDocument();
		expect(screen.getByText("Problem")).toBeInTheDocument();
		expect(screen.getByText("Try")).toBeInTheDocument();
	});

	it("タブを切り替えることができる", async () => {
		renderWithProviders(<App />);
		const user = userEvent.setup();

		// KPTボードが表示されていることを確認
		expect(screen.getByText("Keep")).toBeInTheDocument();

		// 振り返りタブに切り替え
		await user.click(screen.getByRole("tab", { name: "振り返り" }));
		expect(screen.getByRole("textbox")).toBeInTheDocument();

		// KPTボードタブに戻る
		await user.click(screen.getByRole("tab", { name: "KPT ボード" }));
		expect(screen.getByText("Keep")).toBeInTheDocument();
	});
});
