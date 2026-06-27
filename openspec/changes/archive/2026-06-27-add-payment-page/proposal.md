## なぜ

申込内容確認画面（ステップ④）の次へボタンから遷移する決済手続き画面（ステップ⑤）が存在せず、保険料の支払い手続きを完了できない。保険申込みフローを完結させるため、決済手続き画面を実装する必要がある。

## 変更内容

- 決済手続き画面（`PaymentPage`）を新規追加する
- ルーティングに `/payment` パスを追加する
- 申込内容確認画面の「次へ」ボタンから `/payment` へ遷移するよう変更する
- 以下のセクションコンポーネントを新規作成する：
  - **お支払方法セクション**：クレジットカード払いの選択（ラジオボタン）
  - **クレジットカード情報セクション**：カード番号・有効期限・カード名義人・セキュリティコードの入力フォーム
  - **お支払金額セクション**：保険料の合計金額表示
  - **注意事項セクション**：決済に関する注意事項の表示
- Zustand ストアに決済情報（支払方法・クレジットカード情報）の状態を追加する
- NavigationButtons コンポーネントで「戻る」→申込内容確認画面、「次へ」→申込完了画面への遷移を実装する

## 機能一覧

### 新規機能
- `payment-page`: 決済手続き画面全体のページ構成・ルーティング・遷移制御
- `payment-form-sections`: お支払方法・クレジットカード情報・お支払金額・注意事項の各セクションコンポーネント

### 修正機能
- `application-input-page`: 申込内容確認画面の「次へ」ボタンの遷移先を `/payment` に変更

## 影響範囲

- `src/App.tsx` / `src/router/index.tsx`：ルーティング追加
- `src/app/views/ApplicationConfirmationPage.tsx`：次へボタンの遷移先変更
- `src/store/applicationFormStore.ts`：決済情報の状態・アクション追加
- `src/components/payment/`：新規セクションコンポーネント群
- `src/components/application/NavigationButtons.tsx`：既存コンポーネントの再利用
- `src/components/layout/StepNavigation.tsx`：currentStep=5 で利用（変更不要）
