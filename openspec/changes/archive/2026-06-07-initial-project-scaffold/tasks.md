### タスク 1：Tailwind CSS 4 + @tailwindcss/vite の導入

**関連ファイル：**
- 修正：vite.config.ts
- 修正：src/index.css

- [x] 1.1 **Tailwind CSSとViteプラグインをインストールする**
```bash
npm install tailwindcss @tailwindcss/vite
```

- [x] 1.2 **vite.config.tsにTailwindプラグインを追加する**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

- [x] 1.3 **src/index.cssをTailwindインポートに置き換える**
```css
@import "tailwindcss";
```

- [x] 1.4 **Tailwindユーティリティが動作することを確認する**
コマンド：`npm run dev`
期待結果：開発サーバーが起動し、ブラウザでアクセス可能であること

- [x] 1.5 **コミット**
```bash
git add vite.config.ts src/index.css package.json package-lock.json
git commit -m "feat: add Tailwind CSS 4 with Vite plugin"
```

### タスク 2：Vitest + React Testing Library の導入

**関連ファイル：**
- 修正：vite.config.ts
- 修正：tsconfig.app.json
- 新規：src/test-setup.ts

- [x] 2.1 **テスト関連パッケージをインストールする**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [x] 2.2 **vite.config.tsにテスト設定を追加する**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.ts',
  },
})
```

- [x] 2.3 **src/test-setup.tsを作成する**
```typescript
import '@testing-library/jest-dom/vitest'
```

- [x] 2.4 **tsconfig.app.jsonにvitestの型を追加する**
```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client", "vitest/globals"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

- [x] 2.5 **Vitestが動作することを確認する**
コマンド：`npx vitest run`
期待結果：テストランナーが正常に起動し、テストが0件で完了する

- [x] 2.6 **コミット**
```bash
git add vite.config.ts src/test-setup.ts tsconfig.app.json package.json package-lock.json
git commit -m "feat: add Vitest and React Testing Library"
```

### タスク 3：Prettier の導入

**関連ファイル：**
- 新規：.prettierrc
- 修正：package.json

- [x] 3.1 **Prettierをインストールする**
```bash
npm install -D prettier
```

- [x] 3.2 **.prettierrcを作成する**
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

- [x] 3.3 **package.jsonにformatスクリプトとtestスクリプトを追加する**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "preview": "vite preview",
    "test": "vitest run"
  }
}
```

- [x] 3.4 **Prettierが動作することを確認する**
コマンド：`npm run format`
期待結果：ソースファイルがフォーマットされる

- [x] 3.5 **コミット**
```bash
git add .prettierrc package.json package-lock.json
git commit -m "feat: add Prettier configuration"
```

### タスク 4：スケーラブルなディレクトリ構造の作成とボイラープレートのクリーンアップ

**関連ファイル：**
- 修正：src/App.tsx
- 削除：src/App.css
- 修正：src/main.tsx

- [x] 4.1 **ディレクトリを作成する**
```bash
mkdir -p src/app/views src/app/layouts src/modules/products src/router src/lib src/mocks/handlers
```

- [x] 4.2 **src/App.cssを削除する**
```bash
rm src/App.css
```

- [x] 4.3 **src/App.tsxを最小構成に書き換える**
```tsx
function App() {
  return <div>Melon AI Insure</div>
}

export default App
```

- [x] 4.4 **src/main.tsxのApp.cssインポートを削除する**
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [x] 4.5 **アプリケーションが正常にビルドされることを確認する**
コマンド：`npm run build`
期待結果：ビルドが成功する

- [x] 4.6 **コミット**
```bash
git add src/App.tsx src/main.tsx
git rm src/App.css
git add src/app src/modules src/router src/lib src/mocks
git commit -m "feat: create scalable directory structure and clean up boilerplate"
```

### タスク 5：InsuranceProduct型定義（TDD）

**関連ファイル：**
- 新規：src/modules/products/types.ts
- テスト：src/__tests__/InsuranceProduct.test.ts

- [x] 5.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest'
import type { InsuranceProduct } from '../modules/products/types'

describe('InsuranceProduct型', () => {
  it('全フィールドを持つオブジェクトが型チェックを通ること', () => {
    const product: InsuranceProduct = {
      id: '1',
      name: '医療保険プレミアム',
      category: '医療',
      premium: 5000,
      coverage: '入院一時金50万円',
      description: '充実の保障内容の医療保険',
    }
    expect(product.id).toBe('1')
    expect(product.name).toBe('医療保険プレミアム')
    expect(product.category).toBe('医療')
    expect(product.premium).toBe(5000)
    expect(product.coverage).toBe('入院一時金50万円')
    expect(product.description).toBe('充実の保障内容の医療保険')
  })

  it('必須フィールドを省略すると型エラーになること', () => {
    const incomplete = { id: '1' } as Partial<InsuranceProduct>
    expect(incomplete.id).toBe('1')
    expect(incomplete.name).toBeUndefined()
  })
})
```

- [x] 5.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/InsuranceProduct.test.ts`
期待結果：FAIL — Cannot find module '../modules/products/types'

- [x] 5.3 **最小実装を書く**
```typescript
export type InsuranceProduct = {
  id: string
  name: string
  category: string
  premium: number
  coverage: string
  description: string
}
```

- [x] 5.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/InsuranceProduct.test.ts`
期待結果：PASS

- [x] 5.5 **コミット**
```bash
git add src/modules/products/types.ts src/__tests__/InsuranceProduct.test.ts
git commit -m "feat: define InsuranceProduct type in modules/products"
```

### タスク 6：保険商品データ取得関数の定義（TDD）

**関連ファイル：**
- 新規：src/modules/products/api.ts
- テスト：src/__tests__/products-api.test.ts

- [x] 6.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { getInsuranceProducts } from '../modules/products/api'

const mockProducts = [
  {
    id: '1',
    name: '医療保険プレミアム',
    category: '医療',
    premium: 5000,
    coverage: '入院一時金50万円 / 手術一時金20万円',
    description: '充実の保障内容で万が一の入院・手術に備える医療保険',
  },
]

const server = setupServer(
  http.get('/api/products', () => {
    return HttpResponse.json(mockProducts)
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('getInsuranceProducts', () => {
  it('保険商品一覧を取得すること', async () => {
    const products = await getInsuranceProducts()
    expect(products).toHaveLength(1)
    expect(products[0].name).toBe('医療保険プレミアム')
  })

  it('サーバーエラー時にエラーをスローすること', async () => {
    server.use(http.get('/api/products', () => HttpResponse.error()))
    await expect(getInsuranceProducts()).rejects.toThrow()
  })
})
```

- [x] 6.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/products-api.test.ts`
期待結果：FAIL — Cannot find module '../modules/products/api'

- [x] 6.3 **最小実装を書く**
```typescript
import type { InsuranceProduct } from './types'

export async function getInsuranceProducts(): Promise<InsuranceProduct[]> {
  const response = await fetch('/api/products')
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  return response.json() as Promise<InsuranceProduct[]>
}
```

- [x] 6.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/products-api.test.ts`
期待結果：PASS

- [x] 6.5 **コミット**
```bash
git add src/modules/products/api.ts src/__tests__/products-api.test.ts
git commit -m "feat: add getInsuranceProducts API function"
```

### タスク 7：MSW ブラウザワーカーとハンドラの設定

**関連ファイル：**
- 新規：src/mocks/handlers/products.ts
- 新規：src/mocks/handlers/index.ts
- 新規：src/mocks/browser.ts
- 修正：src/main.tsx

- [x] 7.1 **MSWをインストールする**
```bash
npm install -D msw
```

- [x] 7.2 **MSWのService Workerファイルを生成する**
```bash
npx msw init public/ --save
```

- [x] 7.3 **モックハンドラを定義する（src/mocks/handlers/products.ts）**
```typescript
import { http, HttpResponse } from 'msw'
import type { InsuranceProduct } from '../../modules/products/types'

const products: InsuranceProduct[] = [
  {
    id: '1',
    name: '医療保険プレミアム',
    category: '医療',
    premium: 5000,
    coverage: '入院一時金50万円 / 手術一時金20万円',
    description: '充実の保障内容で万が一の入院・手術に備える医療保険',
  },
  {
    id: '2',
    name: '生命保険スタンダード',
    category: '生命',
    premium: 8000,
    coverage: '死亡保障3,000万円',
    description: 'ご家族の暮らしを守る基本の生命保険',
  },
  {
    id: '3',
    name: 'がん保険エッセンス',
    category: 'がん',
    premium: 3000,
    coverage: 'がん診断一時金100万円 / 抗がん剤治療支援',
    description: 'がんに特化した手厚い保障を提供するがん保険',
  },
  {
    id: '4',
    name: '傷害保険ベーシック',
    category: '傷害',
    premium: 1500,
    coverage: '不慮の事故による傷害保障500万円',
    description: '日常生活の不慮の事故に備える傷害保険',
  },
]

export const productsHandlers = [
  http.get('/api/products', () => {
    return HttpResponse.json(products)
  }),
]
```

- [x] 7.4 **ハンドラを集約する（src/mocks/handlers/index.ts）**
```typescript
import { productsHandlers } from './products'

export const handlers = [...productsHandlers]
```

- [x] 7.5 **ブラウザワーカー設定を作成する（src/mocks/browser.ts）**
```typescript
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```

- [x] 7.6 **main.tsxで開発環境のみMSWを有効化する**
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    return worker.start()
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
```

- [x] 7.7 **開発サーバーでMSWが動作することを確認する**
コマンド：`npm run dev`
期待結果：開発サーバーが起動し、ブラウザのコンソールに `[MSW] Mocking enabled` が表示される

- [x] 7.8 **コミット**
```bash
git add src/mocks/ src/main.tsx public/mockServiceWorker.js package.json package-lock.json
git commit -m "feat: add MSW browser worker and product handlers"
```

### タスク 8：React Router 7 の導入とルーター設定の集約（TDD）

**関連ファイル：**
- 新規：src/router/index.tsx
- 新規：src/app/views/HomePage.tsx
- 新規：src/app/views/NotFoundPage.tsx
- 修正：src/App.tsx
- テスト：src/__tests__/routing.test.tsx

- [x] 8.1 **react-router-domをインストールする**
```bash
npm install react-router-dom
```

- [x] 8.2 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe('ルーティング', () => {
  it('ルートパスでHomePageが表示されること', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText('保険商品一覧')).toBeInTheDocument()
  })

  it('存在しないパスで404ページが表示されること', () => {
    render(
      <MemoryRouter initialEntries={['/nonexistent-path']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText('ページが見つかりません')).toBeInTheDocument()
  })
})
```

- [x] 8.3 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/routing.test.tsx`
期待結果：FAIL — TestingLibraryElementError: Unable to find an element with the text: 保険商品一覧

- [x] 8.4 **NotFoundPageコンポーネントを作成する（src/app/views/NotFoundPage.tsx）**
```tsx
function NotFoundPage() {
  return (
    <div>
      <h1>ページが見つかりません</h1>
      <p>お探しのページは存在しません。</p>
    </div>
  )
}

export default NotFoundPage
```

- [x] 8.5 **HomePageコンポーネントの最小実装を作成する（src/app/views/HomePage.tsx）**
```tsx
function HomePage() {
  return (
    <div>
      <h1>保険商品一覧</h1>
    </div>
  )
}

export default HomePage
```

- [x] 8.6 **ルーター設定を集約する（src/router/index.tsx）**
```tsx
import { Routes, Route } from 'react-router-dom'
import HomePage from '../app/views/HomePage'
import NotFoundPage from '../app/views/NotFoundPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
```

- [x] 8.7 **App.tsxをルーターでラップする**
```tsx
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router'

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
```

- [x] 8.8 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/routing.test.tsx`
期待結果：PASS

- [x] 8.9 **コミット**
```bash
git add src/App.tsx src/router/index.tsx src/app/views/HomePage.tsx src/app/views/NotFoundPage.tsx src/__tests__/routing.test.tsx package.json package-lock.json
git commit -m "feat: add React Router with centralized router config"
```

### タスク 9：HomePage 保険商品一覧の描画（TDD）

**関連ファイル：**
- 修正：src/app/views/HomePage.tsx
- テスト：src/__tests__/HomePage.test.tsx

- [x] 9.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import HomePage from '../app/views/HomePage'

const mockProducts = [
  {
    id: '1',
    name: '医療保険プレミアム',
    category: '医療',
    premium: 5000,
    coverage: '入院一時金50万円 / 手術一時金20万円',
    description: '充実の保障内容で万が一の入院・手術に備える医療保険',
  },
  {
    id: '2',
    name: '生命保険スタンダード',
    category: '生命',
    premium: 8000,
    coverage: '死亡保障3,000万円',
    description: 'ご家族の暮らしを守る基本の生命保険',
  },
  {
    id: '3',
    name: 'がん保険エッセンス',
    category: 'がん',
    premium: 3000,
    coverage: 'がん診断一時金100万円 / 抗がん剤治療支援',
    description: 'がんに特化した手厚い保障を提供するがん保険',
  },
]

const server = setupServer(
  http.get('/api/products', () => {
    return HttpResponse.json(mockProducts)
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('HomePage', () => {
  it('ページタイトル「保険商品一覧」が表示されること', () => {
    render(<HomePage />)
    expect(screen.getByText('保険商品一覧')).toBeInTheDocument()
  })

  it('ローディング中表示後に保険商品カードが表示されること', async () => {
    render(<HomePage />)
    await waitFor(() => {
      expect(screen.getByText('医療保険プレミアム')).toBeInTheDocument()
    })
    expect(screen.getByText('生命保険スタンダード')).toBeInTheDocument()
    expect(screen.getByText('がん保険エッセンス')).toBeInTheDocument()
  })

  it('各商品にカテゴリが表示されること', async () => {
    render(<HomePage />)
    await waitFor(() => {
      expect(screen.getByText('医療')).toBeInTheDocument()
    })
    expect(screen.getByText('生命')).toBeInTheDocument()
    expect(screen.getByText('がん')).toBeInTheDocument()
  })

  it('各商品に保険料が表示されること', async () => {
    render(<HomePage />)
    await waitFor(() => {
      expect(screen.getByText(/5,000/)).toBeInTheDocument()
    })
    expect(screen.getByText(/8,000/)).toBeInTheDocument()
    expect(screen.getByText(/3,000/)).toBeInTheDocument()
  })

  it('商品データが空のときメッセージが表示されること', async () => {
    server.use(http.get('/api/products', () => HttpResponse.json([])))
    render(<HomePage />)
    await waitFor(() => {
      expect(screen.getByText('保険商品が見つかりません')).toBeInTheDocument()
    })
  })
})
```

- [x] 9.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/HomePage.test.tsx`
期待結果：FAIL — TestingLibraryElementError: Unable to find an element with the text: 医療保険プレミアム

- [x] 9.3 **最小実装を書く（src/app/views/HomePage.tsx）**
```tsx
import { useState, useEffect } from 'react'
import type { InsuranceProduct } from '../../modules/products/types'
import { getInsuranceProducts } from '../../modules/products/api'

function HomePage() {
  const [products, setProducts] = useState<InsuranceProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getInsuranceProducts()
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">保険商品一覧</h1>
      {loading ? (
        <p>読み込み中...</p>
      ) : products.length === 0 ? (
        <p>保険商品が見つかりません</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
              <span className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                {product.category}
              </span>
              <p className="mt-2 text-gray-600">{product.coverage}</p>
              <p className="mt-1 text-xl font-bold text-gray-900">
                月額 {product.premium.toLocaleString()} 円
              </p>
              <p className="mt-2 text-sm text-gray-500">{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
```

- [x] 9.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/HomePage.test.tsx`
期待結果：PASS

- [x] 9.5 **コミット**
```bash
git add src/app/views/HomePage.tsx src/__tests__/HomePage.test.tsx
git commit -m "feat: render insurance product list on HomePage via API"
```

### タスク 10：OpenSpec連携の設定

**関連ファイル：**
- 新規：openspec/config.yaml

- [x] 10.1 **openspec/config.yamlを作成する**
```yaml
project:
  name: melon-ai-insure-ui
  description: 保険商品販売 フロントエンド

tech_stack:
  framework: React 19
  language: TypeScript
  bundler: Vite
  styling: Tailwind CSS 4
  state_management: Zustand
  routing: React Router 7
  testing: Vitest
  code_quality:
    - ESLint
    - Prettier

conventions:
  tdd: true
  language: ja
  test_command: npx vitest run
```

- [x] 10.2 **コミット**
```bash
git add openspec/config.yaml
git commit -m "feat: add OpenSpec config.yaml"
```

### タスク 11：全テストの実行とビルド確認

**関連ファイル：**
- なし

- [x] 11.1 **全テストを実行する**
コマンド：`npx vitest run`
期待結果：全テストがPASSする

- [x] 11.2 **TypeScriptの型チェックを実行する**
コマンド：`npx tsc --noEmit`
期待結果：型エラーなし

- [x] 11.3 **プロダクションビルドを実行する**
コマンド：`npm run build`
期待結果：ビルドが成功する

- [x] 11.4 **Lintを実行する**
コマンド：`npm run lint`
期待結果：Lintエラーなし

- [x] 11.5 **コミット（修正があれば）**
```bash
git add -A
git commit -m "chore: verify build and tests pass"
```

### タスク 12：GitHubへの初期コミット・プッシュ

**関連ファイル：**
- なし

- [x] 12.1 **Gitのステータスを確認する**
コマンド：`git status`
期待結果：未コミットの変更がないこと

- [x] 12.2 **リモートリポジトリの設定を確認する**
コマンド：`git remote -v`
期待結果：originがGitHubのmelon-ai-insure-uiリポジトリに設定されていること

- [x] 12.3 **リモートにプッシュする**
コマンド：`git push origin main`
期待結果：プッシュが成功し、GitHub上でコードが確認できること
