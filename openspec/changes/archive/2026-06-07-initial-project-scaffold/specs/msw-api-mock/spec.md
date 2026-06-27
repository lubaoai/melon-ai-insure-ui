## ADDED Requirements

### Requirement: 保険商品データ型の定義
保険商品を表すTypeScript型（InsuranceProduct）を `src/modules/products/` に定義すること。型は以下のフィールドを含むこと:
- id: string（商品ID）
- name: string（商品名）
- category: string（カテゴリ）
- premium: number（保険料）
- coverage: string（補償内容）
- description: string（商品説明）

#### Scenario: 型定義の妥当性
- **WHEN** InsuranceProduct型を使用してオブジェクトを作成したとき
- **THEN** 全フィールドに型が付与され、TypeScriptの型チェックが通る

#### Scenario: 必須フィールドの欠落
- **WHEN** InsuranceProduct型のオブジェクトから必須フィールドを省略したとき
- **THEN** TypeScriptのコンパイルエラーが発生する

### Requirement: MSWブラウザワーカーの初期化
MSWのブラウザワーカーを初期化し、開発環境でのAPIリクエスト模倣を有効にすること。

#### Scenario: モックサービスワーカーの起動
- **WHEN** 開発環境でアプリケーションを起動したとき
- **THEN** MSWのService Workerが有効化され、APIリクエストがハンドラによってインターセプトされる

#### Scenario: 本番環境でのMSW無効化
- **WHEN** 本番ビルドでアプリケーションを起動したとき
- **THEN** MSWのService Workerは初期化されず、実際のAPIリクエストが送信される

### Requirement: 保険商品APIモックハンドラの定義
`src/mocks/handlers/` に保険商品一覧取得APIのモックハンドラを定義すること。`GET /api/products` リクエストに対して3件以上のダミー保険商品データを返すこと。

#### Scenario: 商品一覧APIのモック応答
- **WHEN** `GET /api/products` リクエストを送信したとき
- **THEN** ステータスコード200と、3件以上のInsuranceProductオブジェクトを含むJSON配列が返される

#### Scenario: モックデータの内容
- **WHEN** モックハンドラが返すデータの各要素を検査したとき
- **THEN** 全フィールドにnullや空文字でない値が設定されている

#### Scenario: モックデータIDの一意性
- **WHEN** モックハンドラが返すデータを検査したとき
- **THEN** 各商品のIDが一意である

### Requirement: 保険商品データ取得関数の定義
`src/modules/products/` にAPIから保険商品一覧を取得する関数を定義すること。

#### Scenario: 商品一覧の取得
- **WHEN** getInsuranceProducts関数を呼び出したとき
- **THEN** `GET /api/products` にfetchリクエストを送信し、InsuranceProduct配列を返す

#### Scenario: APIエラー時のハンドリング
- **WHEN** fetchリクエストがネットワークエラーまたはサーバーエラーを返したとき
- **THEN** エラーがスローされる
