## MODIFIED Requirements

### Requirement: お支払金額の表示

PaymentAmountSection SHALL ストアの `insurancePremium` 値を保険料合計として表示する。ストアの `insurancePremium` 初期値は 880 とする。

#### Scenario: お支払金額に880円が表示される
- **WHEN** 決済手続き画面が表示される
- **THEN** お支払金額セクションに「880円」が表示される

#### Scenario: お支払金額が0円の場合
- **WHEN** insurancePremium が 0 の場合
- **THEN** お支払金額セクションに「0円」が表示される

#### Scenario: お支払金額が大きな金額の場合
- **WHEN** insurancePremium が 15000 の場合
- **THEN** お支払金額セクションに「15,000円」が表示される
