## ADDED Requirements

### Requirement: Lucide Reactの導入とアイコンマッピング

システムはlucide-reactパッケージを依存関係として追加し（MUST）、アプリケーション全体で使用するアイコンのマッピングを定義しなければならない（MUST）。アイコンはTree-shaking対応で個別インポートしなければならない（MUST）。

マッピング定義:
- ナビゲーションステップ区切り: `ChevronRight`
- 警告・重要事項: `AlertCircle`
- 次へ・送信ボタン: `ArrowRightCircle`
- Q&A質問: `HelpCircle`
- リスト項目: `Square`
- ローディング: `Loader2`（回転アニメーション付き）

#### Scenario: アイコンがコンポーネントで使用可能
- **WHEN** 開発者が`<Icon name="alert-circle" />`のようにアイコンコンポーネントを使用する時
- **THEN** 対応するLucideアイコンがレンダリングされること

#### Scenario: Tree-shakingが有効
- **WHEN** ビルドを実行する時
- **THEN** 使用されていないアイコンはバンドルに含まれないこと

#### Scenario: 未定義のアイコン名が指定された場合
- **WHEN** マッピングに存在しないアイコン名が指定された時
- **THEN** デフォルトのプレースホルダーアイコンがレンダリングされること（エラーで停止しない）

### Requirement: アイコンのサイズ・カラー制御

システムはアイコンのサイズ（sm: 16px, md: 20px, lg: 24px）とカラー（currentColor継承または明示的指定）を制御できなければならない（MUST）。

#### Scenario: サイズバリエーションが適用される
- **WHEN** `size="sm"`を指定した時
- **THEN** アイコンが16pxでレンダリングされること

#### Scenario: カラーがテキストカラーを継承する
- **WHEN** 親要素に`text-primary`クラスが適用されている時
- **THEN** アイコンのカラーが親のテキストカラーを継承すること

#### Scenario: 空値のサイズが指定された場合
- **WHEN** サイズプロパティがundefinedまたは空文字の場合
- **THEN** デフォルトサイズ（md: 20px）が適用されること
