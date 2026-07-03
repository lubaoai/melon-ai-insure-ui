## なぜ

申込完了画面のCompletionSummarySection内のSummaryRowコンポーネントは`grid-cols-[260px_1fr]`の固定2カラムレイアウトを使用しており、モバイル画面でもラベルと値が横並びのまま表示される。申込入力画面のFormRowや申込内容確認画面のConfirmationRowは875pxブレークポイントでレスポンシブ対応済みだが、完了画面のSummaryRowのみ未対応である。他画面と同様にモバイルではラベルと値を縦スタックする必要がある。

## 変更内容

- CompletionSummarySection内のローカルSummaryRowを共通ConfirmationRowコンポーネントに置き換える
- モバイル（875px未満）ではラベルと値を縦にスタックし、デスクトップ（875px以上）では横並び表示とする
- ボーダー調整をFormRow/ConfirmationRowと同じパターンに統一する

## 機能一覧

### 新規機能

（なし）

### 修正機能

- `application-completion-page`: 申込内容確認セクションのSummaryRowをConfirmationRowに置き換え、レスポンシブ対応に変更

## 影響範囲

- `src/components/completion/CompletionSummarySection.tsx`
- `src/__tests__/CompletionSummarySection.test.tsx`
