# 🐍 SnakyTasks

皮肉なコメント付きタスク管理アプリ

## 概要

SnakyTasksは、タスクを追加するたびにAIが皮肉めいたコメントをしてくれるユニークなTodoアプリです。仕事中に少しでも笑いを増やすために作られました。

## 技術スタック

- **フロントエンド**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **バックエンド**: Supabase (Database & Auth)
- **AI機能**: プリセットされた皮肉なレスポンス（MVPバージョン）

## セットアップ

1. **依存関係のインストール**
   ```bash
   npm install
   ```

2. **Supabaseの設定**
   - [Supabase](https://supabase.com)でプロジェクトを作成
   - 以下のSQLを実行してテーブルを作成:
   ```sql
   CREATE TABLE tasks (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     completed BOOLEAN DEFAULT FALSE,
     ai_response TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. **環境変数の設定**
   `.env.local`ファイルに以下を設定:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

   [http://localhost:3000](http://localhost:3000)でアプリにアクセスできます。

## 機能

- ✅ タスクの追加・削除・完了
- 🐍 タスク追加時の皮肉なAIコメント
- 📱 レスポンシブデザイン
- ⚡ リアルタイムデータベース同期

## 今後の拡張予定

- OpenAI APIとの統合でよりパーソナライズされた皮肉なレスポンス
- ユーザー認証機能
- タスクのカテゴリ分け
- 統計機能

## MVPの特徴

最低限の機能でリリースすることを意識し、以下に焦点を当てました：
- シンプルな UI/UX
- 基本的なCRUD操作
- プリセットされたAIレスポンス（API不要）
- 即座にデプロイ可能な構成

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
