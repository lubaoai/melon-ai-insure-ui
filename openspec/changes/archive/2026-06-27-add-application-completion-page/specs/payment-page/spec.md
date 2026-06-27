## MODIFIED Requirements

### Requirement: 次へボタンの遷移とバリデーション

「次へ」ボタン SHALL 全ての必須入力項目が妥当な場合のみ有効になる。有効な状態でクリックされた場合、ストアの `isCompleted` を `true` に設定し、`/application-completion` に遷移する。

#### Scenario: 必須項目が未入力の状態で次へボタンが無効
- **WHEN** クレジットカード情報の必須項目が未入力またはバリデーションエラーがある
- **THEN** 「次へ」ボタンが disabled 状態で表示される

#### Scenario: 全項目が入力済みで次へボタンが有効
- **WHEN** クレジットカード情報の全ての必須項目が正常に入力されている
- **THEN** 「次へ」ボタンが有効状態で表示される

#### Scenario: 次へボタンをクリックする
- **WHEN** ユーザーが有効な「次へ」ボタンをクリックする
- **THEN** ストアの `isCompleted` が `true` に設定され、`/application-completion` に遷移する
