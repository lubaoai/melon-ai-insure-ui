## ADDED Requirements

### Requirement: OpenSpec config.yaml の配置
OpenSpec連携の設定ファイル `openspec/config.yaml` をプロジェクトルートに配置すること。

#### Scenario: config.yamlの存在
- **WHEN** プロジェクトの初期化が完了したとき
- **THEN** `openspec/config.yaml` が存在し、プロジェクトの技術スタックと規約が定義されている

#### Scenario: 技術スタックの定義
- **WHEN** config.yamlを確認したとき
- **THEN** React 19, TypeScript, Vite, Tailwind CSS 4, Zustand, Vitest, React Router 7 の技術スタックが定義されている

### Requirement: レビューテンプレートの組み込み
OpenSpecのレビューテンプレートを初期から組み込み、品質管理の自動化を可能にすること。

#### Scenario: レビューテンプレートの存在
- **WHEN** プロジェクトの初期化が完了したとき
- **THEN** レビュー用テンプレートファイルがOpenSpec設定に組み込まれている
