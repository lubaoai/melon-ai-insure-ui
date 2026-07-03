## 背景

申込完了画面のCompletionSummarySection内のSummaryRowコンポーネントは`grid-cols-[260px_1fr]`の固定2カラムレイアウトを使用しており、モバイル画面での表示が崩れる。申込内容確認画面では既に共通ConfirmationRowコンポーネントが作成され、レスポンシブ対応が完了している。SummaryRowはConfirmationRowと同じProps（label/value）と同じ表示構造を持つため、ConfirmationRowに置き換えることができる。

## 目標 / 非目標

**目標：**
- SummaryRowをConfirmationRowに置き換え、完了画面も875pxブレークポイントでレスポンシブ対応する
- 確認画面と完了画面のラベル・値表示のスタイルを統一する

**非目標：**
- ConfirmationRowの仕様変更
- 完了画面の表示内容やデータ構造の変更

## 主要な決定

### 1. SummaryRowをConfirmationRowに置き換える

**決定**: ローカルSummaryRowを削除し、`src/components/confirmation/ConfirmationRow.tsx`をインポートして使用する

**理由**: SummaryRowとConfirmationRowはProps（label/value）と表示構造が同一であり、レスポンシブ対応済みのConfirmationRowを再利用することで重複コードを排除し、保守性を向上する。

**代替案**: SummaryRowにレスポンシブクラスを追加する → 同じコンポーネントが2箇所に存在し、将来のスタイル変更時に修正漏れが発生するリスクがある

### 2. ボーダー調整の統一

**決定**: ConfirmationRowのボーダーパターン（モバイル: `border-t-0`、デスクトップ: `min-[875px]:border-t min-[875px]:border-l-0`）をそのまま適用する

**理由**: 確認画面と完了画面で視覚的に統一された表示を保つため。

## リスクとトレードオフ

- **[リスク] ConfirmationRowのインポートパス**: ConfirmationRowは`confirmation/`ディレクトリにあるが、完了画面から利用することになる → インポートパスの違いは技術的な問題ではなく、必要に応じて共通ディレクトリへの移動も検討可能だが、現状ではシンプルにインポートする
