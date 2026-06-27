## Requirements

### Requirement: アンバー見出しセクションの表示
ContractSummarySection SHALL アンバー（#E99606）背景の見出し「契約の概要（注意喚起情報）」とアンバー枠線の説明文エリアを表示すること。

#### Scenario: アンバー見出しと説明文が表示される
- **WHEN** ContractSummarySectionがレンダリングされる
- **THEN** アンバー背景のh1見出し「契約の概要（注意喚起情報）」が表示される
- **AND** アンバー枠線の説明文エリアにスクロールとチェックボックスの案内が表示される

### Requirement: 契約概要スクロール領域の表示
ContractSummarySection SHALL マゼンタ（#b40081）見出し「契約の概要」とスクロール可能な契約概要内容を表示すること。スクロール領域の高さは300pxとする。

#### Scenario: 契約概要セクションが表示される
- **WHEN** ContractSummarySectionがレンダリングされる
- **THEN** マゼンタ背景のh1見出し「契約の概要」が表示される
- **AND** 高さ300pxのスクロール可能な領域に契約概要内容が表示される

#### Scenario: 契約概要スクロール領域の内容が空の場合
- **WHEN** 契約概要の内容が空文字列またはnullで渡される
- **THEN** スクロール領域に「契約の概要情報がありません」のメッセージが表示される

### Requirement: 確認チェックボックスのスクロール連動
ContractSummarySection SHALL スクロール領域を最後までスクロールした場合のみ「確認しました」チェックボックスを活性化すること。

#### Scenario: 初期状態ではチェックボックスが非活性
- **WHEN** スクロール位置が最下部に達していない
- **THEN** 「確認しました」チェックボックスは非活性（グレー背景・クリック不可）である

#### Scenario: スクロール完了でチェックボックスが活性化
- **WHEN** スクロール領域を最下部までスクロールする
- **THEN** 「確認しました」チェックボックスが活性化（白背景・クリック可能）する

### Requirement: 全文を見るリンクの表示
ContractSummarySection SHALL スクロール領域の下に「＞全文を見る」リンクを表示すること。

#### Scenario: 全文を見るリンクが表示される
- **WHEN** ContractSummarySectionがレンダリングされる
- **THEN** 「＞全文を見る」リンクがスクロール領域の下に表示される

### Requirement: 確認状態のコールバック
ContractSummaryComponent SHALL チェックボックスの状態变化を親コンポーネントに通知すること。

#### Scenario: チェックボックスONでコールバックが呼ばれる
- **WHEN** 「確認しました」チェックボックスがオンになる
- **THEN** onConfirm コールバックが true で呼ばれる

#### Scenario: チェックボックスOFFでコールバックが呼ばれる
- **WHEN** 「確認しました」チェックボックスがオフになる
- **THEN** onConfirm コールバックが false で呼ばれる
