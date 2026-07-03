## MODIFIED Requirements

### Requirement: 申込内容確認セクション

`CompletionSummarySection` コンポーネント SHALL 契約コース情報と保険料合計を表示する。表示内容は Zustand ストアの `contractCourse` データに基づく。`CompletionSummarySection` SHALL ストアの `insurancePremium` 値を保険料合計として表示する。ストアの `insurancePremium` 初期値は 880 とする。ラベルと値の表示には共通の`ConfirmationRow`コンポーネントを使用し、ビューポート幅875px以上の場合は横並び、875px未満の場合は縦スタックで表示すること。

#### Scenario: 契約コース情報が表示される
- **WHEN** 申込内容確認セクションが表示される
- **THEN** 保険期間・支払方法・商品・プラン種別が表示される

#### Scenario: 保険料合計に880円が表示される
- **WHEN** 申込完了画面が表示される
- **THEN** 保険料合計に「880円」が表示される

#### Scenario: 保険料合計が0円の場合
- **WHEN** insurancePremium が 0 の場合
- **THEN** 保険料合計に「0円」が表示される

#### Scenario: 保険料合計が大きな金額の場合
- **WHEN** insurancePremium が 15000 の場合
- **THEN** 保険料合計に「15,000円」が表示される

#### Scenario: デスクトップ表示でラベルと値が横並びになる
- **WHEN** ビューポート幅が875px以上の環境で申込内容確認セクションがレンダリングされる
- **THEN** ラベルと値が2カラム（260px / 1fr）の横並びで表示される

#### Scenario: モバイル表示でラベルと値が縦にスタックされる
- **WHEN** ビューポート幅が875px未満の環境で申込内容確認セクションがレンダリングされる
- **THEN** ラベルと値が1カラムの縦並びで表示される

#### Scenario: ConfirmationRowコンポーネントを使用していること
- **WHEN** CompletionSummarySectionがレンダリングされる
- **THEN** ローカルSummaryRowではなく共通ConfirmationRowコンポーネントが使用される
