## 背景

現在のアプリケーションはReact 19 + TypeScript + Tailwind CSS 4で構築されているが、Tailwindのデフォルトテーマを使用しており、ブランドアイデンティティが表現されていない。リファレンスとしてメロン少額短期保険の契約画面（page01）のデザインシステムを分析済みであり、マゼンタ（#b40081）をプライマリとするカラーパレット、Hiragino/Meiryoフォントスタック、Font Awesomeベースのアイコン体系、ステップナビゲーションパターンが確認されている。

現状の制約：
- Tailwind CSS 4はCSSベースの設定（@themeディレクティブ）を使用するため、JS設定ファイルは不要
- React 19の機能（use等）を活用可能
- テストはVitest + React Testing Libraryを使用
- MSWでAPIモック済み

## 目標 / 非目標

**目標：**
- メロン少額短期保険のデザインシステムをベースにしたブランドカラーシステムの確立
- 統一されたアイコン体系の導入
- ステップナビゲーション付きのホームページ実装
- ホバーエフェクト・トランジション等のインタラクションデザインの追加
- 全コンポーネントへのブランドスタイル適用

**非目標：**
- 契約フロー全画面の実装（page01のHomePage再現のみ）
- フォーム入力画面の実装（ステップ1の同意画面のみ）
- バックエンドAPIの変更
- 認証・認可機能の追加
- 多言語対応（日本語のみ）

## 主要な決定

### 1. アイコンライブラリ: Lucide React を選択

**決定**: Lucide React をアイコンライブラリとして採用する。

**理由**:
- React用の公式バインディングがあり、Tree-shaking対応でバンドルサイズが小さい
- MITライセンスで商用利用可能
- アイコンデザインがモダンで統一感がある
- TypeScript型定義が含まれている

**代替案**:
- React Icons（Font Awesome含む）: バンドルサイズが大きく、Font Awesome 4互換のアイコンは古いデザイン
- Heroicons: アイコン数が少なく、保険UIに必要なバリエーションが不足
- Font Awesome直接: CSS経由の疑似要素使用はReactと相性が悪い

### 2. Tailwind CSS 4の@themeディレクティブでデザイントークンを管理

**決定**: `src/index.css`の`@theme`ブロックでブランドデザイントークンを定義する。

**理由**:
- Tailwind CSS 4の標準的なアプローチ
- 追加の設定ファイルが不要
- CSS変数として自動生成され、JSからも参照可能
- ダークモード等の将来の拡張にも対応しやすい

**代替案**:
- tailwind.config.ts: Tailwind 4では非推奨のアプローチ
- CSS変数の手動定義: Tailwindユーティリティクラスとの統合ができない
- Style Dictionary: 小規模プロジェクトには過剰

### 3. コンポーネント構成: Atomic Designの軽量版を採用

**決定**: 以下のディレクトリ構造でコンポーネントを配置する。

```
src/
  components/
    layout/
      Header.tsx
      Footer.tsx
      StepNavigation.tsx
    ui/
      Button.tsx
      Card.tsx
      Badge.tsx
      Icon.tsx
    home/
      HeroSection.tsx
      ProductGrid.tsx
      ProductCard.tsx
      QASidebar.tsx
```

**理由**:
- `layout/`はページをまたぐ共通レイアウトコンポーネント
- `ui/`は再利用可能なプリミティブコンポーネント
- `home/`はHomePage固有のセクションコンポーネント
- Atomic Designの atoms/molecules/organisms より実用的で理解しやすい

**代替案**:
- Atomic Design（atoms/molecules/organisms/templates/pages）: 小規模プロジェクトでは過剰な分類
- Feature-based（modules/products/components/）: UIコンポーネントが複数featureにまたがる場合に管理が煩雑

### 4. ステップナビゲーション: 静的表示のみ

**決定**: ステップナビゲーションは現在のステップをハイライト表示するが、クリックでの遷移は行わない。

**理由**:
- 現状はHomePageのみの実装であり、遷移先が存在しない
- リファレンス画面も線形進行でステップジャンプ不可の設計
- 将来的なルーティング拡張時にクリック遷移を追加可能

### 5. アニメーション: CSS Transitions + Tailwindユーティリティ

**決定**: アニメーションはCSS transitionsとTailwindの組み込みユーティリティのみを使用し、追加ライブラリは導入しない。

**理由**:
- ホバーエフェクトや出現アニメーションはCSS transitionsで十分
- Framer Motion等は小規模なUIアニメーションには過剰
- バンドルサイズの増加を避ける

**代替案**:
- Framer Motion: 高機能だが、今回の要件には過剰
- CSS @keyframes手動定義: Tailwindユーティリティで代替可能

## リスクとトレードオフ

- [リスク] リファレンスURLのデザインが将来的に変更される可能性 → キャプチャしたデザイントークン値を仕様として固定し、URLの追従は行わない
- [リスク] 固定幅（1024px）レイアウトはモバイルで表示崩れする可能性 → レスポンシブブレイクポイントを設定し、モバイルでは単一カラムに切り替え
- [リスク] Lucide ReactのアイコンがFont Awesome 4のアイコンと完全に一致しない → 意味的に近いアイコンを選択し、独自マッピングを定義する
- [トレードオフ] 固定幅レイアウトはデスクトップでの統一感があるが、モバイルでは余白が増える → コンテンツ幅をmax-width制約とし、モバイルでは100%にする
- [トレードオフ] CSS transitionsのみのアニメーションは表現力が限られる → 複雑なアニメーションが必要になった段階でFramer Motionの導入を検討

## 移行方案

1. `npm install lucide-react` でアイコンライブラリを追加
2. `src/index.css` に@themeディレクティブでデザイントークンを追加（既存の`@import 'tailwindcss'`は維持）
3. 新規コンポーネントを`src/components/`に追加
4. `HomePage.tsx`を新デザインに置き換え
5. `App.tsx`にHeader/Footerのレイアウトラッパーを追加
6. 既存テストの更新と新規テストの追加

ロールバック: git revertで全変更を一括取り消し可能。外部APIやデータモデルの変更はないため、移行リスクは低い。
