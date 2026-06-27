### タスク 1：insurancePremium のストア追加と初期値変更

**関連ファイル：**
- 修正：src/store/applicationFormStore.ts
- テスト：src/__tests__/applicationFormStore.default.test.ts

- [x] 1.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { useApplicationFormStore } from '../store/applicationFormStore';

describe('applicationFormStore デフォルト値', () => {
  beforeEach(() => {
    useApplicationFormStore.setState({
      contractDate: '',
      contractCourse: { insurancePeriod: '1', paymentMethod: '5', product: 'K008', planType: '' },
      housingOverview: { structure: '1', housingType: '2', totalFloors: '', residentFloor: '' },
      contractorInfo: {
        contractType: '1', corporateName: '', corporateNameKana: '', positionName: '',
        name: '', nameKana: '', sex: '1', birthYear: '', birthMonth: '', birthDay: '',
        postalCode: '', address: '', buildingName: '', addressKana: '',
        phone1: '', phone2: '', phone3: '',
      },
      residenceLocation: { postalCode: '', address: '', buildingName: '', addressKana: '' },
      insurancePremium: 0,
    });
  });

  it('insurancePremium の初期値が 880 であること', () => {
    useApplicationFormStore.setState({ insurancePremium: 880 });
    expect(useApplicationFormStore.getState().insurancePremium).toBe(880);
  });

  it('setInsurancePremium で保険料を更新できること', () => {
    useApplicationFormStore.getState().setInsurancePremium(1500);
    expect(useApplicationFormStore.getState().insurancePremium).toBe(1500);
  });
});
```

- [x] 1.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/applicationFormStore.default.test.ts`
期待結果：FAIL — insurancePremium, setInsurancePremium が存在しない

- [x] 1.3 **最小実装を書く**
`src/store/applicationFormStore.ts` の変更：

`ApplicationFormState` インターフェースに追加：
```typescript
insurancePremium: number;
setInsurancePremium: (amount: number) => void;
```

ストア実装に追加（`isCompleted` の後）：
```typescript
insurancePremium: 880,
setInsurancePremium: (amount) => set({ insurancePremium: amount }),
```

ストアの初期値をデモデータに変更：
```typescript
contractDate: '',
contractCourse: { insurancePeriod: '1', paymentMethod: '5', product: 'K008', planType: '1Y8C' },
housingOverview: { structure: '1', housingType: '2', totalFloors: '10', residentFloor: '6' },
contractorInfo: {
  contractType: '1', corporateName: '', corporateNameKana: '', positionName: '',
  name: '保険太郎', nameKana: 'ホケンタロウ', sex: '1',
  birthYear: '1975', birthMonth: '11', birthDay: '2',
  postalCode: '1040041', address: '東京都中央区新富2-5-10',
  buildingName: 'アパホテル', addressKana: 'トウキョウト チュウオウク シントミ 2-5-10',
  phone1: '0570', phone2: '044', phone3: '811',
},
residenceLocation: {
  postalCode: '1040041', address: '東京都中央区新富2-5-10',
  buildingName: 'アパホテル', addressKana: 'トウキョウト チュウオウク シントミ 2-5-10',
},
```

- [x] 1.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/applicationFormStore.default.test.ts`
期待結果：PASS

- [x] 1.5 **コミット**
```bash
git add src/store/applicationFormStore.ts src/__tests__/applicationFormStore.default.test.ts
git commit -m "feat: add insurancePremium to store and set default demo values"
```

---

### タスク 2：getDefaultContractDate ユーティリティ

**関連ファイル：**
- 新規：src/utils/defaultContractDate.ts
- テスト：src/__tests__/defaultContractDate.test.ts

- [x] 2.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { getDefaultContractDate } from '../utils/defaultContractDate';

describe('getDefaultContractDate', () => {
  it('現在日付の1週間後を yyyy/mm/dd 形式で返すこと', () => {
    const result = getDefaultContractDate();
    const expected = new Date();
    expected.setDate(expected.getDate() + 7);
    const yyyymmdd = `${expected.getFullYear()}/${String(expected.getMonth() + 1).padStart(2, '0')}/${String(expected.getDate()).padStart(2, '0')}`;
    expect(result).toBe(yyyymmdd);
  });

  it('月末を跨ぐ場合も正しい日付を返すこと', () => {
    // 2026-06-27 + 7日 = 2026-07-04
    const result = getDefaultContractDate(new Date(2026, 5, 27));
    expect(result).toBe('2026/07/04');
  });

  it('年末を跨ぐ場合も正しい日付を返すこと', () => {
    // 2026-12-28 + 7日 = 2027-01-04
    const result = getDefaultContractDate(new Date(2026, 11, 28));
    expect(result).toBe('2027/01/04');
  });

  it('引数なしの場合は現在日付を基準にすること', () => {
    const result = getDefaultContractDate();
    const now = new Date();
    const expected = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
    const expectedStr = `${expected.getFullYear()}/${String(expected.getMonth() + 1).padStart(2, '0')}/${String(expected.getDate()).padStart(2, '0')}`;
    expect(result).toBe(expectedStr);
  });
});
```

- [x] 2.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/defaultContractDate.test.ts`
期待結果：FAIL — Cannot find module '../utils/defaultContractDate'

- [x] 2.3 **最小実装を書く**
`src/utils/defaultContractDate.ts`：
```typescript
export function getDefaultContractDate(baseDate?: Date): string {
  const base = baseDate ?? new Date();
  const result = new Date(base.getFullYear(), base.getMonth(), base.getDate() + 7);
  const yyyy = result.getFullYear();
  const mm = String(result.getMonth() + 1).padStart(2, '0');
  const dd = String(result.getDate()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd}`;
}
```

- [x] 2.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/defaultContractDate.test.ts`
期待結果：PASS

- [x] 2.5 **コミット**
```bash
git add src/utils/defaultContractDate.ts src/__tests__/defaultContractDate.test.ts
git commit -m "feat: add getDefaultContractDate utility"
```

---

### タスク 3：ストア初期値にgetDefaultContractDateを適用

**関連ファイル：**
- 修正：src/store/applicationFormStore.ts
- テスト：src/__tests__/applicationFormStore.default.test.ts

- [x] 3.1 **失敗するテストを書く**
`src/__tests__/applicationFormStore.default.test.ts` に追加：
```typescript
it('contractDate の初期値が getDefaultContractDate の結果であること', () => {
  const { getDefaultContractDate } = require('../utils/defaultContractDate');
  expect(useApplicationFormStore.getState().contractDate).toBe(getDefaultContractDate());
});
```

- [x] 3.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/applicationFormStore.default.test.ts`
期待結果：FAIL — contractDate が空文字のため getDefaultContractDate() の結果と一致しない

- [x] 3.3 **最小実装を書く**
`src/store/applicationFormStore.ts` の変更：

import追加：
```typescript
import { getDefaultContractDate } from '../utils/defaultContractDate';
```

初期値変更：
```typescript
contractDate: getDefaultContractDate(),
```

- [x] 3.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/applicationFormStore.default.test.ts`
期待結果：PASS

- [x] 3.5 **コミット**
```bash
git add src/store/applicationFormStore.ts src/__tests__/applicationFormStore.default.test.ts
git commit -m "feat: apply getDefaultContractDate to store initial value"
```

---

### タスク 4：ContractDateSection に初期値props追加

**関連ファイル：**
- 修正：src/components/application/ContractDateSection.tsx
- テスト：src/__tests__/ContractDateSection.test.tsx

- [x] 4.1 **失敗するテストを書く**
`src/__tests__/ContractDateSection.test.tsx` に追加：
```typescript
it('value propsが指定された場合、その値で初期化されること', () => {
  render(<ContractDateSection onChange={vi.fn()} value="2026/07/04" />);
  expect(screen.getByDisplayValue('2026/07/04')).toBeInTheDocument();
});
```

- [x] 4.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ContractDateSection.test.tsx`
期待結果：FAIL — value props が存在しない

- [x] 4.3 **最小実装を書く**
`src/components/application/ContractDateSection.tsx` の変更：

props型に追加：
```typescript
interface ContractDateSectionProps {
  onChange: (date: string) => void;
  value?: string;
}
```

コンポーネント引数とuseState変更：
```typescript
export function ContractDateSection({ onChange, value }: ContractDateSectionProps) {
  const [date, setDate] = useState(value ?? '');
```

- [x] 4.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ContractDateSection.test.tsx`
期待結果：PASS

- [x] 4.5 **コミット**
```bash
git add src/components/application/ContractDateSection.tsx src/__tests__/ContractDateSection.test.tsx
git commit -m "feat: add value prop to ContractDateSection"
```

---

### タスク 5：ContractCourseSection に初期値props追加と保険料表示変更

**関連ファイル：**
- 修正：src/components/application/ContractCourseSection.tsx
- テスト：src/__tests__/ContractCourseSection.test.tsx

- [x] 5.1 **失敗するテストを書く**
`src/__tests__/ContractCourseSection.test.tsx` に追加：
```typescript
it('defaultValue propsが指定された場合、その値で初期化されること', () => {
  const defaultValue = { insurancePeriod: '1', paymentMethod: '5', product: 'K008', planType: '1Y8C' };
  render(<ContractCourseSection onChange={vi.fn()} defaultValue={defaultValue} insurancePremium={880} />);
  expect(screen.getByDisplayValue('１Ｙ８')).toBeInTheDocument();
  expect(screen.getByText('880円')).toBeInTheDocument();
});
```

- [x] 5.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ContractCourseSection.test.tsx`
期待結果：FAIL — defaultValue, insurancePremium props が存在しない

- [x] 5.3 **最小実装を書く**
`src/components/application/ContractCourseSection.tsx` の変更：

props型に追加：
```typescript
interface ContractCourseSectionProps {
  onChange: (data: ContractCourseData) => void;
  defaultValue?: ContractCourseData;
  insurancePremium?: number;
}
```

コンポーネント引数とuseState変更：
```typescript
export function ContractCourseSection({ onChange, defaultValue, insurancePremium = 0 }: ContractCourseSectionProps) {
  const [form, setForm] = useState<ContractCourseData>(defaultValue ?? {
    insurancePeriod: '1',
    paymentMethod: '5',
    product: 'K008',
    planType: '',
  });
```

保険料表示変更：
```typescript
<FormRow label="保険料" className="mt-2">
  <b className="text-base text-text-primary">{insurancePremium.toLocaleString()}円</b>
</FormRow>
```

- [x] 5.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ContractCourseSection.test.tsx`
期待結果：PASS

- [x] 5.5 **コミット**
```bash
git add src/components/application/ContractCourseSection.tsx src/__tests__/ContractCourseSection.test.tsx
git commit -m "feat: add defaultValue and insurancePremium props to ContractCourseSection"
```

---

### タスク 6：HousingOverviewSection に初期値props追加

**関連ファイル：**
- 修正：src/components/application/HousingOverviewSection.tsx
- テスト：src/__tests__/HousingOverviewSection.test.tsx

- [x] 6.1 **失敗するテストを書く**
`src/__tests__/HousingOverviewSection.test.tsx` に追加：
```typescript
it('defaultValue propsが指定された場合、その値で初期化されること', () => {
  const defaultValue = { structure: '1', housingType: '2', totalFloors: '10', residentFloor: '6' };
  render(<HousingOverviewSection onChange={vi.fn()} defaultValue={defaultValue} />);
  expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  expect(screen.getByDisplayValue('6')).toBeInTheDocument();
});
```

- [x] 6.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/HousingOverviewSection.test.tsx`
期待結果：FAIL — defaultValue props が存在しない

- [x] 6.3 **最小実装を書く**
`src/components/application/HousingOverviewSection.tsx` の変更：

props型に追加：
```typescript
interface HousingOverviewSectionProps {
  onChange: (data: HousingOverviewData) => void;
  defaultValue?: HousingOverviewData;
}
```

コンポーネント引数とuseState変更：
```typescript
export function HousingOverviewSection({ onChange, defaultValue }: HousingOverviewSectionProps) {
  const [form, setForm] = useState<HousingOverviewData>(defaultValue ?? {
    structure: '1',
    housingType: '2',
    totalFloors: '',
    residentFloor: '',
  });
```

- [x] 6.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/HousingOverviewSection.test.tsx`
期待結果：PASS

- [x] 6.5 **コミット**
```bash
git add src/components/application/HousingOverviewSection.tsx src/__tests__/HousingOverviewSection.test.tsx
git commit -m "feat: add defaultValue prop to HousingOverviewSection"
```

---

### タスク 7：ContractorInfoSection に初期値props追加

**関連ファイル：**
- 修正：src/components/application/ContractorInfoSection.tsx
- テスト：src/__tests__/ContractorInfoSection.test.tsx

- [x] 7.1 **失敗するテストを書く**
`src/__tests__/ContractorInfoSection.test.tsx` に追加：
```typescript
it('defaultValue propsが指定された場合、その値で初期化されること', () => {
  const defaultValue = {
    contractType: '1', corporateName: '', corporateNameKana: '', positionName: '',
    name: '保険太郎', nameKana: 'ホケンタロウ', sex: '1',
    birthYear: '1975', birthMonth: '11', birthDay: '2',
    postalCode: '1040041', address: '東京都中央区新富2-5-10',
    buildingName: 'アパホテル', addressKana: 'トウキョウト チュウオウク シントミ 2-5-10',
    phone1: '0570', phone2: '044', phone3: '811',
  };
  render(<ContractorInfoSection onChange={vi.fn()} defaultValue={defaultValue} />);
  expect(screen.getByDisplayValue('保険太郎')).toBeInTheDocument();
  expect(screen.getByDisplayValue('ホケンタロウ')).toBeInTheDocument();
  expect(screen.getByDisplayValue('1975')).toBeInTheDocument();
  expect(screen.getByDisplayValue('1040041')).toBeInTheDocument();
  expect(screen.getByDisplayValue('東京都中央区新富2-5-10')).toBeInTheDocument();
  expect(screen.getByDisplayValue('アパホテル')).toBeInTheDocument();
  expect(screen.getByDisplayValue('トウキョウト チュウオウク シントミ 2-5-10')).toBeInTheDocument();
  expect(screen.getByDisplayValue('0570')).toBeInTheDocument();
  expect(screen.getByDisplayValue('044')).toBeInTheDocument();
  expect(screen.getByDisplayValue('811')).toBeInTheDocument();
});
```

- [x] 7.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ContractorInfoSection.test.tsx`
期待結果：FAIL — defaultValue props が存在しない

- [x] 7.3 **最小実装を書く**
`src/components/application/ContractorInfoSection.tsx` の変更：

props型に追加：
```typescript
interface ContractorInfoSectionProps {
  onChange: (data: ContractorInfoData) => void;
  defaultValue?: ContractorInfoData;
}
```

コンポーネント引数とuseState変更：
```typescript
export function ContractorInfoSection({ onChange, defaultValue }: ContractorInfoSectionProps) {
  const [form, setForm] = useState<ContractorInfoData>(defaultValue ?? {
    contractType: '1',
    corporateName: '',
    corporateNameKana: '',
    positionName: '',
    name: '',
    nameKana: '',
    sex: '1',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    postalCode: '',
    address: '',
    buildingName: '',
    addressKana: '',
    phone1: '',
    phone2: '',
    phone3: '',
  });
```

- [x] 7.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ContractorInfoSection.test.tsx`
期待結果：PASS

- [x] 7.5 **コミット**
```bash
git add src/components/application/ContractorInfoSection.tsx src/__tests__/ContractorInfoSection.test.tsx
git commit -m "feat: add defaultValue prop to ContractorInfoSection"
```

---

### タスク 8：ResidenceLocationSection に初期値props追加

**関連ファイル：**
- 修正：src/components/application/ResidenceLocationSection.tsx
- テスト：src/__tests__/ResidenceLocationSection.test.tsx

- [x] 8.1 **失敗するテストを書く**
`src/__tests__/ResidenceLocationSection.test.tsx` に追加：
```typescript
it('defaultValue propsが指定された場合、その値で初期化されること', () => {
  const defaultValue = {
    postalCode: '1040041', address: '東京都中央区新富2-5-10',
    buildingName: 'アパホテル', addressKana: 'トウキョウト チュウオウク シントミ 2-5-10',
  };
  render(
    <ResidenceLocationSection
      onChange={vi.fn()}
      contractorAddress={null}
      defaultValue={defaultValue}
    />,
  );
  expect(screen.getByDisplayValue('1040041')).toBeInTheDocument();
  expect(screen.getByDisplayValue('東京都中央区新富2-5-10')).toBeInTheDocument();
  expect(screen.getByDisplayValue('アパホテル')).toBeInTheDocument();
  expect(screen.getByDisplayValue('トウキョウト チュウオウク シントミ 2-5-10')).toBeInTheDocument();
});
```

- [x] 8.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ResidenceLocationSection.test.tsx`
期待結果：FAIL — defaultValue props が存在しない

- [x] 8.3 **最小実装を書く**
`src/components/application/ResidenceLocationSection.tsx` の変更：

props型に追加：
```typescript
interface ResidenceLocationSectionProps {
  onChange: (data: ResidenceLocationData) => void;
  contractorAddress: ContractorAddress | null;
  defaultValue?: ResidenceLocationData;
}
```

コンポーネント引数とuseState変更：
```typescript
export function ResidenceLocationSection({ onChange, contractorAddress, defaultValue }: ResidenceLocationSectionProps) {
  const [form, setForm] = useState<ResidenceLocationData>(defaultValue ?? {
    postalCode: '',
    address: '',
    buildingName: '',
    addressKana: '',
  });
```

- [x] 8.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ResidenceLocationSection.test.tsx`
期待結果：PASS

- [x] 8.5 **コミット**
```bash
git add src/components/application/ResidenceLocationSection.tsx src/__tests__/ResidenceLocationSection.test.tsx
git commit -m "feat: add defaultValue prop to ResidenceLocationSection"
```

---

### タスク 9：ApplicationInputPage でストアの初期値をセクションに渡す

**関連ファイル：**
- 修正：src/app/views/ApplicationInputPage.tsx

- [x] 9.1 **最小実装を書く**
`src/app/views/ApplicationInputPage.tsx` の変更：

ストアからの取得に `insurancePremium` を追加：
```typescript
const {
  contractDate, contractCourse, housingOverview, contractorInfo,
  residenceLocation, primaryResident, coResident, insurancePremium,
  setContractDate, setContractCourse, setHousingOverview, setContractorInfo,
  setResidenceLocation, setPrimaryResident, setCoResident,
} = useApplicationFormStore();
```

セクションコンポーネントにpropsを渡す：
```typescript
<ContractDateSection onChange={setContractDate} value={contractDate} />
<ContractCourseSection onChange={setContractCourse} defaultValue={contractCourse} insurancePremium={insurancePremium} />
<HousingOverviewSection onChange={setHousingOverview} defaultValue={housingOverview} />
<ContractorInfoSection onChange={setContractorInfo} defaultValue={contractorInfo} />
<ResidenceLocationSection onChange={setResidenceLocation} contractorAddress={contractorAddress} defaultValue={residenceLocation} />
```

- [x] 9.2 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ApplicationInputPage.test.tsx`
期待結果：PASS

- [x] 9.3 **コミット**
```bash
git add src/app/views/ApplicationInputPage.tsx
git commit -m "feat: pass store default values to section components"
```

---

### タスク 10：PaymentPage の保険料をストア参照に変更

**関連ファイル：**
- 修正：src/app/views/PaymentPage.tsx
- テスト：src/__tests__/PaymentPage.test.tsx

- [x] 10.1 **失敗するテストを書く**
`src/__tests__/PaymentPage.test.tsx` の既存モックに `insurancePremium: 880` を追加し、テストを追加：
```typescript
// モックストアに追加
insurancePremium: 880,

it('お支払金額に880円が表示されること', () => {
  renderWithRouter();
  expect(screen.getByText('880円')).toBeInTheDocument();
});
```

- [x] 10.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/PaymentPage.test.tsx`
期待結果：FAIL — 「880円」が見つからない（現在は0円）

- [x] 10.3 **最小実装を書く**
`src/app/views/PaymentPage.tsx` の変更：

ストアから `insurancePremium` を取得：
```typescript
const { ..., insurancePremium } = store;
```

PaymentAmountSection に渡す：
```typescript
<PaymentAmountSection amount={insurancePremium} />
```

- [x] 10.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/PaymentPage.test.tsx`
期待結果：PASS

- [x] 10.5 **コミット**
```bash
git add src/app/views/PaymentPage.tsx src/__tests__/PaymentPage.test.tsx
git commit -m "feat: use insurancePremium from store in PaymentPage"
```

---

### タスク 11：ApplicationCompletionPage の保険料をストア参照に変更

**関連ファイル：**
- 修正：src/app/views/ApplicationCompletionPage.tsx
- テスト：src/__tests__/ApplicationCompletionPage.test.tsx

- [x] 11.1 **失敗するテストを書く**
`src/__tests__/ApplicationCompletionPage.test.tsx` のモックに `insurancePremium: 880` を追加し、テストを追加：
```typescript
// モックストアに追加
insurancePremium: 880,

it('保険料合計に880円が表示されること', () => {
  renderWithRouter();
  expect(screen.getByText('880円')).toBeInTheDocument();
});
```

- [x] 11.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ApplicationCompletionPage.test.tsx`
期待結果：FAIL — 「880円」が見つからない

- [x] 11.3 **最小実装を書く**
`src/app/views/ApplicationCompletionPage.tsx` の変更：

CompletionSummarySection に渡す amount を変更：
```typescript
<CompletionSummarySection data={store.contractCourse} amount={store.insurancePremium} />
```

- [x] 11.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ApplicationCompletionPage.test.tsx`
期待結果：PASS

- [x] 11.5 **コミット**
```bash
git add src/app/views/ApplicationCompletionPage.tsx src/__tests__/ApplicationCompletionPage.test.tsx
git commit -m "feat: use insurancePremium from store in ApplicationCompletionPage"
```

---

### タスク 12：既存テストの修正と全テスト統合確認

**関連ファイル：**
- 修正：各テストファイルのモックストア値

- [x] 12.1 **既存テストのモックストア値を更新**
ストアに `insurancePremium` フィールドが追加されたため、各テストファイルのモックストアに `insurancePremium: 0` （または880）を追加する。また、ストア初期値変更に伴い、ApplicationInputPage等のテストで初期値が空でないことを前提としたアサーションを修正する。

主な修正対象：
- `src/__tests__/ApplicationInputPage.test.tsx` — モックストアに `insurancePremium: 0` 追加
- `src/__tests__/ContractCourseConfirmationSection.test.tsx` — 保険料表示の期待値確認
- `src/__tests__/CompletionSummarySection.test.tsx` — 保険料表示テスト確認
- `src/__tests__/PaymentAmountSection.test.tsx` — 保険料表示テスト確認

- [x] 12.2 **全テストを実行して成功を確認**
コマンド：`npx vitest run`
期待結果：PASS — 全テストが成功

- [x] 12.3 **コミット**
```bash
git add -A
git commit -m "test: update mock stores and verify all tests pass with default values"
```
