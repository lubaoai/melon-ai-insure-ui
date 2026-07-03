## なぜ

申込内容確認画面のConfirmationRowコンポーネントは`grid-cols-[260px_1fr]`の固定2カラムレイアウトを使用しており、モバイル画面でもラベルと値が横並びのまま表示される。そのため、小さな画面ではテキストが折り返されず、表示が崩れる問題がある。申込入力画面のFormRowコンポーネントは`grid-cols-1 min-[875px]:grid-cols-[260px_1fr]`でレスポンシブ対応しており、モバイルではラベルと値が縦にスタックされる。確認画面も入力画面と同じレスポンシブ対応を行う必要がある。

## 変更内容

- 確認セクション共通の`ConfirmationRow`コンポーネントを作成し、各確認セクションの重複するConfirmationRow定義を集約する
- `ConfirmationRow`にFormRowと同じレスポンシブブレークポイント（875px）を適用し、モバイルではラベルと値を縦にスタックする
- モバイル表示時のボーダー調整（ラベル下部ボーダーなし、値上部ボーダーなし→スタック時に連結表示）
- 全7つの確認セクション（ContractDate、ContractCourse、HousingOverview、ContractorInfo、ResidenceLocation、PrimaryResident、CoResident）を新しいConfirmationRowコンポーネントに移行する

## 機能一覧

### 新規機能
- `confirmation-row`: 確認セクション共通のConfirmationRowコンポーネント。モバイルではラベルと値を縦スタック、875px以上では横並び表示

### 修正機能
- `application-confirmation-sections`: ラベルと値の表示をレスポンシブ対応に変更。モバイル時は1カラムで縦スタック表示

## 影響範囲

- `src/components/confirmation/`配下の全7セクションコンポーネント
- 新規作成: `src/components/confirmation/ConfirmationRow.tsx`
- 既存の各コンポーネント内のConfirmationRowローカル定義を削除し、共通コンポーネントをインポートするよう変更
- テストコードの更新（レスポンシブクラスの検証追加）
