## MODIFIED Requirements

### Requirement: 次へボタンのナビゲーション
IntentConfirmationPage SHALL 「次へ」ボタンクリック時に `/application-input` （申込入力画面）に遷移すること。

#### Scenario: 次へボタンクリックで申込入力画面に遷移する
- **WHEN** 両チェックボックスがオンの状態で「次へ」ボタンがクリックされる
- **THEN** `/application-input` に遷移する
