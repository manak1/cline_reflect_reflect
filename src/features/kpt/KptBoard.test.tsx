import { describe, it, expect } from "vitest";
import { KptBoard } from "./KptBoard";
import { renderWithProviders, screen, userEvent } from "../../test/utils";

describe("KptBoard", () => {
	it("3つのカラムが表示される", () => {
		renderWithProviders(<KptBoard />);

		expect(screen.getByText("Keep")).toBeInTheDocument();
		expect(screen.getByText("Problem")).toBeInTheDocument();
		expect(screen.getByText("Try")).toBeInTheDocument();
	});

	it("アイテムを追加できる", async () => {
		renderWithProviders(<KptBoard />);
		const user = userEvent.setup();

		// Keep カラムの追加ボタンをクリック
		const addButtons = screen.getAllByText("追加");
		await user.click(addButtons[0]);

		// テキストエリアに入力
		const textarea = screen.getByPlaceholderText("内容を入力...");
		await user.type(textarea, "テストアイテム");

		// 追加ボタンをクリック
		const confirmButtons = screen.getAllByText("追加");
		await user.click(confirmButtons[1]);

		expect(screen.getByText("テストアイテム")).toBeInTheDocument();
	});

	it("アイテムを削除できる", async () => {
		renderWithProviders(<KptBoard />);
		const user = userEvent.setup();

		// アイテムを追加
		const addButtons = screen.getAllByText("追加");
		await user.click(addButtons[0]);

		const textarea = screen.getByPlaceholderText("内容を入力...");
		await user.type(textarea, "テストアイテム");

		const confirmButtons = screen.getAllByText("追加");
		await user.click(confirmButtons[1]);

		// 削除ボタンをクリック
		const deleteButton = screen.getByRole("button", { name: "削除" });
		await user.click(deleteButton);

		expect(screen.queryByText("テストアイテム")).not.toBeInTheDocument();
	});
});
