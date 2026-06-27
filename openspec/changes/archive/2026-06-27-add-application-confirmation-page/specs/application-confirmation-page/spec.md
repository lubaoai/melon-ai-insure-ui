## ADDED Requirements

### Requirement: 申込内容確認画面のルーティング
ApplicationConfirmationPage SHALL `/application-confirmation` パスでアクセス可能であること。

#### Scenario: /application-confirmationにアクセスすると申込内容確認画面が表示される
- **WHEN** ユーザーが `/application-confirmation` にアクセスする
- **THEN** 申込内容確認画面が表示される

### Requirement: ページレイアウト構成
ApplicationConfirmationPage SHALL StepNavigation（currentStep=4）、メインコンテンツ、Q&Aサイドバーで構成されること。メインコンテンツは7つの確認セクション（契約希望日・ご契約コース・住居の概要・ご契約者様の情報・住居の所在地・主たる居住者・同居人の明細）とナビゲーションボタンを含むこと。

#### Scenario: ページ構成要素が表示される
- **WHEN** ApplicationConfirmationPageがレンダリングされる
- **THEN** StepNavigationのステップ4がアクティブ表示される
- **AND** 契約希望日確認セクションが表示される
- **AND** ご契約コース確認セクションが表示される
- **AND** 住居の概要確認セクションが表示される
- **AND** ご契約者様の情報確認セクションが表示される
- **AND** 住居の所在地確認セクションが表示される
- **AND** 主たる居住者確認セクションが表示される
- **AND** 同居人の明細確認セクションが表示される
- **AND** Q&Aサイドバーが表示される

### Requirement: 戻るボタンのナビゲーション
ApplicationConfirmationPage SHALL 「戻る」ボタンクリック時に `/application-input` （申込入力画面）に遷移すること。

#### Scenario: 戻るボタンで申込入力画面に遷移する
- **WHEN** 「戻る」ボタンがクリックされる
- **THEN** `/application-input` に遷移する

### Requirement: 次へボタンのナビゲーション
ApplicationConfirmationPage SHALL 「次へ」ボタンクリック時に申込完了処理への遷移を実行すること。現段階では遷移先が未実装のため、コンソールにログ出力すること。

#### Scenario: 次へボタンクリックで遷移を試みる
- **WHEN** 「次へ」ボタンがクリックされる
- **THEN** 申込完了処理への遷移処理が実行される

### Requirement: フォームデータの表示
ApplicationConfirmationPage SHALL Zustandストアから申込入力画面で入力された全フォームデータを取得し、各確認セクションに渡して表示すること。

#### Scenario: 入力データが確認画面に表示される
- **WHEN** ユーザーが申込入力画面から次へボタンで確認画面に遷移する
- **THEN** 入力画面で入力された全データが各確認セクションに表示される

#### Scenario: ストアにデータが存在しない場合は入力画面にリダイレクトされる
- **WHEN** ユーザーが直接 `/application-confirmation` にアクセスし、ストアにデータが存在しない
- **THEN** `/application-input` にリダイレクトされる

### Requirement: Q&Aサイドバーの内容
ApplicationConfirmationPage SHALL 以下のQ&A項目をサイドバーに表示すること：
- Q1: 保険の開始はいつからですか？
- Q2: インターネットで申込みをしても保険証券・約款は届きますか？
- Q3: 保険金額をどのように決めたら良いですか？

#### Scenario: Q&Aサイドバーに正しい内容が表示される
- **WHEN** ApplicationConfirmationPageがレンダリングされる
- **THEN** 「保険の開始はいつからですか？」が表示される
- **AND** 「インターネットで申込みをしても保険証券・約款は届きますか？」が表示される
- **AND** 「保険金額をどのように決めたら良いですか？」が表示される

### Requirement: レスポンシブレイアウト
ApplicationConfirmationPage SHALL 875px以上の画面幅ではメインコンテンツとQ&Aサイドバーを横並びに、875px未満では縦並びに表示すること。

#### Scenario: 大画面では横並びレイアウト
- **WHEN** 画面幅が875px以上である
- **THEN** メインコンテンツ（幅800px）とQ&Aサイドバー（幅197px）が横並びに表示される

#### Scenario: 小画面では縦並びレイアウト
- **WHEN** 画面幅が875px未満である
- **THEN** メインコンテンツとQ&Aサイドバーが縦並びに表示される
