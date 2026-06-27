## ADDED Requirements

### Requirement: 注意喚起セクションの表示
CautionSection SHALL マゼンタ（#b40081）見出し「注意喚起」とスクロール可能な注意喚起情報を表示すること。スクロール領域の高さは300pxとする。

#### Scenario: 注意喚起セクションが表示される
- **WHEN** CautionSectionがレンダリングされる
- **THEN** マゼンタ背景のh1見出し「注意喚起」が表示される
- **AND** 高さ300pxのスクロール可能な領域に注意喚起内容が表示される

#### Scenario: 注意喚起内容が空の場合
- **WHEN** 注意喚起の内容が空文字列またはnullで渡される
- **THEN** スクロール領域に「注意喚起情報がありません」のメッセージが表示される

### Requirement: 全文を見るリンクの表示
CautionSection SHALL スクロール領域の下に「＞全文を見る」リンクを表示すること。

#### Scenario: 全文を見るリンクが表示される
- **WHEN** CautionSectionがレンダリングされる
- **THEN** 「＞全文を見る」リンクがスクロール領域の下に表示される
