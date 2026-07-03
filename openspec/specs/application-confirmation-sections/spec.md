## Requirements

### Requirement: 契約希望日確認セクションの表示
ContractDateConfirmationSection SHALL 見出し「① 契約希望日」と契約希望日の値をラベルと値のペアで読み取り専用表示すること。

#### Scenario: 契約希望日が表示される
- **WHEN** ContractDateConfirmationSectionにdateプロパティが渡される
- **THEN** 見出し「① 契約希望日」が表示される
- **AND** ラベル「契約希望日」と値が表示される

#### Scenario: 契約希望日がnullまたは空文字の場合
- **WHEN** ContractDateConfirmationSectionに空文字のdateプロパティが渡される
- **THEN** 値は空欄で表示される

### Requirement: ご契約コース確認セクションの表示
ContractCourseConfirmationSection SHALL 見出し「② ご契約コース」と以下の項目をラベルと値のペアで読み取り専用表示すること：保険期間、保険料のお支払方法、商品、プラン種別、保険料、保険料の種類。コード値は表示ラベルに変換すること。

#### Scenario: ご契約コースが表示される
- **WHEN** ContractCourseConfirmationSectionにdataプロパティが渡される
- **THEN** 見出し「② ご契約コース」が表示される
- **AND** 保険期間のラベルと値（例: 1→「１年」）が表示される
- **AND** 保険料のお支払方法のラベルと値が表示される
- **AND** 商品のラベルと値が表示される
- **AND** プラン種別のラベルと値が表示される
- **AND** 保険料のラベルと値が表示される
- **AND** 保険料の種類のラベルと値が表示される

#### Scenario: 保険期間がnullまたは空文字の場合
- **WHEN** ContractCourseConfirmationSectionにinsurancePeriodが空のdataプロパティが渡される
- **THEN** 保険期間の値は空欄で表示される

#### Scenario: プラン種別が未選択の場合
- **WHEN** ContractCourseConfirmationSectionにplanTypeが空文字のdataプロパティが渡される
- **THEN** プラン種別の値は空欄で表示される

### Requirement: 住居の概要確認セクションの表示
HousingOverviewConfirmationSection SHALL 見出し「③ 住居の概要」と以下の項目をラベルと値のペアで読み取り専用表示すること：構造、形態、形態備考。コード値は表示ラベルに変換すること。形態がアパート・マンションの場合は「〇階建中〇階」、戸建ての場合は「〇階建」と表示すること。

#### Scenario: アパート・マンション選択時の表示
- **WHEN** HousingOverviewConfirmationSectionにhousingType='2'のdataプロパティが渡される
- **THEN** 構造の値が表示される（例: 1→「木造」）
- **AND** 形態の値が表示される（例: 2→「アパート・マンション」）
- **AND** 「〇階建中〇階」形式で表示される

#### Scenario: 戸建て選択時の表示
- **WHEN** HousingOverviewConfirmationSectionにhousingType='1'のdataプロパティが渡される
- **THEN** 構造の値が表示される
- **AND** 形態の値が表示される（例: 1→「戸建て」）
- **AND** 「〇階建」形式で表示される

#### Scenario: totalFloorsがnullまたは空文字の場合
- **WHEN** HousingOverviewConfirmationSectionにtotalFloorsが空文字のdataプロパティが渡される
- **THEN** 形態備考の値は空欄で表示される

### Requirement: ご契約者様の情報確認セクションの表示
ContractorInfoConfirmationSection SHALL 見出し「④ ご契約者様の情報」と以下の項目をラベルと値のペアで読み取り専用表示すること：契約種別、契約者氏名、契約者氏名カナ、性別、生年月日、住所、建物名・部屋番号、住所フリガナ、電話番号。契約種別が「法人」の場合は法人名・法人名カナ・役職名を追加表示すること。

#### Scenario: 個人選択時の表示
- **WHEN** ContractorInfoConfirmationSectionにcontractType='1'のdataプロパティが渡される
- **THEN** 見出し「④ ご契約者様の情報」が表示される
- **AND** 契約種別の値が表示される（例: 1→「個人」）
- **AND** 契約者氏名の値が表示される
- **AND** 契約者氏名カナの値が表示される
- **AND** 性別の値が表示される
- **AND** 生年月日の値が表示される
- **AND** 住所の値が表示される
- **AND** 建物名・部屋番号の値が表示される
- **AND** 住所フリガナの値が表示される
- **AND** 電話番号の値がハイフン区切りで表示される
- **AND** 法人名・法人名カナ・役職名は表示されない

#### Scenario: 法人選択時の表示
- **WHEN** ContractorInfoConfirmationSectionにcontractType='2'のdataプロパティが渡される
- **THEN** 法人名の値が表示される
- **AND** 法人名カナの値が表示される
- **AND** 役職名の値が表示される
- **AND** 氏名のラベルが「役職者氏名」として表示される

#### Scenario: nameがnullまたは空文字の場合
- **WHEN** ContractorInfoConfirmationSectionにnameが空文字のdataプロパティが渡される
- **THEN** 契約者氏名の値は空欄で表示される

### Requirement: 住居の所在地確認セクションの表示
ResidenceLocationConfirmationSection SHALL 見出し「⑤ 住居の所在地」と以下の項目をラベルと値のペアで読み取り専用表示すること：郵便番号、住所、建物名・部屋番号、住所フリガナ。

#### Scenario: 住居の所在地が表示される
- **WHEN** ResidenceLocationConfirmationSectionにdataプロパティが渡される
- **THEN** 見出し「⑤ 住居の所在地」が表示される
- **AND** 郵便番号の値が表示される
- **AND** 住所の値が表示される
- **AND** 建物名・部屋番号の値が表示される
- **AND** 住所フリガナの値が表示される

#### Scenario: postalCodeがnullまたは空文字の場合
- **WHEN** ResidenceLocationConfirmationSectionにpostalCodeが空文字のdataプロパティが渡される
- **THEN** 郵便番号の値は空欄で表示される

### Requirement: 主たる居住者確認セクションの表示
PrimaryResidentConfirmationSection SHALL 見出し「⑥ 主たる居住者」と区分（契約者と同じ/契約者と異なる）を表示すること。「契約者と異なる」の場合は主居住者氏名・氏名カナ・性別・生年月日・契約者との続柄・電話番号を追加表示すること。

#### Scenario: 契約者と同じ選択時の表示
- **WHEN** PrimaryResidentConfirmationSectionにresidentType='0'のdataプロパティが渡される
- **THEN** 見出し「⑥ 主たる居住者」が表示される
- **AND** 区分の値が表示される（例: 0→「契約者と同じ」）
- **AND** 詳細フィールドは表示されない

#### Scenario: 契約者と異なる選択時の表示
- **WHEN** PrimaryResidentConfirmationSectionにresidentType='1'のdataプロパティが渡される
- **THEN** 区分の値が表示される（例: 1→「契約者と異なる」）
- **AND** 主居住者氏名の値が表示される
- **AND** 主居住者氏名カナの値が表示される
- **AND** 性別の値が表示される
- **AND** 生年月日の値が表示される
- **AND** 契約者との続柄の値が表示される
- **AND** 電話番号の値がハイフン区切りで表示される

#### Scenario: 続柄が「その他」の場合は備考も表示される
- **WHEN** PrimaryResidentConfirmationSectionにrelationship='8'のdataプロパティが渡される
- **THEN** 続柄の値が「その他」と表示される
- **AND** 続柄備考の値が表示される

#### Scenario: residentTypeがnullまたは空文字の場合
- **WHEN** PrimaryResidentConfirmationSectionにresidentTypeが空文字のdataプロパティが渡される
- **THEN** 区分の値は空欄で表示される

### Requirement: 同居人の明細確認セクションの表示
CoResidentConfirmationSection SHALL 見出し「⑦ 同居人の明細」と同居人の有無を表示すること。「あり」の場合は各同居人の氏名・氏名カナ・性別・生年月日・契約者との続柄を表示すること。

#### Scenario: 同居人なし選択時の表示
- **WHEN** CoResidentConfirmationSectionにhasCoResident=falseのdataプロパティが渡される
- **THEN** 見出し「⑦ 同居人の明細」が表示される
- **AND** 同居人の有無が「なし」と表示される
- **AND** 同居人詳細は表示されない

#### Scenario: 同居人あり選択時の表示
- **WHEN** CoResidentConfirmationSectionにhasCoResident=trueのdataプロパティが渡される
- **THEN** 同居人の有無が「あり」と表示される
- **AND** 各同居人の氏名・氏名カナ・性別・生年月日・続柄が表示される

#### Scenario: 同居人の続柄が「その他」の場合は備考も表示される
- **WHEN** 同居人のrelationshipが'8'である
- **THEN** 続柄の値が「その他」と表示される
- **AND** 続柄備考の値が表示される

#### Scenario: residentsが空配列の場合
- **WHEN** CoResidentConfirmationSectionにhasCoResident=trueでresidentsが空配列のdataプロパティが渡される
- **THEN** 同居人の有無が「あり」と表示される
- **AND** 同居人詳細は表示されない

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
