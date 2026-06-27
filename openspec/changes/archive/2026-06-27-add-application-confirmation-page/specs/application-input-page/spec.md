## MODIFIED Requirements

### Requirement: 次へボタンのナビゲーション
ApplicationInputPage SHALL 「次へ」ボタンクリック時に `/application-confirmation` （申込内容確認画面）に遷移すること。遷移前にZustandストアにフォームデータを保存すること。

#### Scenario: 次へボタンクリックで申込内容確認画面に遷移する
- **WHEN** 全ての必須項目が入力された状態で「次へ」ボタンがクリックされる
- **THEN** フォームデータがZustandストアに保存される
- **AND** `/application-confirmation` に遷移する

### Requirement: フォームデータのストア同期
ApplicationInputPage SHALL 各セクションの入力変更時にZustandストアにデータを同期すること。

#### Scenario: 入力変更時にストアが更新される
- **WHEN** ユーザーがいずれかのセクションのフィールドを変更する
- **THEN** Zustandストアの対応するデータが即座に更新される
