## ADDED Requirements

### Requirement: 決済手続き画面のルーティング

システム SHALL `/payment` パスに決済手続き画面（`PaymentPage`）をルーティングする。決済手続き画面は `StepNavigation` コンポーネントに `currentStep={5}` を渡して表示する。

#### Scenario: 申込内容確認画面から決済手続き画面へ遷移する
- **WHEN** ユーザーが申込内容確認画面で「次へ」ボタンをクリックする
- **THEN** `/payment` パスに遷移し、決済手続き画面が表示される

#### Scenario: 直接URLアクセスでストアデータがない場合
- **WHEN** ユーザーが `/payment` に直接アクセスし、Zustand ストアに申込みデータが存在しない
- **THEN** `/application-input` にリダイレクトする

#### Scenario: ステップナビゲーションの表示
- **WHEN** 決済手続き画面が表示される
- **THEN** ステップナビゲーションの⑤決済手続きがアクティブ状態で表示される

### Requirement: 決済手続き画面のレイアウト

決済手続き画面 SHALL 以下のレイアウト構成を持つ：
- ページ上部に `StepNavigation`（currentStep=5）
- メインコンテンツ領域にお支払方法セクション、クレジットカード情報セクション、お支払金額セクション、注意事項セクションを縦に配置
- メインコンテンツの右側（875px以上）に Q&A サイドバーを配置
- 下部に「戻る」「次へ」ナビゲーションボタンを配置

#### Scenario: ワイド画面でのレイアウト
- **WHEN** 画面幅が875px以上の場合
- **THEN** メインコンテンツ（幅800px）と Q&A サイドバー（幅197px）が横並びで表示される

#### Scenario: ナロー画面でのレイアウト
- **WHEN** 画面幅が875px未満の場合
- **THEN** メインコンテンツと Q&A サイドバーが縦並びで表示される

### Requirement: 戻るボタンの遷移先

決済手続き画面の「戻る」ボタン SHALL `/application-confirmation` に遷移する。

#### Scenario: 戻るボタンをクリックする
- **WHEN** ユーザーが「戻る」ボタンをクリックする
- **THEN** `/application-confirmation` に遷移し、申込内容確認画面が表示される

### Requirement: 次へボタンの遷移とバリデーション

「次へ」ボタン SHALL 全ての必須入力項目が妥当な場合のみ有効になる。有効な状態でクリックされた場合、コンソールにログ出力する（申込完了画面は別 change で実装）。

#### Scenario: 必須項目が未入力の状態で次へボタンが無効
- **WHEN** クレジットカード情報の必須項目が未入力またはバリデーションエラーがある
- **THEN** 「次へ」ボタンが disabled 状態で表示される

#### Scenario: 全項目が入力済みで次へボタンが有効
- **WHEN** クレジットカード情報の全ての必須項目が正常に入力されている
- **THEN** 「次へ」ボタンが有効状態で表示される

#### Scenario: 次へボタンをクリックする
- **WHEN** ユーザーが有効な「次へ」ボタンをクリックする
- **THEN** コンソールに "PaymentPage: next clicked — proceed to completion" と出力される

### Requirement: Zustand ストアへの決済情報追加

`applicationFormStore` SHALL 決済情報として以下の状態とアクションを追加する：

状態:
- `paymentMethod: string` - 支払方法（デフォルト: `'credit'`）
- `creditCardInfo: CreditCardInfoData` - クレジットカード情報

アクション:
- `setPaymentMethod(method: string)` - 支払方法の設定
- `setCreditCardInfo(data: CreditCardInfoData)` - クレジットカード情報の設定

#### Scenario: ストアに決済情報が保持される
- **WHEN** ユーザーがクレジットカード情報を入力し、ストアに反映される
- **THEN** `applicationFormStore` の `creditCardInfo` に入力値が保持される

#### Scenario: ストア初期値の確認
- **WHEN** アプリケーションが初期化される
- **THEN** `paymentMethod` は `'credit'`、`creditCardInfo` は空文字の各フィールドで初期化される

### Requirement: スクロールトップボタン

決済手続き画面 SHALL `ScrollTopButton` コンポーネントを表示する。

#### Scenario: スクロールトップボタンが表示される
- **WHEN** 決済手続き画面が表示される
- **THEN** 画面右下にスクロールトップボタンが表示される
