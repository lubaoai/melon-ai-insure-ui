## なぜ

申込内容入力画面を開いた際に全てのフィールドが空であり、ユーザーが手動で全項目を入力する必要がある。開発・テスト・デモ用途において、代表的な初期値があらかじめ設定されていることで画面遷移の確認や動作検証が迅速に行える。また、決済手続き画面・申込完了画面の保険料合計が0円のままとなっており、実際の保険料（880円）が反映されていない。

## 変更内容

- 申込内容入力画面の各セクションに以下の初期値を設定する：
  - 契約希望日：システム日付の1週間後（yyyy/mm/dd形式）
  - ご契約コースのプラン種別：1Y8C
  - 保険料：880円
  - 住居の概要（形態・備考）：10階建中6
  - 契約者氏名：保険太郎
  - 契約者氏名（カナ）：ホケンタロウ
  - 生年月日：1975年11月2日
  - 住所：〒104-0041 東京都中央区新富2-5-10
  - 建物名：アパホテル
  - 住所フリガナ：トウキョウト チュウオウク シントミ 2-5-10
  - 電話番号：0570-044-811
  - 住居の所在地：契約者と同じ（契約者の住所を自動コピー）
- 決済手続き画面のお支払金額セクションに880円を表示する
- 申込完了画面の保険料合計に880円を表示する
- Zustandストアの初期値を上記デフォルト値に変更する

## 機能一覧

### 新規機能

（なし）

### 修正機能

- `application-form-sections`: 各セクションの初期値をデモ用データに変更し、保険料を880円に設定
- `payment-form-sections`: お支払金額の初期値を880円に設定
- `application-completion-page`: 保険料合計の初期値を880円に設定

## 影響範囲

- `src/store/applicationFormStore.ts` — ストアの初期値変更
- `src/components/application/ContractDateSection.tsx` — 初期値の受け取り
- `src/components/application/ContractCourseSection.tsx` — 保険料表示と初期値
- `src/components/application/HousingOverviewSection.tsx` — 初期値
- `src/components/application/ContractorInfoSection.tsx` — 初期値
- `src/components/application/ResidenceLocationSection.tsx` — 初期値と自動コピー
- `src/app/views/PaymentPage.tsx` — amount propsの変更
- `src/app/views/ApplicationCompletionPage.tsx` — amount propsの変更
- 関連テストファイル
