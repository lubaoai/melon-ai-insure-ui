## ADDED Requirements

### Requirement: 申込完了画面のルーティング

システム SHALL `/application-completion` パスに申込完了画面（`ApplicationCompletionPage`）をルーティングする。申込完了画面は `StepNavigation` コンポーネントに `currentStep={6}` を渡して表示する。

#### Scenario: 決済手続き画面から申込完了画面へ遷移する
- **WHEN** ユーザーが決済手続き画面で「次へ」ボタンをクリックする
- **THEN** `/application-completion` パスに遷移し、申込完了画面が表示される

#### Scenario: 直接URLアクセスでストアデータがない場合
- **WHEN** ユーザーが `/application-completion` に直接アクセスし、Zustand ストアに申込みデータが存在しない
- **THEN** `/` にリダイレクトする

#### Scenario: ステップナビゲーションの表示
- **WHEN** 申込完了画面が表示される
- **THEN** ステップナビゲーションの⑥申込完了がアクティブ状態で表示される

### Requirement: 申込完了画面のレイアウト

申込完了画面 SHALL 以下のレイアウト構成を持つ：
- ページ上部に `StepNavigation`（currentStep=6）
- メインコンテンツ領域に完了メッセージセクション、申込内容確認セクションを縦に配置
- Q&A サイドバーは表示しない
- 下部に「トップページへ戻る」リンクを配置

#### Scenario: 完了画面のレイアウト表示
- **WHEN** 申込完了画面が表示される
- **THEN** 完了メッセージセクションと申込内容確認セクションが縦に配置される

#### Scenario: Q&Aサイドバーが表示されないこと
- **WHEN** 申込完了画面が表示される
- **THEN** Q&Aサイドバーが表示されない

### Requirement: 完了メッセージセクション

`CompletionMessageSection` コンポーネント SHALL 申込み完了のメッセージと受付番号を表示する。受付番号は `YYYYMMDD-XXXXXX` 形式（日付-6桁乱数）で生成する。

#### Scenario: 完了メッセージが表示される
- **WHEN** 完了メッセージセクションが表示される
- **THEN** 申込み完了のメッセージが表示される

#### Scenario: 受付番号が表示される
- **WHEN** 完了メッセージセクションが表示される
- **THEN** 受付番号が `YYYYMMDD-XXXXXX` 形式で表示される

#### Scenario: 受付番号が空値でないこと
- **WHEN** 完了メッセージセクションが表示される
- **THEN** 受付番号が空文字でない

#### Scenario: 受付番号の形式が正しいこと
- **WHEN** 完了メッセージセクションが表示される
- **THEN** 受付番号が YYYYMMDD-XXXXXX のパターンに一致する

### Requirement: 申込内容確認セクション

`CompletionSummarySection` コンポーネント SHALL 契約コース情報と保険料合計を表示する。表示内容は Zustand ストアの `contractCourse` データに基づく。

#### Scenario: 契約コース情報が表示される
- **WHEN** 申込内容確認セクションが表示される
- **THEN** 保険期間・支払方法・商品・プラン種別が表示される

#### Scenario: 保険料合計が表示される
- **WHEN** 申込内容確認セクションが表示される
- **THEN** 保険料合計がカンマ区切りで「〇〇円」の形式で表示される

#### Scenario: 保険料が0円の場合
- **WHEN** 保険料が0円の場合
- **THEN** 「0円」と表示される

### Requirement: トップページへ戻るリンク

申込完了画面 SHALL 「トップページへ戻る」リンクを表示する。リンククリック時に `/` に遷移する。

#### Scenario: トップページへ戻るリンクが表示される
- **WHEN** 申込完了画面が表示される
- **THEN** 「トップページへ戻る」リンクが表示される

#### Scenario: トップページへ戻るリンクをクリックする
- **WHEN** ユーザーが「トップページへ戻る」リンクをクリックする
- **THEN** `/` に遷移し、トップページが表示される

### Requirement: スクロールトップボタン

申込完了画面 SHALL `ScrollTopButton` コンポーネントを表示する。

#### Scenario: スクロールトップボタンが表示される
- **WHEN** 申込完了画面が表示される
- **THEN** 画面右下にスクロールトップボタンが表示される

### Requirement: 申込み完了フラグのストア追加

`applicationFormStore` SHALL 申込み完了を示すフラグ `isCompleted: boolean`（デフォルト: `false`）と `setIsCompleted(value: boolean)` アクションを追加する。決済手続き画面の「次へ」ボタンクリック時に `isCompleted` を `true` に設定する。

#### Scenario: 決済手続き画面の次へボタンで完了フラグが立つ
- **WHEN** ユーザーが決済手続き画面の「次へ」ボタンをクリックする
- **THEN** `applicationFormStore` の `isCompleted` が `true` に設定される

#### Scenario: 完了フラグの初期値
- **WHEN** アプリケーションが初期化される
- **THEN** `isCompleted` は `false` である
