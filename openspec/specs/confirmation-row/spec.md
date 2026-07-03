## Requirements

### Requirement: ConfirmationRowコンポーネントのレスポンシブ表示
ConfirmationRowコンポーネント SHALL ラベルと値のペアを表示し、ビューポート幅875px未満では1カラムで縦スタックし、875px以上では2カラム（260px / 1fr）で横並び表示すること。

#### Scenario: モバイル表示でラベルと値が縦にスタックされる
- **WHEN** ビューポート幅が875px未満の環境でConfirmationRowがレンダリングされる
- **THEN** ラベルと値が1カラムの縦並びで表示される
- **AND** ラベルが全幅で表示される
- **AND** 値が全幅で表示される
- **AND** 値セルの上部ボーダーが非表示（border-t-0）となる

#### Scenario: デスクトップ表示でラベルと値が横並びになる
- **WHEN** ビューポート幅が875px以上の環境でConfirmationRowがレンダリングされる
- **THEN** ラベルと値が2カラム（260px / 1fr）の横並びで表示される
- **AND** 値セルに上部ボーダーと左ボーダーなし（border-t border-l-0）が適用される
- **AND** ラベルのテキストが改行されない（whitespace-nowrap）

#### Scenario: ラベルが空文字の場合
- **WHEN** ConfirmationRowに空文字のlabelプロパティが渡される
- **THEN** ラベル列は空欄で表示される
- **AND** レイアウトは変更されない

#### Scenario: 値が空文字の場合
- **WHEN** ConfirmationRowに空文字のvalueプロパティが渡される
- **THEN** 値列は空欄で表示される
- **AND** レイアウトは変更されない
