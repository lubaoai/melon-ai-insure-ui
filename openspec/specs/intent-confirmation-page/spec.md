## Requirements

### Requirement: 意向確認画面のルーティング
IntentConfirmationPage SHALL `/intent-confirmation` パスでアクセス可能であること。

#### Scenario: /intent-confirmationにアクセスすると意向確認画面が表示される
- **WHEN** ユーザーが `/intent-confirmation` にアクセスする
- **THEN** 意向確認画面が表示される

### Requirement: ページレイアウト構成
IntentConfirmationPage SHALL ヘッダー、StepNavigation（currentStep=2）、メインコンテンツ、Q&Aサイドバー、フッターで構成されること。メインコンテンツはContractSummarySection、CautionSection、意向確認セクションを含むこと。

#### Scenario: ページ構成要素が表示される
- **WHEN** IntentConfirmationPageがレンダリングされる
- **THEN** StepNavigationのステップ2がアクティブ表示される
- **AND** ContractSummarySectionが表示される
- **AND** CautionSectionが表示される
- **AND** 意向確認セクションが表示される
- **AND** Q&Aサイドバーが表示される

### Requirement: 戻るボタンのナビゲーション
IntentConfirmationPage SHALL 「戻る」ボタンクリック時に `/` （HomePage）に遷移すること。

#### Scenario: 戻るボタンでHomePageに遷移する
- **WHEN** 「戻る」ボタンがクリックされる
- **THEN** `/` に遷移する

### Requirement: 次へボタンのナビゲーション
IntentConfirmationPage SHALL 「次へ」ボタンクリック時に `/application-input` （申込入力画面）に遷移すること。

#### Scenario: 次へボタンクリックで申込入力画面に遷移する
- **WHEN** 両チェックボックスがオンの状態で「次へ」ボタンがクリックされる
- **THEN** `/application-input` に遷移する
