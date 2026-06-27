## MODIFIED Requirements

### Requirement: 保険料合計の表示

CompletionSummarySection SHALL ストアの `insurancePremium` 値を保険料合計として表示する。ストアの `insurancePremium` 初期値は 880 とする。

#### Scenario: 保険料合計に880円が表示される
- **WHEN** 申込完了画面が表示される
- **THEN** 保険料合計に「880円」が表示される

#### Scenario: 保険料合計が0円の場合
- **WHEN** insurancePremium が 0 の場合
- **THEN** 保険料合計に「0円」が表示される

#### Scenario: 保険料合計が大きな金額の場合
- **WHEN** insurancePremium が 15000 の場合
- **THEN** 保険料合計に「15,000円」が表示される
