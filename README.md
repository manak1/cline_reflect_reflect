# Reflect Reflect

振り返りを AI と一緒に行うための Web アプリケーション

このプロジェクトはコードを手動で書くことなく、RooCode（AI アシスタント）のみを使用して開発されました。これは AI を活用したソフトウェア開発の可能性を示す実験的なプロジェクトです。

## 特徴

- 📝KPT フレームワークを使用した振り返り
- 🤖AI（Gemini）との対話による振り返りの深化
- 🎯 目標設定と進捗管理
- 🔒Supabase を使用した認証機能
- 📱 レスポンシブデザイン

## 技術スタック

- ⚛️React18
- 🔷TypeScript
- ⚡️Vite
- 🎨TailwindCSS
- 🧪Vitest + TestingLibrary
- 🔑Supabase（認証・データベース）
- 🤖Claude/GeminiAPI

## セットアップ

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# テストの実行
pnpm test

# ビルド
pnpm build
```

## 環境変数

以下の環境変数が必要です：

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```
