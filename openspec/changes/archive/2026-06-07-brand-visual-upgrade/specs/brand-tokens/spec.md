## ADDED Requirements

### Requirement: ブランドカラートークンの定義

システムはTailwind CSS 4の@themeディレクティブを使用して、ブランドカラーをデザイントークンとして定義しなければならない（MUST）。プライマリカラーはマゼンタ系（#b40081）、CTAカラーはオレンジ系（#FF8B2C）、警告カラーはアンバー系（#E99606）とする。各カラートークンには、ベース色・ライト色・ダーク色のバリエーションを含めなければならない（MUST）。

#### Scenario: ブランドカラーがTailwindユーティリティクラスとして使用可能
- **WHEN** 開発者が`bg-primary`や`text-cta`等のTailwindクラスを使用する時
- **THEN** 対応するブランドカラー値が適用されること

#### Scenario: カラーバリエーションが利用可能
- **WHEN** 開発者が`bg-primary-light`や`bg-primary-dark`等のクラスを使用する時
- **THEN** 対応するライト色（#ffe5f7）やダーク色が適用されること

#### Scenario: null値や未定義のカラートークンが使用された場合
- **WHEN** 定義されていないカラートークンクラス（例: `bg-undefined-color`）が使用される時
- **THEN** Tailwindのデフォルト動作に従い、スタイルが適用されないこと

### Requirement: タイポグラフィトークンの定義

システムはフォントファミリーとして"Hiragino Kaku Gothic ProN", "Meiryo", sans-serifのスタックを定義しなければならない（MUST）。ベースフォントサイズは15px、行間は1.2とする。見出し（h1: 18px）、本文（15px）、小テキスト（12px）のサイズスケールを定義しなければならない（MUST）。

#### Scenario: 日本語フォントスタックが適用される
- **WHEN** ページがレンダリングされる時
- **THEN** テキスト要素にHiragino Kaku Gothic ProN（Mac）/ Meiryo（Windows）が適用されること

#### Scenario: フォントサイズスケールが利用可能
- **WHEN** 開発者が`text-heading`や`text-body`等のクラスを使用する時
- **THEN** 対応するフォントサイズ（18px, 15px等）が適用されること

### Requirement: スペーシング・シャドウトークンの定義

システムはコンテンツ幅（max-width: 1024px）、メインコンテンツ幅（800px）、ボーダーラディウス（sm: 4px, md: 5px, lg: 8px）、シャドウ（soft: 2px 2px 1px #999999）のデザイントークンを定義しなければならない（MUST）。

#### Scenario: コンテンツ幅が制限される
- **WHEN** レイアウトコンポーネントでコンテンツ幅クラスを使用する時
- **THEN** 最大幅1024pxで中央揃えになること

#### Scenario: シャドウトークンが利用可能
- **WHEN** 開発者が`shadow-soft`クラスを使用する時
- **THEN** 2px 2px 1px #999999のシャドウが適用されること

### Requirement: 背景色トークンの定義

システムはコンテンツエリア背景色（#FDFCF6: クリーム）、入力フィールド背景色（#f5f5f5: ライトグレー）、フォームラベル背景色（#ffe5f7: ライトピンク）をデザイントークンとして定義しなければならない（MUST）。

#### Scenario: クリーム背景がコンテンツエリアに適用される
- **WHEN** 開発者が`bg-cream`クラスを使用する時
- **THEN** 背景色が#FDFCF6になること

#### Scenario: ライトピンク背景がフォームラベルに適用される
- **WHEN** 開発者が`bg-label`クラスを使用する時
- **THEN** 背景色が#ffe5f7になること
