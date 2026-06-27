## なぜ

決済手続き画面（ステップ⑤）の次へボタンから遷移する申込完了画面（ステップ⑥）が存在せず、保険申込みフローの最終ステップを完了できない。申込完了画面を実装し、ユーザーに申込み完了の確認と申込内容の参照情報を提供する必要がある。

## 変更内容

- 申込完了画面（`ApplicationCompletionPage`）を新規追加する
- ルーティングに `/application-completion` パスを追加する
- 決済手続き画面の「次へ」ボタンから `/application-completion` へ遷移するよう変更する
- 以下のセクションコンポーネントを新規作成する：
  - **完了メッセージセクション**：申込み完了のメッセージと受付番号の表示
  - **申込内容確認セクション**：契約コース・お支払金額の確認表示
- 決済手続き画面の `handleNext` を `/application-completion` への遷移に変更する

## 機能一覧

### 新規機能
- `application-completion-page`: 申込完了画面全体のページ構成・ルーティング・遷移制御

### 修正機能
- `payment-page`: 決済手続き画面の「次へ」ボタンの遷移先を `/application-completion` に変更

## 影響範囲

- `src/App.tsx` / `src/router/index.tsx`：ルーティング追加
- `src/app/views/PaymentPage.tsx`：次へボタンの遷移先変更
- `src/components/completion/`：新規セクションコンポーネント群
- `src/components/layout/StepNavigation.tsx`：currentStep=6 で利用（変更不要）
