## MODIFIED Requirements

### Requirement: 確認セクションのスタイル統一
各確認セクション SHALL マゼンタ（--color-primary）背景の見出しとクリーム（--color-cream）背景のコンテンツエリアで構成されること。ラベルと値はビューポート幅875px以上の場合は1行のペア構成（grid-cols-[260px_1fr]）で表示し、875px未満の場合は1カラムで縦スタック表示すること。共通のConfirmationRowコンポーネントを使用すること。

#### Scenario: 確認セクションが既存スタイルで表示される
- **WHEN** 任意の確認セクションがレンダリングされる
- **THEN** 見出しがマゼンタ背景・白色テキストで表示される
- **AND** コンテンツエリアがクリーム背景で表示される
- **AND** 外枠に4pxのマゼンタボーダーが表示される
- **AND** ラベルと値が共通のConfirmationRowコンポーネントで表示される

#### Scenario: デスクトップ表示でラベルと値が横並びになる
- **WHEN** ビューポート幅が875px以上の環境で確認セクションがレンダリングされる
- **THEN** ラベルの幅が260px（grid-cols-[260px_1fr]の第1カラム）であること
- **AND** 値の幅が1fr（grid-cols-[260px_1fr]の第2カラム）であること
- **AND** ラベルと値が1行のペア構成で表示される

#### Scenario: モバイル表示でラベルと値が縦にスタックされる
- **WHEN** ビューポート幅が875px未満の環境で確認セクションがレンダリングされる
- **THEN** ラベルと値が1カラムの縦並びで表示される
- **AND** ラベルが全幅で表示される
- **AND** 値が全幅で表示される

#### Scenario: ContractDateConfirmationSectionがConfirmationRowを使用する
- **WHEN** ContractDateConfirmationSectionがレンダリングされる
- **THEN** インライングリッド定義ではなくConfirmationRowコンポーネントが使用される
