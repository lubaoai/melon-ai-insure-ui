## ADDED Requirements

### Requirement: Vite + React 19 + TypeScript プロジェクト初期化
Viteを用いてReact 19 + TypeScriptのプロジェクトを初期化し、開発サーバーが正常に起動すること。

#### Scenario: 開発サーバーの起動
- **WHEN** `npm run dev` を実行したとき
- **THEN** Vite開発サーバーが起動し、ブラウザでアプリケーションにアクセスできる

#### Scenario: TypeScriptコンパイルの成功
- **WHEN** `npx tsc --noEmit` を実行したとき
- **THEN** 型エラーなしでコンパイルが完了する

### Requirement: Tailwind CSS 4 の統合
Tailwind CSS 4と@tailwindcss/viteプラグインを導入し、ユーティリティクラスが正常に動作すること。

#### Scenario: Tailwindユーティリティクラスの適用
- **WHEN** コンポーネント内でTailwindユーティリティクラス（例: `text-blue-500`）を使用したとき
- **THEN** スタイルが正しく適用されてブラウザに反映される

### Requirement: スケーラブルなディレクトリ構造の作成
役割を明確に分けたディレクトリ構造を作成すること。

#### Scenario: 必須ディレクトリの存在
- **WHEN** プロジェクトの初期化が完了したとき
- **THEN** 以下のディレクトリが存在する: `src/app/views/`, `src/app/layouts/`, `src/modules/`, `src/router/`, `src/lib/`, `src/mocks/`

#### Scenario: ディレクトリの役割分離
- **WHEN** 新しい機能を追加するとき
- **THEN** ページコンポーネントは `app/views/`、レイアウトは `app/layouts/`、ドメインロジックは `modules/`、ルーティング設定は `router/`、ユーティリティは `lib/` に配置する規約に従う

### Requirement: ESLint + Prettier の設定
コード規約としてESLint + Prettierを設定すること。

#### Scenario: Lintの実行
- **WHEN** `npm run lint` を実行したとき
- **THEN** ESLintが正常に実行され、設定されたルールに基づいてチェックが行われる

#### Scenario: フォーマットの実行
- **WHEN** `npm run format` を実行したとき
- **THEN** Prettierが正常に実行され、コードがフォーマットされる
