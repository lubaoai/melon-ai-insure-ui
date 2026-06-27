## MODIFIED Requirements

### Requirement: 契約希望日の初期値

ContractDateSection コンポーネント SHALL ストアの `contractDate` 値で入力フィールドを初期化する。ストアの `contractDate` 初期値 SHALL システム日付の1週間後の日付を `yyyy/mm/dd` 形式で設定する。

#### Scenario: 契約希望日にシステム日付の1週間後が初期表示される
- **WHEN** 申込内容入力画面が表示される
- **THEN** 契約希望日フィールドにシステム日付の1週間後の日付が `yyyy/mm/dd` 形式で表示される

#### Scenario: 契約希望日を手動で変更できる
- **WHEN** ユーザーが契約希望日フィールドの値を手動で変更する
- **THEN** 変更後の値がストアに反映される

### Requirement: ご契約コースの初期値

ContractCourseSection コンポーネント SHALL ストアの `contractCourse` 値で各フィールドを初期化する。ストアの `contractCourse` 初期値 SHALL `planType: '1Y8C'` を含む。保険料の表示 SHALL `insurancePremium` ストア値（880円）を反映する。

#### Scenario: プラン種別に1Y8Cが初期選択される
- **WHEN** 申込内容入力画面が表示される
- **THEN** プラン種別セレクトボックスで１Ｙ８が選択されている

#### Scenario: 保険料に880円が表示される
- **WHEN** 申込内容入力画面が表示される
- **THEN** 保険料フィールドに880円が表示される

### Requirement: 住居の概要の初期値

HousingOverviewSection コンポーネント SHALL ストアの `housingOverview` 値で各フィールドを初期化する。ストアの `housingOverview` 初期値 SHALL `totalFloors: '10'`、`residentFloor: '6'` を含む。

#### Scenario: 形態備考に10階建中6が初期表示される
- **WHEN** 申込内容入力画面が表示される
- **THEN** 階数フィールドに10、居住階フィールドに6が表示される

### Requirement: 契約者情報の初期値

ContractorInfoSection コンポーネント SHALL ストアの `contractorInfo` 値で各フィールドを初期化する。ストアの `contractorInfo` 初期値 SHALL 以下のデモデータを含む：
- `name`: '保険太郎'
- `nameKana`: 'ホケンタロウ'
- `birthYear`: '1975'
- `birthMonth`: '11'
- `birthDay`: '2'
- `postalCode`: '1040041'
- `address`: '東京都中央区新富2-5-10'
- `buildingName`: 'アパホテル'
- `addressKana`: 'トウキョウト チュウオウク シントミ 2-5-10'
- `phone1`: '0570'
- `phone2`: '044'
- `phone3`: '811'

#### Scenario: 契約者氏名に保険太郎が初期表示される
- **WHEN** 申込内容入力画面が表示される
- **THEN** 契約者氏名フィールドに「保険太郎」が表示される

#### Scenario: 契約者氏名カナにホケンタロウが初期表示される
- **WHEN** 申込内容入力画面が表示される
- **THEN** 契約者氏名（カナ）フィールドに「ホケンタロウ」が表示される

#### Scenario: 生年月日に1975年11月2日が初期表示される
- **WHEN** 申込内容入力画面が表示される
- **THEN** 生年月日に「1975」年「11」月「2」日が表示される

#### Scenario: 住所に東京都中央区新富2-5-10が初期表示される
- **WHEN** 申込内容入力画面が表示される
- **THEN** 郵便番号に「1040041」、住所に「東京都中央区新富2-5-10」が表示される

#### Scenario: 建物名にアパホテルが初期表示される
- **WHEN** 申込内容入力画面が表示される
- **THEN** 建物名フィールドに「アパホテル」が表示される

#### Scenario: 住所フリガナにトウキョウト チュウオウク シントミが初期表示される
- **WHEN** 申込内容入力画面が表示される
- **THEN** 住所フリガナフィールドに「トウキョウト チュウオウク シントミ 2-5-10」が表示される

#### Scenario: 電話番号に0570-044-811が初期表示される
- **WHEN** 申込内容入力画面が表示される
- **THEN** 電話番号に「0570」「044」「811」が表示される

### Requirement: 住居の所在地の初期値

ResidenceLocationSection コンポーネント SHALL ストアの `residenceLocation` 値で各フィールドを初期化する。ストアの `residenceLocation` 初期値 SHALL 契約者の住所と同じ値（郵便番号、住所、建物名、住所フリガナ）を含む。

#### Scenario: 住居の所在地に契約者と同じ住所が初期表示される
- **WHEN** 申込内容入力画面が表示される
- **THEN** 住居の所在地に契約者と同じ郵便番号・住所・建物名・住所フリガナが表示される

### Requirement: ストア初期値とコンポーネント同期

各セクションコンポーネント SHALL `value` または `defaultValue` props を受け取り、ストアの初期値でローカルstateを初期化する。コンポーネントのローカルstateとストアの値が初回レンダー時から一致すること。

#### Scenario: セクションコンポーネントがストアの初期値で初期化される
- **WHEN** 申込内容入力画面が初回レンダーされる
- **THEN** 各セクションコンポーネントのローカルstateがストアの初期値と一致する

#### Scenario: ストアに空値が設定された場合の初期表示
- **WHEN** ストアの初期値が空値（デフォルト以外）に変更されている
- **THEN** 各セクションコンポーネントは空値で初期化される
