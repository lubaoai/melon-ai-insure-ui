### タスク 1：ルーティング追加と意向確認画面の遷移更新

**関連ファイル：**
- 修正：src/router/index.tsx
- 新規：src/app/views/ApplicationInputPage.tsx
- テスト：src/__tests__/routing.test.tsx

- [x] 1.1 **失敗するテストを書く** — ルーティングテストに `/application-input` のケースを追加
```typescript
// src/__tests__/routing.test.tsx に追加
it('/application-inputでApplicationInputPageが表示されること', () => {
  render(
    <MemoryRouter initialEntries={['/application-input']}>
      <AppRoutes />
    </MemoryRouter>,
  );
  expect(screen.getByText('③申込内容入力')).toBeInTheDocument();
});
```

- [x] 1.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/routing.test.tsx`
期待結果：FAIL — ルートが定義されていないため画面が表示されない

- [x] 1.3 **最小実装を書く** — ApplicationInputPageのスタブとルート定義
```typescript
// src/app/views/ApplicationInputPage.tsx
import { StepNavigation } from '../../components/layout/StepNavigation';
import { QASidebar } from '../../components/home/QASidebar';
import { ScrollTopButton } from '../../components/ui/ScrollTopButton';

const qaItems = [
  { question: '保険の開始はいつからですか？', answer: 'お申し込み画面にてお客さまがご入力された契約希望日から補償が開始されます。' },
  { question: 'インターネットで申込みをしても保険証券・約款は届きますか？', answer: '保険証券はお送りしておりません。ご契約時に登録頂いたメールアドレスに「マイページ」開設の案内をお送りします。' },
  { question: '保険金額をどのように決めたら良いですか？', answer: '全ての家財の再調達価額（全て買い揃えた場合に必要な概算額）を基準に決定します。' },
];

function ApplicationInputPage() {
  return (
    <div className="bg-white font-sans">
      <StepNavigation currentStep={3} />
      <main className="px-4 py-4">
        <div className="flex flex-col gap-4 min-[875px]:flex-row">
          <div className="w-full min-[875px]:w-[800px]">
            <p>申込入力画面</p>
          </div>
          <div className="w-full min-[875px]:w-[197px]">
            <QASidebar items={qaItems} />
          </div>
        </div>
      </main>
      <ScrollTopButton />
    </div>
  );
}

export default ApplicationInputPage;
```

```typescript
// src/router/index.tsx — ルート追加
import ApplicationInputPage from '../app/views/ApplicationInputPage';
// Routes内に追加：
<Route path="/application-input" element={<ApplicationInputPage />} />
```

- [x] 1.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/routing.test.tsx`
期待結果：PASS

- [x] 1.5 **IntentConfirmationPageの「次へ」ボタン遷移先を更新**
```typescript
// src/app/views/IntentConfirmationPage.tsx の onNext を更新
onNext={() => navigate('/application-input')}
```

- [x] 1.6 **コミット**
```bash
git add src/router/index.tsx src/app/views/ApplicationInputPage.tsx src/app/views/IntentConfirmationPage.tsx src/__tests__/routing.test.tsx
git commit -m "feat: add application-input route and update intent-confirmation navigation"
```

---

### タスク 2：ContractDateSection コンポーネント（①契約希望日）

**関連ファイル：**
- 新規：src/components/application/ContractDateSection.tsx
- テスト：src/__tests__/ContractDateSection.test.tsx

- [x] 2.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContractDateSection } from '../components/application/ContractDateSection';

describe('ContractDateSection コンポーネント', () => {
  it('見出し「① 契約希望日」が表示されること', () => {
    render(<ContractDateSection onChange={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /① 契約希望日/ })).toBeInTheDocument();
  });

  it('契約希望日の入力フィールドが表示されること', () => {
    render(<ContractDateSection onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText('yyyy/mm/dd')).toBeInTheDocument();
  });

  it('必須バッジが表示されること', () => {
    render(<ContractDateSection onChange={vi.fn()} />);
    expect(screen.getByText('必須')).toBeInTheDocument();
  });

  it('注記テキストが表示されること', () => {
    render(<ContractDateSection onChange={vi.fn()} />);
    expect(screen.getByText(/家財保険をお申込みの場合/)).toBeInTheDocument();
  });

  it('日付入力でonChangeが呼ばれること', async () => {
    const handleChange = vi.fn();
    render(<ContractDateSection onChange={handleChange} />);
    await userEvent.type(screen.getByPlaceholderText('yyyy/mm/dd'), '2026/07/01');
    expect(handleChange).toHaveBeenCalled();
  });
});
```

- [x] 2.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ContractDateSection.test.tsx`
期待結果：FAIL — ContractDateSectionが存在しない

- [x] 2.3 **最小実装を書く**
```typescript
// src/components/application/ContractDateSection.tsx
import { useState, useCallback } from 'react';

interface ContractDateSectionProps {
  onChange: (date: string) => void;
}

export function ContractDateSection({ onChange }: ContractDateSectionProps) {
  const [date, setDate] = useState('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDate(e.target.value);
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ① 契約希望日
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <div className="inline-flex w-full max-w-[600px]">
              <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
                契約希望日
                <span className="ml-2 bg-error text-text-white text-small px-1.5 py-0.5 rounded-sm">必須</span>
              </div>
              <div className="border border-l-0 border-border bg-input-bg px-3 py-2 flex-1">
                <input
                  type="text"
                  placeholder="yyyy/mm/dd"
                  maxLength={10}
                  value={date}
                  onChange={handleChange}
                  className="h-[30px] w-full max-w-[190px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-2 text-sm text-text-light">
              <label>家財保険をお申込みの場合、契約希望日は次の日付をご入力下さい。<br />
                ・不動産会社を経由する<br />
                　（お部屋の賃貸借契約と一緒にお申込みいただく）：お申込日の翌日以降<br />
                ・上記以外：お申込日から８日後以降</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [x] 2.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ContractDateSection.test.tsx`
期待結果：PASS

- [x] 2.5 **コミット**
```bash
git add src/components/application/ContractDateSection.tsx src/__tests__/ContractDateSection.test.tsx
git commit -m "feat: add ContractDateSection component"
```

---

### タスク 3：ContractCourseSection コンポーネント（②ご契約コース）

**関連ファイル：**
- 新規：src/components/application/ContractCourseSection.tsx
- テスト：src/__tests__/ContractCourseSection.test.tsx

- [x] 3.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContractCourseSection } from '../components/application/ContractCourseSection';

describe('ContractCourseSection コンポーネント', () => {
  it('見出し「② ご契約コース」が表示されること', () => {
    render(<ContractCourseSection onChange={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /② ご契約コース/ })).toBeInTheDocument();
  });

  it('保険期間のラジオボタンが表示されること', () => {
    render(<ContractCourseSection onChange={vi.fn()} />);
    expect(screen.getByLabelText('１年')).toBeInTheDocument();
    expect(screen.getByLabelText('２年')).toBeInTheDocument();
  });

  it('保険料のお支払方法が表示されること', () => {
    render(<ContractCourseSection onChange={vi.fn()} />);
    expect(screen.getByLabelText('クレジットカード払')).toBeInTheDocument();
  });

  it('商品のラジオボタンが表示されること', () => {
    render(<ContractCourseSection onChange={vi.fn()} />);
    expect(screen.getByLabelText(/メロンの新家財保険/)).toBeInTheDocument();
  });

  it('プラン種別のドロップダウンが表示されること', () => {
    render(<ContractCourseSection onChange={vi.fn()} />);
    expect(screen.getByLabelText('プラン種別')).toBeInTheDocument();
  });

  it('保険料が読み取り専用で表示されること', () => {
    render(<ContractCourseSection onChange={vi.fn()} />);
    const hokenryoDisplay = screen.getByText(/円/);
    expect(hokenryoDisplay).toBeInTheDocument();
  });

  it('必須バッジが表示されること', () => {
    render(<ContractCourseSection onChange={vi.fn()} />);
    const badges = screen.getAllByText('必須');
    expect(badges.length).toBeGreaterThanOrEqual(4);
  });
});
```

- [x] 3.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ContractCourseSection.test.tsx`
期待結果：FAIL — ContractCourseSectionが存在しない

- [x] 3.3 **最小実装を書く**
```typescript
// src/components/application/ContractCourseSection.tsx
import { useState, useCallback } from 'react';

interface ContractCourseData {
  insurancePeriod: string;
  paymentMethod: string;
  product: string;
  planType: string;
}

interface ContractCourseSectionProps {
  onChange: (data: ContractCourseData) => void;
}

const plans = [
  { value: '1Y8C', label: '１Ｙ８' },
  { value: '1Y9C', label: '１Ｙ９' },
  { value: '1Y10C', label: '１Ｙ１０' },
  { value: '1Y11C', label: '１Ｙ１１' },
  { value: '1Y12C', label: '１Ｙ１２' },
  { value: '1Y15C', label: '１Ｙ１５' },
];

export function ContractCourseSection({ onChange }: ContractCourseSectionProps) {
  const [form, setForm] = useState<ContractCourseData>({
    insurancePeriod: '1',
    paymentMethod: '5',
    product: 'K008',
    planType: '',
  });

  const updateField = useCallback(
    (field: keyof ContractCourseData, value: string) => {
      setForm((prev) => {
        const next = { ...prev, [field]: value };
        onChange(next);
        return next;
      });
    },
    [onChange],
  );

  const RequiredBadge = () => (
    <span className="ml-2 bg-error text-text-white text-small px-1.5 py-0.5 rounded-sm">必須</span>
  );

  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ② ご契約コース
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            {/* 保険期間 */}
            <div className="inline-flex w-full max-w-[600px]">
              <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
                保険期間<RequiredBadge />
              </div>
              <div className="border border-l-0 border-border bg-input-bg px-3 py-2 flex-1 flex gap-4 items-center">
                <label className="inline-flex items-center gap-1">
                  <input type="radio" name="insurancePeriod" value="1" checked={form.insurancePeriod === '1'} onChange={() => updateField('insurancePeriod', '1')} />
                  １年
                </label>
                <label className="inline-flex items-center gap-1">
                  <input type="radio" name="insurancePeriod" value="2" checked={form.insurancePeriod === '2'} onChange={() => updateField('insurancePeriod', '2')} />
                  ２年
                </label>
              </div>
            </div>

            {/* 保険料のお支払方法 */}
            <div className="inline-flex w-full max-w-[600px] mt-2">
              <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
                保険料のお支払方法<RequiredBadge />
              </div>
              <div className="border border-l-0 border-border bg-input-bg px-3 py-2 flex-1 flex items-center">
                <label className="inline-flex items-center gap-1">
                  <input type="radio" name="paymentMethod" value="5" checked={form.paymentMethod === '5'} onChange={() => updateField('paymentMethod', '5')} />
                  クレジットカード払
                </label>
              </div>
            </div>

            {/* 商品 */}
            <div className="inline-flex w-full max-w-[600px] mt-2">
              <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
                商品<RequiredBadge />
              </div>
              <div className="border border-l-0 border-border bg-input-bg px-3 py-2 flex-1 flex items-center">
                <label className="inline-flex items-center gap-1">
                  <input type="radio" name="product" value="K008" checked={form.product === 'K008'} onChange={() => updateField('product', 'K008')} />
                  ＜メロンの新家財保険＞
                </label>
              </div>
            </div>

            {/* プラン種別 */}
            <div className="inline-flex w-full max-w-[600px] mt-2">
              <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
                プラン種別<RequiredBadge />
              </div>
              <div className="border border-l-0 border-border bg-input-bg px-3 py-2 flex-1">
                <select
                  aria-label="プラン種別"
                  value={form.planType}
                  onChange={(e) => updateField('planType', e.target.value)}
                  className="h-[30px] w-full max-w-[200px] rounded-lg border border-border bg-white px-2 text-base text-text-primary focus:border-sub1 focus:outline-none"
                >
                  <option value="">選択してください</option>
                  {plans.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 保険料 */}
            <div className="inline-flex w-full max-w-[600px] mt-2">
              <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
                保険料
              </div>
              <div className="border border-l-0 border-border bg-input-bg px-3 py-2 flex-1 text-base text-text-primary">
                <b>0円</b>
              </div>
            </div>

            {/* 保険料の種類 */}
            <div className="inline-flex w-full max-w-[600px] mt-2">
              <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
                保険料の種類
              </div>
              <div className="border border-l-0 border-border bg-input-bg px-3 py-2 flex-1 text-base text-text-primary">
                &nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { ContractCourseData };
```

- [x] 3.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ContractCourseSection.test.tsx`
期待結果：PASS

- [x] 3.5 **コミット**
```bash
git add src/components/application/ContractCourseSection.tsx src/__tests__/ContractCourseSection.test.tsx
git commit -m "feat: add ContractCourseSection component"
```

---

### タスク 4：HousingOverviewSection コンポーネント（③住居の概要）

**関連ファイル：**
- 新規：src/components/application/HousingOverviewSection.tsx
- テスト：src/__tests__/HousingOverviewSection.test.tsx

- [x] 4.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HousingOverviewSection } from '../components/application/HousingOverviewSection';

describe('HousingOverviewSection コンポーネント', () => {
  it('見出し「③ 住居の概要」が表示されること', () => {
    render(<HousingOverviewSection onChange={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /③ 住居の概要/ })).toBeInTheDocument();
  });

  it('構造のラジオボタンが表示されること', () => {
    render(<HousingOverviewSection onChange={vi.fn()} />);
    expect(screen.getByLabelText('木造')).toBeInTheDocument();
    expect(screen.getByLabelText('非木造')).toBeInTheDocument();
  });

  it('形態のラジオボタンが表示されること', () => {
    render(<HousingOverviewSection onChange={vi.fn()} />);
    expect(screen.getByLabelText('アパート・マンション')).toBeInTheDocument();
    expect(screen.getByLabelText('戸建て')).toBeInTheDocument();
  });

  it('アパート選択時は「階建中〇階」の2つの入力が表示されること', () => {
    render(<HousingOverviewSection onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText('数字')).toBeInTheDocument();
  });

  it('戸建て選択時に表示が変わること', async () => {
    render(<HousingOverviewSection onChange={vi.fn()} />);
    await userEvent.click(screen.getByLabelText('戸建て'));
    expect(screen.getByText(/階建$/)).toBeInTheDocument();
  });
});
```

- [x] 4.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/HousingOverviewSection.test.tsx`
期待結果：FAIL — HousingOverviewSectionが存在しない

- [x] 4.3 **最小実装を書く**
```typescript
// src/components/application/HousingOverviewSection.tsx
import { useState, useCallback } from 'react';

interface HousingOverviewData {
  structure: string;
  housingType: string;
  totalFloors: string;
  residentFloor: string;
}

interface HousingOverviewSectionProps {
  onChange: (data: HousingOverviewData) => void;
}

export function HousingOverviewSection({ onChange }: HousingOverviewSectionProps) {
  const [form, setForm] = useState<HousingOverviewData>({
    structure: '1',
    housingType: '2',
    totalFloors: '',
    residentFloor: '',
  });

  const updateField = useCallback(
    (field: keyof HousingOverviewData, value: string) => {
      setForm((prev) => {
        const next = { ...prev, [field]: value };
        onChange(next);
        return next;
      });
    },
    [onChange],
  );

  const isApartment = form.housingType === '2';

  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ③ 住居の概要
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            {/* 構造 */}
            <div className="inline-flex w-full max-w-[600px]">
              <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
                構造
                <span className="ml-2 bg-error text-text-white text-small px-1.5 py-0.5 rounded-sm">必須</span>
              </div>
              <div className="border border-l-0 border-border bg-input-bg px-3 py-2 flex-1 flex gap-4 items-center">
                <label className="inline-flex items-center gap-1">
                  <input type="radio" name="structure" value="1" checked={form.structure === '1'} onChange={() => updateField('structure', '1')} />
                  木造
                </label>
                <label className="inline-flex items-center gap-1">
                  <input type="radio" name="structure" value="2" checked={form.structure === '2'} onChange={() => updateField('structure', '2')} />
                  非木造
                </label>
              </div>
            </div>

            {/* 形態 */}
            <div className="inline-flex w-full max-w-[600px] mt-2">
              <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
                形態
                <span className="ml-2 bg-error text-text-white text-small px-1.5 py-0.5 rounded-sm">必須</span>
              </div>
              <div className="border border-l-0 border-border bg-input-bg px-3 py-2 flex-1 flex gap-4 items-center">
                <label className="inline-flex items-center gap-1">
                  <input type="radio" name="housingType" value="2" checked={form.housingType === '2'} onChange={() => updateField('housingType', '2')} />
                  アパート・マンション
                </label>
                <label className="inline-flex items-center gap-1">
                  <input type="radio" name="housingType" value="1" checked={form.housingType === '1'} onChange={() => updateField('housingType', '1')} />
                  戸建て
                </label>
              </div>
            </div>

            {/* 形態（備考） */}
            <div className="inline-flex w-full max-w-[600px] mt-2">
              <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
                形態 （備考）
                <span className="ml-2 bg-error text-text-white text-small px-1.5 py-0.5 rounded-sm">必須</span>
              </div>
              <div className="border border-l-0 border-border bg-input-bg px-3 py-2 flex-1 flex items-center">
                <input
                  type="text"
                  placeholder="数字"
                  maxLength={2}
                  value={form.totalFloors}
                  onChange={(e) => updateField('totalFloors', e.target.value)}
                  className="h-[30px] w-[70px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none"
                />
                {isApartment ? (
                  <span className="text-sm ml-1">階建中&nbsp;
                    <input
                      type="text"
                      placeholder="数字"
                      maxLength={2}
                      value={form.residentFloor}
                      onChange={(e) => updateField('residentFloor', e.target.value)}
                      className="h-[30px] w-[70px] rounded-lg border border-border bg-white px-2.5 text-base text-text-primary focus:border-sub1 focus:outline-none"
                    />
                    &nbsp;階
                  </span>
                ) : (
                  <span className="text-sm ml-1">階建</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { HousingOverviewData };
```

- [x] 4.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/HousingOverviewSection.test.tsx`
期待結果：PASS

- [x] 4.5 **コミット**
```bash
git add src/components/application/HousingOverviewSection.tsx src/__tests__/HousingOverviewSection.test.tsx
git commit -m "feat: add HousingOverviewSection component"
```

---

### タスク 5：ContractorInfoSection コンポーネント（④ご契約者様の情報）

**関連ファイル：**
- 新規：src/components/application/ContractorInfoSection.tsx
- テスト：src/__tests__/ContractorInfoSection.test.tsx

- [x] 5.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContractorInfoSection } from '../components/application/ContractorInfoSection';

describe('ContractorInfoSection コンポーネント', () => {
  it('見出し「④ ご契約者様の情報」が表示されること', () => {
    render(<ContractorInfoSection onChange={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /④ ご契約者様の情報/ })).toBeInTheDocument();
  });

  it('契約種別のラジオボタンが表示されること', () => {
    render(<ContractorInfoSection onChange={vi.fn()} />);
    expect(screen.getByLabelText('個人')).toBeInTheDocument();
    expect(screen.getByLabelText('法人')).toBeInTheDocument();
  });

  it('個人選択時は法人フィールドが非表示であること', () => {
    render(<ContractorInfoSection onChange={vi.fn()} />);
    expect(screen.queryByPlaceholderText('法人名')).not.toBeInTheDocument();
  });

  it('法人選択時に法人フィールドが表示されること', async () => {
    render(<ContractorInfoSection onChange={vi.fn()} />);
    await userEvent.click(screen.getByLabelText('法人'));
    expect(screen.getByPlaceholderText('法人名')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('全角カナ')).toBeInTheDocument();
  });

  it('契約者氏名の入力フィールドが表示されること', () => {
    render(<ContractorInfoSection onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText('全角')).toBeInTheDocument();
  });

  it('電話番号が3分割で表示されること', () => {
    render(<ContractorInfoSection onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText('数字')).toBeInTheDocument();
  });

  it('郵便番号の入力フィールドが表示されること', () => {
    render(<ContractorInfoSection onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText('郵便番号')).toBeInTheDocument();
  });
});
```

- [x] 5.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ContractorInfoSection.test.tsx`
期待結果：FAIL — ContractorInfoSectionが存在しない

- [x] 5.3 **最小実装を書く** — ContractorInfoSection（個人/法人切替、氏名・住所・電話番号含む）
※ 実装はHTML構造に基づき、契約種別・法人名・法人名カナ・役職名・氏名・氏名カナ・性別・生年月日・住所（郵便番号+番地）・建物名・住所フリガナ・電話番号（3分割）の全フィールドを含む。法人選択時に法人フィールドを表示する条件付きロジックを実装する。

- [x] 5.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ContractorInfoSection.test.tsx`
期待結果：PASS

- [x] 5.5 **コミット**
```bash
git add src/components/application/ContractorInfoSection.tsx src/__tests__/ContractorInfoSection.test.tsx
git commit -m "feat: add ContractorInfoSection component with personal/corporate toggle"
```

---

### タスク 6：ResidenceLocationSection コンポーネント（⑤住居の所在地）

**関連ファイル：**
- 新規：src/components/application/ResidenceLocationSection.tsx
- テスト：src/__tests__/ResidenceLocationSection.test.tsx

- [x] 6.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResidenceLocationSection } from '../components/application/ResidenceLocationSection';

describe('ResidenceLocationSection コンポーネント', () => {
  it('見出し「⑤ 住居の所在地」が表示されること', () => {
    render(<ResidenceLocationSection onChange={vi.fn()} contractorAddress={null} />);
    expect(screen.getByRole('heading', { name: /⑤ 住居の所在地/ })).toBeInTheDocument();
  });

  it('「契約者と同じ」ボタンが表示されること', () => {
    render(<ResidenceLocationSection onChange={vi.fn()} contractorAddress={null} />);
    expect(screen.getByText('契約者と同じ')).toBeInTheDocument();
  });

  it('郵便番号の入力フィールドが表示されること', () => {
    render(<ResidenceLocationSection onChange={vi.fn()} contractorAddress={null} />);
    expect(screen.getByPlaceholderText('郵便番号')).toBeInTheDocument();
  });

  it('建物名・部屋番号の入力フィールドが表示されること', () => {
    render(<ResidenceLocationSection onChange={vi.fn()} contractorAddress={null} />);
    expect(screen.getByPlaceholderText(/建物名/)).toBeInTheDocument();
  });

  it('住所フリガナの入力フィールドが表示されること', () => {
    render(<ResidenceLocationSection onChange={vi.fn()} contractorAddress={null} />);
    expect(screen.getByPlaceholderText(/フリガナ/)).toBeInTheDocument();
  });
});
```

- [x] 6.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ResidenceLocationSection.test.tsx`
期待結果：FAIL — ResidenceLocationSectionが存在しない

- [x] 6.3 **最小実装を書く** — ResidenceLocationSection（「契約者と同じ」コピーボタン付き、郵便番号・住所・建物名・住所フリガナ）
※ contractorAddress propsを受け取り、「契約者と同じ」ボタンクリック時にその値でフィールドを埋める実装とする。

- [x] 6.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ResidenceLocationSection.test.tsx`
期待結果：PASS

- [x] 6.5 **コミット**
```bash
git add src/components/application/ResidenceLocationSection.tsx src/__tests__/ResidenceLocationSection.test.tsx
git commit -m "feat: add ResidenceLocationSection component with copy-from-contractor button"
```

---

### タスク 7：PrimaryResidentSection コンポーネント（⑥主たる居住者）

**関連ファイル：**
- 新規：src/components/application/PrimaryResidentSection.tsx
- テスト：src/__tests__/PrimaryResidentSection.test.tsx

- [x] 7.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PrimaryResidentSection } from '../components/application/PrimaryResidentSection';

describe('PrimaryResidentSection コンポーネント', () => {
  it('見出し「⑥ 主たる居住者」が表示されること', () => {
    render(<PrimaryResidentSection onChange={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /⑥ 主たる居住者/ })).toBeInTheDocument();
  });

  it('区分のラジオボタンが表示されること', () => {
    render(<PrimaryResidentSection onChange={vi.fn()} />);
    expect(screen.getByLabelText('契約者と同じ')).toBeInTheDocument();
    expect(screen.getByLabelText('契約者と異なる')).toBeInTheDocument();
  });

  it('初期状態では居住者詳細フィールドが非表示であること', () => {
    render(<PrimaryResidentSection onChange={vi.fn()} />);
    expect(screen.queryByPlaceholderText('主居住者氏名')).not.toBeInTheDocument();
  });

  it('契約者と異なる選択時に詳細フィールドが表示されること', async () => {
    render(<PrimaryResidentSection onChange={vi.fn()} />);
    await userEvent.click(screen.getByLabelText('契約者と異なる'));
    expect(screen.getByPlaceholderText('主居住者氏名')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/カナ/)).toBeInTheDocument();
  });

  it('続柄のドロップダウンが表示されること', async () => {
    render(<PrimaryResidentSection onChange={vi.fn()} />);
    await userEvent.click(screen.getByLabelText('契約者と異なる'));
    expect(screen.getByLabelText('契約者との続柄')).toBeInTheDocument();
  });
});
```

- [x] 7.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/PrimaryResidentSection.test.tsx`
期待結果：FAIL — PrimaryResidentSectionが存在しない

- [x] 7.3 **最小実装を書く** — PrimaryResidentSection（区分ラジオ・条件付き居住者詳細・続柄ドロップダウン・続柄「その他」時の備考）
※ 「契約者と同じ」選択時は詳細フィールド非表示、「契約者と異なる」選択時に氏名・カナ・性別・生年月日・続柄・電話番号を表示。続柄「その他」選択時に備考入力を表示。

- [x] 7.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/PrimaryResidentSection.test.tsx`
期待結果：PASS

- [x] 7.5 **コミット**
```bash
git add src/components/application/PrimaryResidentSection.tsx src/__tests__/PrimaryResidentSection.test.tsx
git commit -m "feat: add PrimaryResidentSection component with conditional fields"
```

---

### タスク 8：CoResidentSection コンポーネント（⑦同居人の明細）

**関連ファイル：**
- 新規：src/components/application/CoResidentSection.tsx
- テスト：src/__tests__/CoResidentSection.test.tsx

- [x] 8.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CoResidentSection } from '../components/application/CoResidentSection';

describe('CoResidentSection コンポーネント', () => {
  it('見出し「⑦ 同居人の明細」が表示されること', () => {
    render(<CoResidentSection onChange={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /⑦ 同居人の明細/ })).toBeInTheDocument();
  });

  it('同居人の有無ラジオボタンが表示されること', () => {
    render(<CoResidentSection onChange={vi.fn()} />);
    expect(screen.getByLabelText('なし')).toBeInTheDocument();
    expect(screen.getByLabelText('あり')).toBeInTheDocument();
  });

  it('初期状態では同居人フィールドが非表示であること', () => {
    render(<CoResidentSection onChange={vi.fn()} />);
    expect(screen.queryByPlaceholderText('同居人1 氏名')).not.toBeInTheDocument();
  });

  it('あり選択時に同居人1のフィールドが表示されること', async () => {
    render(<CoResidentSection onChange={vi.fn()} />);
    await userEvent.click(screen.getByLabelText('あり'));
    expect(screen.getByPlaceholderText('同居人1 氏名')).toBeInTheDocument();
  });

  it('同居人追加ボタンが表示されること', async () => {
    render(<CoResidentSection onChange={vi.fn()} />);
    await userEvent.click(screen.getByLabelText('あり'));
    expect(screen.getByText('同居人を追加')).toBeInTheDocument();
  });
});
```

- [x] 8.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/CoResidentSection.test.tsx`
期待結果：FAIL — CoResidentSectionが存在しない

- [x] 8.3 **最小実装を書く** — CoResidentSection（同居人有無ラジオ・あり時の同居人1〜5の動的リスト・続柄ドロップダウン・続柄「その他」時の備考）
※ 「なし」選択時はフィールド非表示、「あり」選択時に同居人1を表示。「同居人を追加」ボタンで最大5名まで追加。各同居人に氏名・カナ・性別・生年月日・続柄を含む。続柄「その他」選択時に備考入力を表示。

- [x] 8.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/CoResidentSection.test.tsx`
期待結果：PASS

- [x] 8.5 **コミット**
```bash
git add src/components/application/CoResidentSection.tsx src/__tests__/CoResidentSection.test.tsx
git commit -m "feat: add CoResidentSection component with dynamic co-resident list"
```

---

### タスク 9：NavigationButtons コンポーネントと ApplicationInputPage 統合

**関連ファイル：**
- 新規：src/components/application/NavigationButtons.tsx
- 修正：src/app/views/ApplicationInputPage.tsx
- テスト：src/__tests__/NavigationButtons.test.tsx
- テスト：src/__tests__/ApplicationInputPage.test.tsx

- [x] 9.1 **失敗するテストを書く** — NavigationButtons
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavigationButtons } from '../components/application/NavigationButtons';

describe('NavigationButtons コンポーネント', () => {
  it('戻るボタンが表示されること', () => {
    render(<NavigationButtons canProceed={false} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /戻る/ })).toBeInTheDocument();
  });

  it('次へボタンが表示されること', () => {
    render(<NavigationButtons canProceed={false} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /次へ/ })).toBeInTheDocument();
  });

  it('canProceed=falseでは次へボタンが非活性であること', () => {
    render(<NavigationButtons canProceed={false} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /次へ/ })).toBeDisabled();
  });

  it('canProceed=trueでは次へボタンが活性であること', () => {
    render(<NavigationButtons canProceed={true} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /次へ/ })).not.toBeDisabled();
  });
});
```

- [x] 9.2 **最小実装を書く** — NavigationButtons（IntentionSectionと同じスタイルパターン）

- [x] 9.3 **失敗するテストを書く** — ApplicationInputPage 統合テスト
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ApplicationInputPage from '../app/views/ApplicationInputPage';

describe('ApplicationInputPage', () => {
  it('ステップナビゲーションのステップ3が表示されること', () => {
    render(<BrowserRouter><ApplicationInputPage /></BrowserRouter>);
    expect(screen.getByText('③申込内容入力')).toBeInTheDocument();
  });

  it('全7セクションの見出しが表示されること', () => {
    render(<BrowserRouter><ApplicationInputPage /></BrowserRouter>);
    expect(screen.getByRole('heading', { name: /① 契約希望日/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /② ご契約コース/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /③ 住居の概要/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /④ ご契約者様の情報/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /⑤ 住居の所在地/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /⑥ 主たる居住者/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /⑦ 同居人の明細/ })).toBeInTheDocument();
  });

  it('Q&Aサイドバーが表示されること', () => {
    render(<BrowserRouter><ApplicationInputPage /></BrowserRouter>);
    expect(screen.getByText('よくある質問')).toBeInTheDocument();
  });

  it('初期状態では次へボタンが非活性であること', () => {
    render(<BrowserRouter><ApplicationInputPage /></BrowserRouter>);
    expect(screen.getByRole('button', { name: /次へ/ })).toBeDisabled();
  });
});
```

- [x] 9.4 **最小実装を書く** — ApplicationInputPage 完全版
※ 7セクション全てを配置し、各セクションのonChangeから必須項目の完了判定を集約してcanProceedを計算。条件付きフィールドの必須判定を正しく処理する。

- [x] 9.5 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ApplicationInputPage.test.tsx src/__tests__/NavigationButtons.test.tsx`
期待結果：PASS

- [x] 9.6 **コミット**
```bash
git add src/app/views/ApplicationInputPage.tsx src/components/application/NavigationButtons.tsx src/__tests__/ApplicationInputPage.test.tsx src/__tests__/NavigationButtons.test.tsx
git commit -m "feat: integrate ApplicationInputPage with all 7 form sections and navigation"
```

---

### タスク 10：全テスト実行と最終確認

**関連ファイル：**
- 修正：src/__tests__/routing.test.tsx

- [x] 10.1 **ルーティングテストに/application-inputのテストを追加**
```typescript
// src/__tests__/routing.test.tsx に追加
it('/application-inputでApplicationInputPageが表示されること', () => {
  render(
    <MemoryRouter initialEntries={['/application-input']}>
      <AppRoutes />
    </MemoryRouter>,
  );
  expect(screen.getByText('③申込内容入力')).toBeInTheDocument();
});
```

- [x] 10.2 **全テストを実行**
コマンド：`npx vitest run`
期待結果：PASS — 全テストが成功すること

- [x] 10.3 **コミット**
```bash
git add src/__tests__/routing.test.tsx
git commit -m "test: add application-input route test and verify all tests pass"
```
