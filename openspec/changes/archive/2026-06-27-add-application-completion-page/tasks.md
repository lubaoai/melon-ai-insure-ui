### タスク 1：isCompleted フラグのストア追加

**関連ファイル：**
- 修正：src/store/applicationFormStore.ts
- テスト：src/__tests__/applicationFormStore.completion.test.ts

- [x] 1.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { useApplicationFormStore } from '../store/applicationFormStore';

describe('applicationFormStore 申込み完了フラグ', () => {
  beforeEach(() => {
    useApplicationFormStore.setState({ isCompleted: false });
  });

  it('isCompleted の初期値が false であること', () => {
    expect(useApplicationFormStore.getState().isCompleted).toBe(false);
  });

  it('setIsCompleted で isCompleted を true に更新できること', () => {
    useApplicationFormStore.getState().setIsCompleted(true);
    expect(useApplicationFormStore.getState().isCompleted).toBe(true);
  });

  it('setIsCompleted で isCompleted を false に戻せること', () => {
    useApplicationFormStore.getState().setIsCompleted(true);
    useApplicationFormStore.getState().setIsCompleted(false);
    expect(useApplicationFormStore.getState().isCompleted).toBe(false);
  });
});
```

- [x] 1.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/applicationFormStore.completion.test.ts`
期待結果：FAIL — isCompleted, setIsCompleted が存在しない

- [x] 1.3 **最小実装を書く**
`src/store/applicationFormStore.ts` に追加：

`ApplicationFormState` インターフェースに追加：
```typescript
isCompleted: boolean;
setIsCompleted: (value: boolean) => void;
```

ストア実装に追加（`creditCardInfo` の後）：
```typescript
isCompleted: false,
setIsCompleted: (value) => set({ isCompleted: value }),
```

- [x] 1.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/applicationFormStore.completion.test.ts`
期待結果：PASS

- [x] 1.5 **コミット**
```bash
git add src/store/applicationFormStore.ts src/__tests__/applicationFormStore.completion.test.ts
git commit -m "feat: add isCompleted flag to applicationFormStore"
```

---

### タスク 2：受付番号生成ユーティリティ

**関連ファイル：**
- 新規：src/utils/receptionNumber.ts
- テスト：src/__tests__/receptionNumber.test.ts

- [x] 2.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { generateReceptionNumber } from '../utils/receptionNumber';

describe('generateReceptionNumber', () => {
  it('YYYYMMDD-XXXXXX 形式の文字列を返すこと', () => {
    const result = generateReceptionNumber();
    expect(result).toMatch(/^\d{8}-\d{6}$/);
  });

  it('日付部分が現在日であること', () => {
    const result = generateReceptionNumber();
    const today = new Date();
    const yyyymmdd = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    expect(result.startsWith(yyyymmdd)).toBe(true);
  });

  it('呼び出しごとに異なる番号を生成すること', () => {
    const results = new Set(Array.from({ length: 100 }, () => generateReceptionNumber()));
    expect(results.size).toBeGreaterThan(90);
  });

  it('空文字でないこと', () => {
    const result = generateReceptionNumber();
    expect(result.length).toBeGreaterThan(0);
  });
});
```

- [x] 2.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/receptionNumber.test.ts`
期待結果：FAIL — Cannot find module '../utils/receptionNumber'

- [x] 2.3 **最小実装を書く**
`src/utils/receptionNumber.ts`：
```typescript
export function generateReceptionNumber(): string {
  const now = new Date();
  const yyyymmdd = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const random = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
  return `${yyyymmdd}-${random}`;
}
```

- [x] 2.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/receptionNumber.test.ts`
期待結果：PASS

- [x] 2.5 **コミット**
```bash
git add src/utils/receptionNumber.ts src/__tests__/receptionNumber.test.ts
git commit -m "feat: add generateReceptionNumber utility"
```

---

### タスク 3：CompletionMessageSection コンポーネント

**関連ファイル：**
- 新規：src/components/completion/CompletionMessageSection.tsx
- テスト：src/__tests__/CompletionMessageSection.test.tsx

- [x] 3.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CompletionMessageSection } from '../components/completion/CompletionMessageSection';

describe('CompletionMessageSection コンポーネント', () => {
  it('見出し「申込完了」が表示されること', () => {
    render(<CompletionMessageSection receptionNumber="20260627-123456" />);
    expect(screen.getByRole('heading', { name: /申込完了/ })).toBeInTheDocument();
  });

  it('完了メッセージが表示されること', () => {
    render(<CompletionMessageSection receptionNumber="20260627-123456" />);
    expect(screen.getByText(/お申込みが完了いたしました/)).toBeInTheDocument();
  });

  it('受付番号が表示されること', () => {
    render(<CompletionMessageSection receptionNumber="20260627-123456" />);
    expect(screen.getByText('20260627-123456')).toBeInTheDocument();
  });

  it('受付番号のラベルが表示されること', () => {
    render(<CompletionMessageSection receptionNumber="20260627-123456" />);
    expect(screen.getByText('受付番号')).toBeInTheDocument();
  });
});
```

- [x] 3.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/CompletionMessageSection.test.tsx`
期待結果：FAIL — Cannot find module '../components/completion/CompletionMessageSection'

- [x] 3.3 **最小実装を書く**
`src/components/completion/CompletionMessageSection.tsx`：
```typescript
interface CompletionMessageSectionProps {
  receptionNumber: string;
}

export function CompletionMessageSection({ receptionNumber }: CompletionMessageSectionProps) {
  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          申込完了
        </h1>
        <div className="bg-cream p-4 text-center">
          <p className="text-lg text-text-primary font-bold mb-4">
            お申込みが完了いたしました。
          </p>
          <p className="text-sm text-text-primary mb-2">
            以下の受付番号をお控えください。
          </p>
          <div className="inline-block border-2 border-primary bg-white px-6 py-3 rounded">
            <span className="text-sm font-bold text-text-primary">受付番号</span>
            <span className="ml-3 text-xl font-bold text-primary">{receptionNumber}</span>
          </div>
          <p className="text-sm text-text-primary mt-4">
            確認メールをお送りいたしますので、しばらくお待ちください。
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [x] 3.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/CompletionMessageSection.test.tsx`
期待結果：PASS

- [x] 3.5 **コミット**
```bash
git add src/components/completion/CompletionMessageSection.tsx src/__tests__/CompletionMessageSection.test.tsx
git commit -m "feat: add CompletionMessageSection component"
```

---

### タスク 4：CompletionSummarySection コンポーネント

**関連ファイル：**
- 新規：src/components/completion/CompletionSummarySection.tsx
- テスト：src/__tests__/CompletionSummarySection.test.tsx

- [x] 4.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CompletionSummarySection } from '../components/completion/CompletionSummarySection';
import type { ContractCourseData } from '../components/application/ContractCourseSection';

const defaultData: ContractCourseData = {
  insurancePeriod: '1',
  paymentMethod: '5',
  product: 'K008',
  planType: '1Y8C',
};

describe('CompletionSummarySection コンポーネント', () => {
  it('見出し「申込内容」が表示されること', () => {
    render(<CompletionSummarySection data={defaultData} amount={15000} />);
    expect(screen.getByRole('heading', { name: /申込内容/ })).toBeInTheDocument();
  });

  it('保険期間が表示されること', () => {
    render(<CompletionSummarySection data={defaultData} amount={15000} />);
    expect(screen.getByText('１年')).toBeInTheDocument();
  });

  it('お支払方法が表示されること', () => {
    render(<CompletionSummarySection data={defaultData} amount={15000} />);
    expect(screen.getByText('クレジットカード払')).toBeInTheDocument();
  });

  it('商品名が表示されること', () => {
    render(<CompletionSummarySection data={defaultData} amount={15000} />);
    expect(screen.getByText('メロンの新家財保険')).toBeInTheDocument();
  });

  it('プラン種別が表示されること', () => {
    render(<CompletionSummarySection data={defaultData} amount={15000} />);
    expect(screen.getByText('１Ｙ８')).toBeInTheDocument();
  });

  it('保険料合計がカンマ区切りで表示されること', () => {
    render(<CompletionSummarySection data={defaultData} amount={15000} />);
    expect(screen.getByText('15,000円')).toBeInTheDocument();
  });

  it('保険料が0円の場合', () => {
    render(<CompletionSummarySection data={defaultData} amount={0} />);
    expect(screen.getByText('0円')).toBeInTheDocument();
  });
});
```

- [x] 4.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/CompletionSummarySection.test.tsx`
期待結果：FAIL — Cannot find module '../components/completion/CompletionSummarySection'

- [x] 4.3 **最小実装を書く**
`src/components/completion/CompletionSummarySection.tsx`：
```typescript
import type { ContractCourseData } from '../application/ContractCourseSection';

interface CompletionSummarySectionProps {
  data: ContractCourseData;
  amount: number;
}

const periodLabels: Record<string, string> = { '1': '１年', '2': '２年' };
const paymentLabels: Record<string, string> = { '5': 'クレジットカード払' };
const productLabels: Record<string, string> = { 'K008': 'メロンの新家財保険' };
const planLabels: Record<string, string> = {
  '1Y8C': '１Ｙ８', '1Y9C': '１Ｙ９', '1Y10C': '１Ｙ１０',
  '1Y11C': '１Ｙ１１', '1Y12C': '１Ｙ１２', '1Y15C': '１Ｙ１５',
};

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[260px_1fr] w-full mt-2 first:mt-0">
      <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
        {label}
      </div>
      <div className="border border-l-0 border-border bg-input-bg px-3 py-2 text-base text-text-primary">
        {value}
      </div>
    </div>
  );
}

export function CompletionSummarySection({ data, amount }: CompletionSummarySectionProps) {
  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          申込内容
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <SummaryRow label="保険期間" value={periodLabels[data.insurancePeriod] ?? ''} />
            <SummaryRow label="お支払方法" value={paymentLabels[data.paymentMethod] ?? ''} />
            <SummaryRow label="商品" value={productLabels[data.product] ?? ''} />
            <SummaryRow label="プラン種別" value={planLabels[data.planType] ?? ''} />
            <SummaryRow label="保険料合計" value={`${amount.toLocaleString()}円`} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [x] 4.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/CompletionSummarySection.test.tsx`
期待結果：PASS

- [x] 4.5 **コミット**
```bash
git add src/components/completion/CompletionSummarySection.tsx src/__tests__/CompletionSummarySection.test.tsx
git commit -m "feat: add CompletionSummarySection component"
```

---

### タスク 5：ApplicationCompletionPage ページコンポーネントとルーティング

**関連ファイル：**
- 新規：src/app/views/ApplicationCompletionPage.tsx
- 修正：src/router/index.tsx
- テスト：src/__tests__/ApplicationCompletionPage.test.tsx

- [x] 5.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ApplicationCompletionPage from '../app/views/ApplicationCompletionPage';

vi.mock('../store/applicationFormStore', () => ({
  useApplicationFormStore: () => ({
    hasData: () => true,
    contractCourse: { insurancePeriod: '1', paymentMethod: '5', product: 'K008', planType: '1Y8C' },
  }),
}));

vi.mock('../utils/receptionNumber', () => ({
  generateReceptionNumber: () => '20260627-123456',
}));

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <ApplicationCompletionPage />
    </MemoryRouter>,
  );
}

describe('ApplicationCompletionPage コンポーネント', () => {
  it('ステップナビゲーションで⑥申込完了がアクティブであること', () => {
    renderWithRouter();
    expect(screen.getByText('⑥申込完了')).toBeInTheDocument();
  });

  it('完了メッセージセクションが表示されること', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { name: /申込完了/ })).toBeInTheDocument();
  });

  it('申込内容セクションが表示されること', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { name: /申込内容/ })).toBeInTheDocument();
  });

  it('トップページへ戻るリンクが表示されること', () => {
    renderWithRouter();
    expect(screen.getByText('トップページへ戻る')).toBeInTheDocument();
  });

  it('Q&Aサイドバーが表示されないこと', () => {
    renderWithRouter();
    expect(screen.queryByText('よくある質問')).not.toBeInTheDocument();
  });
});
```

- [x] 5.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ApplicationCompletionPage.test.tsx`
期待結果：FAIL — Cannot find module '../app/views/ApplicationCompletionPage'

- [x] 5.3 **最小実装を書く**
`src/app/views/ApplicationCompletionPage.tsx`：
```typescript
import { useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { StepNavigation } from '../../components/layout/StepNavigation';
import { ScrollTopButton } from '../../components/ui/ScrollTopButton';
import { CompletionMessageSection } from '../../components/completion/CompletionMessageSection';
import { CompletionSummarySection } from '../../components/completion/CompletionSummarySection';
import { useApplicationFormStore } from '../../store/applicationFormStore';
import { generateReceptionNumber } from '../../utils/receptionNumber';

function ApplicationCompletionPage() {
  const navigate = useNavigate();
  const store = useApplicationFormStore();

  const receptionNumber = useMemo(() => generateReceptionNumber(), []);

  useEffect(() => {
    if (!store.hasData()) {
      navigate('/', { replace: true });
    }
  }, [store, navigate]);

  return (
    <div className="bg-white font-sans">
      <StepNavigation currentStep={6} />

      <main className="px-4 py-4">
        <div className="max-w-[800px] mx-auto">
          <CompletionMessageSection receptionNumber={receptionNumber} />
          <CompletionSummarySection data={store.contractCourse} amount={0} />
          <div className="m-2 text-center mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2 text-lg font-bold bg-cta text-text-white shadow-soft transition-colors duration-150 hover:bg-cta-hover hover:text-text-primary"
            >
              トップページへ戻る
            </Link>
          </div>
        </div>
      </main>

      <ScrollTopButton />
    </div>
  );
}

export default ApplicationCompletionPage;
```

`src/router/index.tsx` にルートを追加：
```typescript
import ApplicationCompletionPage from '../app/views/ApplicationCompletionPage';
// Routes内に追加：
<Route path="/application-completion" element={<ApplicationCompletionPage />} />
```

- [x] 5.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ApplicationCompletionPage.test.tsx`
期待結果：PASS

- [x] 5.5 **コミット**
```bash
git add src/app/views/ApplicationCompletionPage.tsx src/router/index.tsx src/__tests__/ApplicationCompletionPage.test.tsx
git commit -m "feat: add ApplicationCompletionPage with routing"
```

---

### タスク 6：PaymentPage の次へボタン遷移先変更

**関連ファイル：**
- 修正：src/app/views/PaymentPage.tsx
- テスト：src/__tests__/PaymentPage.test.tsx

- [x] 6.1 **失敗するテストを書く**
`src/__tests__/PaymentPage.test.tsx` に追加：
```typescript
it('次へボタンクリックで /application-completion に遷移し isCompleted が true になること', () => {
  const mockNavigate = vi.fn();
  const mockSetIsCompleted = vi.fn();

  vi.mocked(useApplicationFormStore).mockReturnValue({
    hasData: () => true,
    paymentMethod: 'credit',
    creditCardInfo: { cardNumber: '4242424242424242', expiryMonth: '12', expiryYear: '30', cardHolder: 'TARO YAMADA', securityCode: '123' },
    contractCourse: { insurancePeriod: '1', paymentMethod: '5', product: 'K008', planType: '' },
    setPaymentMethod: vi.fn(),
    setCreditCardInfo: vi.fn(),
    setIsCompleted: mockSetIsCompleted,
  } as any);

  render(
    <MemoryRouter>
      <PaymentPage />
    </MemoryRouter>,
  );

  const nextButton = screen.getByText('次へ').closest('button')!;
  fireEvent.click(nextButton);
  expect(mockSetIsCompleted).toHaveBeenCalledWith(true);
  expect(mockNavigate).toHaveBeenCalledWith('/application-completion');
});
```

- [x] 6.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/PaymentPage.test.tsx`
期待結果：FAIL — mockNavigate が '/application-completion' で呼ばれていない

- [x] 6.3 **最小実装を書く**
`src/app/views/PaymentPage.tsx` の `handleNext` を変更：
```typescript
const handleNext = useCallback(() => {
  store.setIsCompleted(true);
  navigate('/application-completion');
}, [store, navigate]);
```

- [x] 6.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/PaymentPage.test.tsx`
期待結果：PASS

- [x] 6.5 **コミット**
```bash
git add src/app/views/PaymentPage.tsx src/__tests__/PaymentPage.test.tsx
git commit -m "feat: navigate to /application-completion from PaymentPage next button"
```

---

### タスク 7：全テストの統合確認

**関連ファイル：**
- なし（既存ファイルの確認のみ）

- [x] 7.1 **全テストを実行して成功を確認**
コマンド：`npx vitest run`
期待結果：PASS — 全テストが成功

- [x] 7.2 **コミット**
```bash
git add -A
git commit -m "test: verify all tests pass with application completion page integration"
```
