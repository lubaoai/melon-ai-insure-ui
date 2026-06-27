## なぜ

保険商品販売（Melon AI Insure）のフロントエンドプロジェクトを新規立ち上げする必要がある。現在、リポジトリは空の初期状態であり、開発を開始するための基盤（スキャフォールド、ルーティング、APIモック、UI描画、品質管理）が一切存在しない。開発チームが機能開発に着手できるよう、スケーラブルで本番に近い開発体験を提供するプロジェクトの土台を今すぐ構築しなければならない。

## 変更内容

- Vite + React 19 + TypeScript + Tailwind CSS 4 による高速SPA環境を構築する
- 役割を明確に分けたスケーラブルなディレクトリ構造（`app/views`, `app/layouts`, `modules`, `router`, `lib`）を採用する
- React Router 7 を導入し、`/` に HomePage を割り当て、404対応を追加する
- MSW (Mock Service Worker) を導入し、ブラウザレベルでAPIリクエストを模倣するモック環境を構築する
- HomePage コンポーネントからモックAPI経由で保険商品一覧を描画する
- OpenSpec連携の config.yaml とレビューテンプレートを初期から組み込み、品質管理を自動化する
- GitHub リポジトリへの初期コミット・プッシュを行う

## 機能一覧

### 新規機能
- `project-scaffold`: Vite + React 19 + TypeScript + Tailwind CSS 4 のプロジェクト初期構成とスケーラブルなディレクトリ構造
- `routing`: React Router 7 を用いたルーティング設定（HomePage、404ページ）、routerディレクトリへの集約
- `msw-api-mock`: MSWによるAPIモック環境の構築、ブラウザレベルでのネットワークリクエスト模倣
- `home-page`: HomePage コンポーネントによる保険商品一覧の描画（モックAPI経由でデータ取得）
- `openspec-integration`: OpenSpec連携の config.yaml とレビューテンプレートの初期組み込み

### 修正機能

（既存機能はないため、該当なし）

## 影響範囲

- **依存関係**: vite, react, react-dom, typescript, tailwindcss, @tailwindcss/vite, react-router-dom, msw を新規インストール
- **ディレクトリ構造**: `src/app/views/`, `src/app/layouts/`, `src/modules/`, `src/router/`, `src/lib/`, `src/mocks/` を新規作成
- **設定ファイル**: vite.config.ts, tsconfig.json, tailwind設定, MSW設定, OpenSpec config.yaml を新規追加
- **Git**: 初期コミットとして全ファイルを追加
