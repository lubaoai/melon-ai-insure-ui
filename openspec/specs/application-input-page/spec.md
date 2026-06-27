## Requirements

### Requirement: 申込入力画面のルーティング
ApplicationInputPage SHALL `/application-input` パスでアクセス可能であること。

#### Scenario: /application-inputにアクセスすると申込入力画面が表示される
- **WHEN** ユーザーが `/application-input` にアクセスする
- **THEN** 申込入力画面が表示される

### Requirement: ページレイアウト構成
ApplicationInputPage SHALL StepNavigation（currentStep=3）、メインコンテンツ、Q&Aサイドバーで構成されること。メインコンテンツは7つのセクション（契約希望日・ご契約コース・住居の概要・ご契約者様の情報・住居の所在地・主たる居住者・同居人の明細）とナビゲーションボタンを含むこと。

#### Scenario: ページ構成要素が表示される
- **WHEN** ApplicationInputPageがレンダリングされる
- **THEN** StepNavigationのステップ3がアクティブ表示される
- **AND** 契約希望日セクションが表示される
- **AND** ご契約コースセクションが表示される
- **AND** 住居の概要セクションが表示される
- **AND** ご契約者様の情報セクションが表示される
- **AND** 住居の所在地セクションが表示される
- **AND** 主たる居住者セクションが表示される
- **AND** 同居人の明細セクションが表示される
- **AND** Q&Aサイドバーが表示される

### Requirement: 戻るボタンのナビゲーション
ApplicationInputPage SHALL 「戻る」ボタンクリック時に `/intent-confirmation` （意向確認画面）に遷移すること。

#### Scenario: 戻るボタンで意向確認画面に遷移する
- **WHEN** 「戻る」ボタンがクリックされる
- **THEN** `/intent-confirmation` に遷移する

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

### Requirement: 次へボタンの活性制御
ApplicationInputPage SHALL 全ての必須項目が入力された場合のみ「次へ」ボタンを活性化すること。ただし、条件付き表示フィールド（法人・契約者と異なる居住者・同居人あり）が非表示の場合はその項目を必須判定から除外すること。

#### Scenario: 必須項目が未入力の場合は次へボタンが非活性
- **WHEN** いずれかの必須項目が未入力である
- **THEN** 「次へ」ボタンは非活性（グレー背景・クリック不可）である

#### Scenario: 全必須項目入力済みの場合は次へボタンが活性
- **WHEN** 全ての必須項目が入力されている
- **THEN** 「次へ」ボタンが活性（オレンジ背景・クリック可能）である

#### Scenario: 条件付きフィールドが非表示の場合は必須判定から除外される
- **WHEN** 契約種別が「個人」で法人フィールドが非表示の状態
- **THEN** 法人名・法人名カナ・役職名は必須判定に含まれない

### Requirement: Q&Aサイドバーの内容
ApplicationInputPage SHALL 以下のQ&A項目をサイドバーに表示すること：
- Q1: 保険の開始はいつからですか？
- Q2: インターネットで申込みをしても保険証券・約款は届きますか？
- Q3: 保険金額をどのように決めたら良いですか？

#### Scenario: Q&Aサイドバーに正しい内容が表示される
- **WHEN** ApplicationInputPageがレンダリングされる
- **THEN** 「保険の開始はいつからですか？」が表示される
- **AND** 「インターネットで申込みをしても保険証券・約款は届きますか？」が表示される
- **AND** 「保険金額をどのように決めたら良いですか？」が表示される

### Requirement: レスポンシブレイアウト
ApplicationInputPage SHALL 875px以上の画面幅ではメインコンテンツとQ&Aサイドバーを横並びに、875px未満では縦並びに表示すること。

#### Scenario: 大画面では横並びレイアウト
- **WHEN** 画面幅が875px以上である
- **THEN** メインコンテンツ（幅800px）とQ&Aサイドバー（幅197px）が横並びに表示される

#### Scenario: 小画面では縦並びレイアウト
- **WHEN** 画面幅が875px未満である
- **THEN** メインコンテンツとQ&Aサイドバーが縦並びに表示される
