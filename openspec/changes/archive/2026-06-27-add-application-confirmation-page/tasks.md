### タスク 1：Zustandインストールとフォームデータストアの作成

**関連ファイル：**
- 新規：src/store/applicationFormStore.ts
- テスト：src/__tests__/applicationFormStore.test.ts

- [x] 1.1 **Zustandをインストール**
```bash
npm install zustand
```

- [x] 1.2 **失敗するテストを書く**
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { useApplicationFormStore } from '../store/applicationFormStore';

describe('applicationFormStore', () => {
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
      primaryResident: {
        residentType: '', name: '', nameKana: '', sex: '1',
        birthYear: '', birthMonth: '', birthDay: '',
        relationship: '', relationshipNote: '',
        phone1: '', phone2: '', phone3: '',
      },
      coResident: { hasCoResident: false, residents: [] },
    });
  });

  it('初期状態が正しいこと', () => {
    const state = useApplicationFormStore.getState();
    expect(state.contractDate).toBe('');
    expect(state.contractCourse.planType).toBe('');
  });

  it('setContractDateで契約希望日を更新できること', () => {
    useApplicationFormStore.getState().setContractDate('2026/07/01');
    expect(useApplicationFormStore.getState().contractDate).toBe('2026/07/01');
  });

  it('setContractCourseでご契約コースを更新できること', () => {
    useApplicationFormStore.getState().setContractCourse({ insurancePeriod: '2', paymentMethod: '5', product: 'K008', planType: '1Y8C' });
    expect(useApplicationFormStore.getState().contractCourse.insurancePeriod).toBe('2');
    expect(useApplicationFormStore.getState().contractCourse.planType).toBe('1Y8C');
  });

  it('setHousingOverviewで住居の概要を更新できること', () => {
    useApplicationFormStore.getState().setHousingOverview({ structure: '2', housingType: '1', totalFloors: '2', residentFloor: '' });
    expect(useApplicationFormStore.getState().housingOverview.structure).toBe('2');
  });

  it('setContractorInfoでご契約者様の情報を更新できること', () => {
    useApplicationFormStore.getState().setContractorInfo({
      contractType: '2', corporateName: 'テスト株式会社', corporateNameKana: 'テストカブシキガイシャ', positionName: '社長',
      name: '山田太郎', nameKana: 'ヤマダタロウ', sex: '1', birthYear: '1980', birthMonth: '01', birthDay: '15',
      postalCode: '123-4567', address: '東京都新宿区西新宿1-1-1', buildingName: 'テストビル101', addressKana: 'トウキョウトシンジュククニシシンジュク1-1-1',
      phone1: '03', phone2: '1234', phone3: '5678',
    });
    expect(useApplicationFormStore.getState().contractorInfo.corporateName).toBe('テスト株式会社');
  });

  it('setResidenceLocationで住居の所在地を更新できること', () => {
    useApplicationFormStore.getState().setResidenceLocation({ postalCode: '100-0001', address: '東京都千代田区千代田1-1', buildingName: '皇居', addressKana: 'トウキョウトチヨダクチヨダ1-1' });
    expect(useApplicationFormStore.getState().residenceLocation.postalCode).toBe('100-0001');
  });

  it('setPrimaryResidentで主たる居住者を更新できること', () => {
    useApplicationFormStore.getState().setPrimaryResident({ residentType: '0', name: '', nameKana: '', sex: '1', birthYear: '', birthMonth: '', birthDay: '', relationship: '', relationshipNote: '', phone1: '', phone2: '', phone3: '' });
    expect(useApplicationFormStore.getState().primaryResident.residentType).toBe('0');
  });

  it('setCoResidentで同居人の明細を更新できること', () => {
    useApplicationFormStore.getState().setCoResident({ hasCoResident: true, residents: [{ name: '山田花子', nameKana: 'ヤマダハナコ', sex: '2', birthYear: '1985', birthMonth: '03', birthDay: '20', relationship: '1', relationshipNote: '' }] });
    expect(useApplicationFormStore.getState().coResident.hasCoResident).toBe(true);
    expect(useApplicationFormStore.getState().coResident.residents[0].name).toBe('山田花子');
  });

  it('hasDataはデータ未入力時にfalseを返すこと', () => {
    expect(useApplicationFormStore.getState().hasData()).toBe(false);
  });

  it('hasDataは契約希望日入力時にtrueを返すこと', () => {
    useApplicationFormStore.getState().setContractDate('2026/07/01');
    expect(useApplicationFormStore.getState().hasData()).toBe(true);
  });
});
```

- [x] 1.3 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/applicationFormStore.test.ts`
期待結果：FAIL — applicationFormStoreが存在しない

- [x] 1.4 **最小実装を書く**
```typescript
// src/store/applicationFormStore.ts
import { create } from 'zustand';
import type { ContractCourseData } from '../components/application/ContractCourseSection';
import type { HousingOverviewData } from '../components/application/HousingOverviewSection';
import type { ContractorInfoData } from '../components/application/ContractorInfoSection';
import type { ResidenceLocationData } from '../components/application/ResidenceLocationSection';
import type { PrimaryResidentData } from '../components/application/PrimaryResidentSection';
import type { CoResidentData } from '../components/application/CoResidentSection';

interface ApplicationFormState {
  contractDate: string;
  contractCourse: ContractCourseData;
  housingOverview: HousingOverviewData;
  contractorInfo: ContractorInfoData;
  residenceLocation: ResidenceLocationData;
  primaryResident: PrimaryResidentData;
  coResident: CoResidentData;
  setContractDate: (date: string) => void;
  setContractCourse: (data: ContractCourseData) => void;
  setHousingOverview: (data: HousingOverviewData) => void;
  setContractorInfo: (data: ContractorInfoData) => void;
  setResidenceLocation: (data: ResidenceLocationData) => void;
  setPrimaryResident: (data: PrimaryResidentData) => void;
  setCoResident: (data: CoResidentData) => void;
  hasData: () => boolean;
}

export const useApplicationFormStore = create<ApplicationFormState>((set, get) => ({
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
  primaryResident: {
    residentType: '', name: '', nameKana: '', sex: '1',
    birthYear: '', birthMonth: '', birthDay: '',
    relationship: '', relationshipNote: '',
    phone1: '', phone2: '', phone3: '',
  },
  coResident: { hasCoResident: false, residents: [] },
  setContractDate: (date) => set({ contractDate: date }),
  setContractCourse: (data) => set({ contractCourse: data }),
  setHousingOverview: (data) => set({ housingOverview: data }),
  setContractorInfo: (data) => set({ contractorInfo: data }),
  setResidenceLocation: (data) => set({ residenceLocation: data }),
  setPrimaryResident: (data) => set({ primaryResident: data }),
  setCoResident: (data) => set({ coResident: data }),
  hasData: () => get().contractDate.trim() !== '' || get().contractorInfo.name.trim() !== '',
}));
```

- [x] 1.5 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/applicationFormStore.test.ts`
期待結果：PASS

- [x] 1.6 **コミット**
```bash
git add src/store/applicationFormStore.ts src/__tests__/applicationFormStore.test.ts package.json package-lock.json
git commit -m "feat: add Zustand store for application form data"
```

---

### タスク 2：ApplicationInputPageのストア統合

**関連ファイル：**
- 修正：src/app/views/ApplicationInputPage.tsx
- テスト：src/__tests__/ApplicationInputPage.test.ts

- [x] 2.1 **失敗するテストを書く**
```typescript
// src/__tests__/ApplicationInputPage.test.ts に追加
import { useApplicationFormStore } from '../store/applicationFormStore';

it('入力変更時にストアが更新されること', async () => {
  const { rerender } = render(
    <MemoryRouter>
      <ApplicationInputPage />
    </MemoryRouter>,
  );
  // ContractDateSectionに日付を入力
  const dateInput = screen.getByPlaceholderText('yyyy/mm/dd');
  await userEvent.type(dateInput, '2026/07/01');
  // ストアが更新されていることを確認
  expect(useApplicationFormStore.getState().contractDate).toBe('2026/07/01');
});

it('次へボタンクリックで/application-confirmationに遷移すること', async () => {
  // 全必須項目を入力
  useApplicationFormStore.setState({
    contractDate: '2026/07/01',
    contractCourse: { insurancePeriod: '1', paymentMethod: '5', product: 'K008', planType: '1Y8C' },
    housingOverview: { structure: '1', housingType: '2', totalFloors: '3', residentFloor: '2' },
    contractorInfo: {
      contractType: '1', corporateName: '', corporateNameKana: '', positionName: '',
      name: '山田太郎', nameKana: 'ヤマダタロウ', sex: '1', birthYear: '1980', birthMonth: '01', birthDay: '15',
      postalCode: '123-4567', address: '東京都新宿区西新宿1-1', buildingName: '', addressKana: 'トウキョウト',
      phone1: '03', phone2: '1234', phone3: '5678',
    },
    residenceLocation: { postalCode: '123-4567', address: '東京都新宿区西新宿1-1', buildingName: '', addressKana: 'トウキョウト' },
    primaryResident: { residentType: '0', name: '', nameKana: '', sex: '1', birthYear: '', birthMonth: '', birthDay: '', relationship: '', relationshipNote: '', phone1: '', phone2: '', phone3: '' },
    coResident: { hasCoResident: false, residents: [] },
  });

  const mockNavigate = vi.fn();
  vi.mocked(useNavigate).mockReturnValue(mockNavigate);

  render(
    <MemoryRouter>
      <ApplicationInputPage />
    </MemoryRouter>,
  );

  const nextButton = screen.getByRole('button', { name: /次へ/ });
  await userEvent.click(nextButton);
  expect(mockNavigate).toHaveBeenCalledWith('/application-confirmation');
});
```

- [x] 2.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ApplicationInputPage.test.ts`
期待結果：FAIL — ストア同期されていない、ナビゲーション先が異なる

- [x] 2.3 **最小実装を書く**
```typescript
// src/app/views/ApplicationInputPage.tsx — 変更箇所のみ
// import追加
import { useApplicationFormStore } from '../../store/applicationFormStore';

// useStateの代わりにストアを使用
// 各onChangeをストアのsetterに接続
// handleNextの遷移先を変更

function ApplicationInputPage() {
  const navigate = useNavigate();
  const {
    contractDate, contractCourse, housingOverview, contractorInfo,
    residenceLocation, primaryResident, coResident,
    setContractDate, setContractCourse, setHousingOverview, setContractorInfo,
    setResidenceLocation, setPrimaryResident, setCoResident,
  } = useApplicationFormStore();

  const contractorAddress: ContractorAddress = useMemo(() => ({
    postalCode: contractorInfo.postalCode,
    address: contractorInfo.address,
    buildingName: contractorInfo.buildingName,
    addressKana: contractorInfo.addressKana,
  }), [contractorInfo.postalCode, contractorInfo.address, contractorInfo.buildingName, contractorInfo.addressKana]);

  const isCorporate = contractorInfo.contractType === '2';
  const isDifferentResident = primaryResident.residentType === '0';

  const canProceed = useMemo(() => {
    // 既存のバリデーションロジック（変更なし）
    if (!contractDate.trim()) return false;
    if (!contractCourse.planType.trim()) return false;
    if (!housingOverview.totalFloors.trim()) return false;
    if (housingOverview.housingType === '2' && !housingOverview.residentFloor.trim()) return false;
    if (isCorporate) {
      if (!contractorInfo.corporateName.trim()) return false;
      if (!contractorInfo.corporateNameKana.trim()) return false;
    }
    if (!contractorInfo.name.trim()) return false;
    if (!contractorInfo.nameKana.trim()) return false;
    if (!isCorporate) {
      if (!contractorInfo.sex.trim()) return false;
      if (!contractorInfo.birthYear.trim()) return false;
      if (!contractorInfo.birthMonth.trim()) return false;
      if (!contractorInfo.birthDay.trim()) return false;
    }
    if (!contractorInfo.postalCode.trim()) return false;
    if (!contractorInfo.address.trim()) return false;
    if (!contractorInfo.addressKana.trim()) return false;
    if (!contractorInfo.phone1.trim() || !contractorInfo.phone2.trim() || !contractorInfo.phone3.trim()) return false;
    if (!residenceLocation.postalCode.trim()) return false;
    if (!residenceLocation.address.trim()) return false;
    if (!residenceLocation.addressKana.trim()) return false;
    if (!primaryResident.residentType) return false;
    if (isDifferentResident) {
      if (!primaryResident.name.trim()) return false;
      if (!primaryResident.nameKana.trim()) return false;
      if (!primaryResident.sex.trim()) return false;
      if (!primaryResident.birthYear.trim()) return false;
      if (!primaryResident.birthMonth.trim()) return false;
      if (!primaryResident.birthDay.trim()) return false;
      if (!primaryResident.relationship) return false;
      if (primaryResident.relationship === '8' && !primaryResident.relationshipNote.trim()) return false;
    }
    if (coResident.hasCoResident && coResident.residents.length > 0) {
      const first = coResident.residents[0];
      if (!first.name.trim()) return false;
      if (!first.nameKana.trim()) return false;
      if (!first.sex.trim()) return false;
      if (!first.birthYear.trim()) return false;
      if (!first.birthMonth.trim()) return false;
      if (!first.birthDay.trim()) return false;
      if (!first.relationship) return false;
      if (first.relationship === '8' && !first.relationshipNote.trim()) return false;
    }
    return true;
  }, [contractDate, contractCourse, housingOverview, contractorInfo, isCorporate, residenceLocation, primaryResident, isDifferentResident, coResident]);

  const handleBack = useCallback(() => {
    navigate('/intent-confirmation');
  }, [navigate]);

  const handleNext = useCallback(() => {
    navigate('/application-confirmation');
  }, [navigate]);

  return (
    <div className="bg-white font-sans">
      <StepNavigation currentStep={3} />
      <main className="px-4 py-4">
        <div className="flex flex-col gap-4 min-[875px]:flex-row">
          <div className="w-full min-[875px]:w-[800px]">
            <ContractDateSection onChange={setContractDate} />
            <ContractCourseSection onChange={setContractCourse} />
            <HousingOverviewSection onChange={setHousingOverview} />
            <ContractorInfoSection onChange={setContractorInfo} />
            <ResidenceLocationSection onChange={setResidenceLocation} contractorAddress={contractorAddress} />
            <PrimaryResidentSection onChange={setPrimaryResident} />
            <CoResidentSection onChange={setCoResident} />
            <NavigationButtons canProceed={canProceed} onBack={handleBack} onNext={handleNext} />
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
```

- [x] 2.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ApplicationInputPage.test.ts`
期待結果：PASS

- [x] 2.5 **コミット**
```bash
git add src/app/views/ApplicationInputPage.tsx src/__tests__/ApplicationInputPage.test.ts
git commit -m "feat: integrate ApplicationInputPage with Zustand store and update navigation"
```

---

### タスク 3：ContractDateConfirmationSection コンポーネント

**関連ファイル：**
- 新規：src/components/confirmation/ContractDateConfirmationSection.tsx
- テスト：src/__tests__/ContractDateConfirmationSection.test.tsx

- [x] 3.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContractDateConfirmationSection } from '../components/confirmation/ContractDateConfirmationSection';

describe('ContractDateConfirmationSection コンポーネント', () => {
  it('見出し「① 契約希望日」が表示されること', () => {
    render(<ContractDateConfirmationSection date="2026/07/01" />);
    expect(screen.getByRole('heading', { name: /① 契約希望日/ })).toBeInTheDocument();
  });

  it('契約希望日のラベルと値が表示されること', () => {
    render(<ContractDateConfirmationSection date="2026/07/01" />);
    expect(screen.getByText('契約希望日')).toBeInTheDocument();
    expect(screen.getByText('2026/07/01')).toBeInTheDocument();
  });

  it('dateが空文字の場合は空欄で表示されること', () => {
    render(<ContractDateConfirmationSection date="" />);
    expect(screen.getByText('契約希望日')).toBeInTheDocument();
  });
});
```

- [x] 3.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ContractDateConfirmationSection.test.tsx`
期待結果：FAIL — ContractDateConfirmationSectionが存在しない

- [x] 3.3 **最小実装を書く**
```typescript
// src/components/confirmation/ContractDateConfirmationSection.tsx
interface ContractDateConfirmationSectionProps {
  date: string;
}

export function ContractDateConfirmationSection({ date }: ContractDateConfirmationSectionProps) {
  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ① 契約希望日
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <div className="grid grid-cols-[260px_1fr] w-full">
              <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
                契約希望日
              </div>
              <div className="border border-l-0 border-border bg-input-bg px-3 py-2 text-base text-text-primary">
                {date}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [x] 3.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ContractDateConfirmationSection.test.tsx`
期待結果：PASS

- [x] 3.5 **コミット**
```bash
git add src/components/confirmation/ContractDateConfirmationSection.tsx src/__tests__/ContractDateConfirmationSection.test.tsx
git commit -m "feat: add ContractDateConfirmationSection component"
```

---

### タスク 4：ContractCourseConfirmationSection コンポーネント

**関連ファイル：**
- 新規：src/components/confirmation/ContractCourseConfirmationSection.tsx
- テスト：src/__tests__/ContractCourseConfirmationSection.test.tsx

- [x] 4.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContractCourseConfirmationSection } from '../components/confirmation/ContractCourseConfirmationSection';
import type { ContractCourseData } from '../components/application/ContractCourseSection';

describe('ContractCourseConfirmationSection コンポーネント', () => {
  const defaultData: ContractCourseData = {
    insurancePeriod: '1',
    paymentMethod: '5',
    product: 'K008',
    planType: '1Y8C',
  };

  it('見出し「② ご契約コース」が表示されること', () => {
    render(<ContractCourseConfirmationSection data={defaultData} />);
    expect(screen.getByRole('heading', { name: /② ご契約コース/ })).toBeInTheDocument();
  });

  it('保険期間の値が表示ラベルに変換されること', () => {
    render(<ContractCourseConfirmationSection data={defaultData} />);
    expect(screen.getByText('１年')).toBeInTheDocument();
  });

  it('保険期間2年の値が正しく表示されること', () => {
    render(<ContractCourseConfirmationSection data={{ ...defaultData, insurancePeriod: '2' }} />);
    expect(screen.getByText('２年')).toBeInTheDocument();
  });

  it('保険料のお支払方法が表示されること', () => {
    render(<ContractCourseConfirmationSection data={defaultData} />);
    expect(screen.getByText('クレジットカード払')).toBeInTheDocument();
  });

  it('商品名が表示されること', () => {
    render(<ContractCourseConfirmationSection data={defaultData} />);
    expect(screen.getByText('メロンの新家財保険')).toBeInTheDocument();
  });

  it('プラン種別が表示されること', () => {
    render(<ContractCourseConfirmationSection data={defaultData} />);
    expect(screen.getByText('１Ｙ８')).toBeInTheDocument();
  });

  it('planTypeが空文字の場合は空欄で表示されること', () => {
    render(<ContractCourseConfirmationSection data={{ ...defaultData, planType: '' }} />);
    expect(screen.getByText('プラン種別')).toBeInTheDocument();
  });
});
```

- [x] 4.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ContractCourseConfirmationSection.test.tsx`
期待結果：FAIL — ContractCourseConfirmationSectionが存在しない

- [x] 4.3 **最小実装を書く**
```typescript
// src/components/confirmation/ContractCourseConfirmationSection.tsx
import type { ContractCourseData } from '../application/ContractCourseSection';

interface ContractCourseConfirmationSectionProps {
  data: ContractCourseData;
}

const periodLabels: Record<string, string> = { '1': '１年', '2': '２年' };
const paymentLabels: Record<string, string> = { '5': 'クレジットカード払' };
const productLabels: Record<string, string> = { 'K008': 'メロンの新家財保険' };
const planLabels: Record<string, string> = {
  '1Y8C': '１Ｙ８', '1Y9C': '１Ｙ９', '1Y10C': '１Ｙ１０',
  '1Y11C': '１Ｙ１１', '1Y12C': '１Ｙ１２', '1Y15C': '１Ｙ１５',
};

function ConfirmationRow({ label, value }: { label: string; value: string }) {
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

export function ContractCourseConfirmationSection({ data }: ContractCourseConfirmationSectionProps) {
  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ② ご契約コース
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <ConfirmationRow label="保険期間" value={periodLabels[data.insurancePeriod] ?? ''} />
            <ConfirmationRow label="保険料のお支払方法" value={paymentLabels[data.paymentMethod] ?? ''} />
            <ConfirmationRow label="商品" value={productLabels[data.product] ?? ''} />
            <ConfirmationRow label="プラン種別" value={planLabels[data.planType] ?? ''} />
            <ConfirmationRow label="保険料" value="0円" />
            <ConfirmationRow label="保険料の種類" value="" />
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [x] 4.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ContractCourseConfirmationSection.test.tsx`
期待結果：PASS

- [x] 4.5 **コミット**
```bash
git add src/components/confirmation/ContractCourseConfirmationSection.tsx src/__tests__/ContractCourseConfirmationSection.test.tsx
git commit -m "feat: add ContractCourseConfirmationSection component"
```

---

### タスク 5：HousingOverviewConfirmationSection コンポーネント

**関連ファイル：**
- 新規：src/components/confirmation/HousingOverviewConfirmationSection.tsx
- テスト：src/__tests__/HousingOverviewConfirmationSection.test.tsx

- [x] 5.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HousingOverviewConfirmationSection } from '../components/confirmation/HousingOverviewConfirmationSection';
import type { HousingOverviewData } from '../components/application/HousingOverviewSection';

describe('HousingOverviewConfirmationSection コンポーネント', () => {
  const apartmentData: HousingOverviewData = { structure: '1', housingType: '2', totalFloors: '5', residentFloor: '3' };
  const houseData: HousingOverviewData = { structure: '2', housingType: '1', totalFloors: '2', residentFloor: '' };

  it('見出し「③ 住居の概要」が表示されること', () => {
    render(<HousingOverviewConfirmationSection data={apartmentData} />);
    expect(screen.getByRole('heading', { name: /③ 住居の概要/ })).toBeInTheDocument();
  });

  it('構造が表示ラベルに変換されること（木造）', () => {
    render(<HousingOverviewConfirmationSection data={apartmentData} />);
    expect(screen.getByText('木造')).toBeInTheDocument();
  });

  it('構造が表示ラベルに変換されること（非木造）', () => {
    render(<HousingOverviewConfirmationSection data={houseData} />);
    expect(screen.getByText('非木造')).toBeInTheDocument();
  });

  it('形態が表示ラベルに変換されること（アパート・マンション）', () => {
    render(<HousingOverviewConfirmationSection data={apartmentData} />);
    expect(screen.getByText('アパート・マンション')).toBeInTheDocument();
  });

  it('アパート選択時は「〇階建中〇階」形式で表示されること', () => {
    render(<HousingOverviewConfirmationSection data={apartmentData} />);
    expect(screen.getByText('5階建中3階')).toBeInTheDocument();
  });

  it('戸建て選択時は「〇階建」形式で表示されること', () => {
    render(<HousingOverviewConfirmationSection data={houseData} />);
    expect(screen.getByText('2階建')).toBeInTheDocument();
  });
});
```

- [x] 5.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/HousingOverviewConfirmationSection.test.tsx`
期待結果：FAIL — HousingOverviewConfirmationSectionが存在しない

- [x] 5.3 **最小実装を書く**
```typescript
// src/components/confirmation/HousingOverviewConfirmationSection.tsx
import type { HousingOverviewData } from '../application/HousingOverviewSection';

interface HousingOverviewConfirmationSectionProps {
  data: HousingOverviewData;
}

const structureLabels: Record<string, string> = { '1': '木造', '2': '非木造' };
const housingTypeLabels: Record<string, string> = { '1': '戸建て', '2': 'アパート・マンション' };

function ConfirmationRow({ label, value }: { label: string; value: string }) {
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

export function HousingOverviewConfirmationSection({ data }: HousingOverviewConfirmationSectionProps) {
  const isApartment = data.housingType === '2';
  const floorText = isApartment
    ? (data.totalFloors && data.residentFloor ? `${data.totalFloors}階建中${data.residentFloor}階` : '')
    : (data.totalFloors ? `${data.totalFloors}階建` : '');

  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ③ 住居の概要
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <ConfirmationRow label="構造" value={structureLabels[data.structure] ?? ''} />
            <ConfirmationRow label="形態" value={housingTypeLabels[data.housingType] ?? ''} />
            <ConfirmationRow label="形態 （備考）" value={floorText} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [x] 5.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/HousingOverviewConfirmationSection.test.tsx`
期待結果：PASS

- [x] 5.5 **コミット**
```bash
git add src/components/confirmation/HousingOverviewConfirmationSection.tsx src/__tests__/HousingOverviewConfirmationSection.test.tsx
git commit -m "feat: add HousingOverviewConfirmationSection component"
```

---

### タスク 6：ContractorInfoConfirmationSection コンポーネント

**関連ファイル：**
- 新規：src/components/confirmation/ContractorInfoConfirmationSection.tsx
- テスト：src/__tests__/ContractorInfoConfirmationSection.test.tsx

- [x] 6.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContractorInfoConfirmationSection } from '../components/confirmation/ContractorInfoConfirmationSection';
import type { ContractorInfoData } from '../components/application/ContractorInfoSection';

describe('ContractorInfoConfirmationSection コンポーネント', () => {
  const personalData: ContractorInfoData = {
    contractType: '1', corporateName: '', corporateNameKana: '', positionName: '',
    name: '山田太郎', nameKana: 'ヤマダタロウ', sex: '1', birthYear: '1980', birthMonth: '01', birthDay: '15',
    postalCode: '123-4567', address: '東京都新宿区西新宿1-1-1', buildingName: 'テストビル101', addressKana: 'トウキョウトシンジュククニシシンジュク1-1-1',
    phone1: '03', phone2: '1234', phone3: '5678',
  };
  const corporateData: ContractorInfoData = {
    ...personalData,
    contractType: '2', corporateName: 'テスト株式会社', corporateNameKana: 'テストカブシキガイシャ', positionName: '社長',
  };

  it('見出し「④ ご契約者様の情報」が表示されること', () => {
    render(<ContractorInfoConfirmationSection data={personalData} />);
    expect(screen.getByRole('heading', { name: /④ ご契約者様の情報/ })).toBeInTheDocument();
  });

  it('個人選択時に契約種別が「個人」と表示されること', () => {
    render(<ContractorInfoConfirmationSection data={personalData} />);
    expect(screen.getByText('個人')).toBeInTheDocument();
  });

  it('個人選択時に法人フィールドが表示されないこと', () => {
    render(<ContractorInfoConfirmationSection data={personalData} />);
    expect(screen.queryByText('法人名')).not.toBeInTheDocument();
  });

  it('法人選択時に法人名が表示されること', () => {
    render(<ContractorInfoConfirmationSection data={corporateData} />);
    expect(screen.getByText('テスト株式会社')).toBeInTheDocument();
    expect(screen.getByText('テストカブシキガイシャ')).toBeInTheDocument();
    expect(screen.getByText('社長')).toBeInTheDocument();
  });

  it('法人選択時に氏名ラベルが「役職者氏名」となること', () => {
    render(<ContractorInfoConfirmationSection data={corporateData} />);
    expect(screen.getByText('役職者氏名')).toBeInTheDocument();
  });

  it('生年月日がスラッシュ区切りで表示されること', () => {
    render(<ContractorInfoConfirmationSection data={personalData} />);
    expect(screen.getByText('1980/01/15')).toBeInTheDocument();
  });

  it('電話番号がハイフン区切りで表示されること', () => {
    render(<ContractorInfoConfirmationSection data={personalData} />);
    expect(screen.getByText('03-1234-5678')).toBeInTheDocument();
  });

  it('性別が表示ラベルに変換されること', () => {
    render(<ContractorInfoConfirmationSection data={personalData} />);
    expect(screen.getByText('男性')).toBeInTheDocument();
  });
});
```

- [x] 6.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ContractorInfoConfirmationSection.test.tsx`
期待結果：FAIL — ContractorInfoConfirmationSectionが存在しない

- [x] 6.3 **最小実装を書く**
```typescript
// src/components/confirmation/ContractorInfoConfirmationSection.tsx
import type { ContractorInfoData } from '../application/ContractorInfoSection';

interface ContractorInfoConfirmationSectionProps {
  data: ContractorInfoData;
}

const contractTypeLabels: Record<string, string> = { '1': '個人', '2': '法人' };
const sexLabels: Record<string, string> = { '1': '男性', '2': '女性' };

function ConfirmationRow({ label, value }: { label: string; value: string }) {
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

export function ContractorInfoConfirmationSection({ data }: ContractorInfoConfirmationSectionProps) {
  const isCorporate = data.contractType === '2';
  const nameLabel = isCorporate ? '役職者氏名' : '契約者氏名';
  const nameKanaLabel = isCorporate ? '役職者氏名カナ' : '契約者氏名カナ';
  const birthDate = [data.birthYear, data.birthMonth, data.birthDay].filter(Boolean).join('/');
  const phone = [data.phone1, data.phone2, data.phone3].filter(Boolean).join('-');

  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ④ ご契約者様の情報
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <ConfirmationRow label="契約種別" value={contractTypeLabels[data.contractType] ?? ''} />
            {isCorporate && (
              <>
                <ConfirmationRow label="法人名" value={data.corporateName} />
                <ConfirmationRow label="法人名カナ" value={data.corporateNameKana} />
                <ConfirmationRow label="役職名" value={data.positionName} />
              </>
            )}
            <ConfirmationRow label={nameLabel} value={data.name} />
            <ConfirmationRow label={nameKanaLabel} value={data.nameKana} />
            {!isCorporate && (
              <>
                <ConfirmationRow label="性別" value={sexLabels[data.sex] ?? ''} />
                <ConfirmationRow label="生年月日" value={birthDate} />
              </>
            )}
            <ConfirmationRow label="郵便番号" value={data.postalCode} />
            <ConfirmationRow label="住所" value={data.address} />
            <ConfirmationRow label="建物名・部屋番号" value={data.buildingName} />
            <ConfirmationRow label="住所フリガナ" value={data.addressKana} />
            <ConfirmationRow label="電話番号" value={phone} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [x] 6.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ContractorInfoConfirmationSection.test.tsx`
期待結果：PASS

- [x] 6.5 **コミット**
```bash
git add src/components/confirmation/ContractorInfoConfirmationSection.tsx src/__tests__/ContractorInfoConfirmationSection.test.tsx
git commit -m "feat: add ContractorInfoConfirmationSection component"
```

---

### タスク 7：ResidenceLocationConfirmationSection コンポーネント

**関連ファイル：**
- 新規：src/components/confirmation/ResidenceLocationConfirmationSection.tsx
- テスト：src/__tests__/ResidenceLocationConfirmationSection.test.tsx

- [x] 7.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResidenceLocationConfirmationSection } from '../components/confirmation/ResidenceLocationConfirmationSection';
import type { ResidenceLocationData } from '../components/application/ResidenceLocationSection';

describe('ResidenceLocationConfirmationSection コンポーネント', () => {
  const data: ResidenceLocationData = {
    postalCode: '100-0001',
    address: '東京都千代田区千代田1-1',
    buildingName: '皇居',
    addressKana: 'トウキョウトチヨダクチヨダ1-1',
  };

  it('見出し「⑤ 住居の所在地」が表示されること', () => {
    render(<ResidenceLocationConfirmationSection data={data} />);
    expect(screen.getByRole('heading', { name: /⑤ 住居の所在地/ })).toBeInTheDocument();
  });

  it('郵便番号が表示されること', () => {
    render(<ResidenceLocationConfirmationSection data={data} />);
    expect(screen.getByText('100-0001')).toBeInTheDocument();
  });

  it('住所が表示されること', () => {
    render(<ResidenceLocationConfirmationSection data={data} />);
    expect(screen.getByText('東京都千代田区千代田1-1')).toBeInTheDocument();
  });

  it('建物名・部屋番号が表示されること', () => {
    render(<ResidenceLocationConfirmationSection data={data} />);
    expect(screen.getByText('皇居')).toBeInTheDocument();
  });

  it('住所フリガナが表示されること', () => {
    render(<ResidenceLocationConfirmationSection data={data} />);
    expect(screen.getByText('トウキョウトチヨダクチヨダ1-1')).toBeInTheDocument();
  });

  it('postalCodeが空文字の場合もエラーにならないこと', () => {
    render(<ResidenceLocationConfirmationSection data={{ ...data, postalCode: '' }} />);
    expect(screen.getByText('郵便番号')).toBeInTheDocument();
  });
});
```

- [x] 7.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ResidenceLocationConfirmationSection.test.tsx`
期待結果：FAIL — ResidenceLocationConfirmationSectionが存在しない

- [x] 7.3 **最小実装を書く**
```typescript
// src/components/confirmation/ResidenceLocationConfirmationSection.tsx
import type { ResidenceLocationData } from '../application/ResidenceLocationSection';

interface ResidenceLocationConfirmationSectionProps {
  data: ResidenceLocationData;
}

function ConfirmationRow({ label, value }: { label: string; value: string }) {
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

export function ResidenceLocationConfirmationSection({ data }: ResidenceLocationConfirmationSectionProps) {
  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ⑤ 住居の所在地
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <ConfirmationRow label="郵便番号" value={data.postalCode} />
            <ConfirmationRow label="住所" value={data.address} />
            <ConfirmationRow label="建物名・部屋番号" value={data.buildingName} />
            <ConfirmationRow label="住所フリガナ" value={data.addressKana} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [x] 7.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ResidenceLocationConfirmationSection.test.tsx`
期待結果：PASS

- [x] 7.5 **コミット**
```bash
git add src/components/confirmation/ResidenceLocationConfirmationSection.tsx src/__tests__/ResidenceLocationConfirmationSection.test.tsx
git commit -m "feat: add ResidenceLocationConfirmationSection component"
```

---

### タスク 8：PrimaryResidentConfirmationSection コンポーネント

**関連ファイル：**
- 新規：src/components/confirmation/PrimaryResidentConfirmationSection.tsx
- テスト：src/__tests__/PrimaryResidentConfirmationSection.test.tsx

- [x] 8.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PrimaryResidentConfirmationSection } from '../components/confirmation/PrimaryResidentConfirmationSection';
import type { PrimaryResidentData } from '../components/application/PrimaryResidentSection';

describe('PrimaryResidentConfirmationSection コンポーネント', () => {
  const sameData: PrimaryResidentData = {
    residentType: '0', name: '', nameKana: '', sex: '1',
    birthYear: '', birthMonth: '', birthDay: '',
    relationship: '', relationshipNote: '',
    phone1: '', phone2: '', phone3: '',
  };
  const differentData: PrimaryResidentData = {
    residentType: '1', name: '鈴木花子', nameKana: 'スズキハナコ', sex: '2',
    birthYear: '1985', birthMonth: '03', birthDay: '20',
    relationship: '1', relationshipNote: '',
    phone1: '090', phone2: '1234', phone3: '5678',
  };
  const otherRelationData: PrimaryResidentData = {
    ...differentData,
    relationship: '8', relationshipNote: '従兄弟',
  };

  it('見出し「⑥ 主たる居住者」が表示されること', () => {
    render(<PrimaryResidentConfirmationSection data={sameData} />);
    expect(screen.getByRole('heading', { name: /⑥ 主たる居住者/ })).toBeInTheDocument();
  });

  it('契約者と同じ場合に区分が表示されること', () => {
    render(<PrimaryResidentConfirmationSection data={sameData} />);
    expect(screen.getByText('契約者と同じ')).toBeInTheDocument();
  });

  it('契約者と同じ場合に詳細フィールドが表示されないこと', () => {
    render(<PrimaryResidentConfirmationSection data={sameData} />);
    expect(screen.queryByText('主居住者氏名')).not.toBeInTheDocument();
  });

  it('契約者と異なる場合に氏名が表示されること', () => {
    render(<PrimaryResidentConfirmationSection data={differentData} />);
    expect(screen.getByText('鈴木花子')).toBeInTheDocument();
  });

  it('続柄が表示ラベルに変換されること', () => {
    render(<PrimaryResidentConfirmationSection data={differentData} />);
    expect(screen.getByText('配偶者')).toBeInTheDocument();
  });

  it('続柄が「その他」の場合に備考が表示されること', () => {
    render(<PrimaryResidentConfirmationSection data={otherRelationData} />);
    expect(screen.getByText('その他')).toBeInTheDocument();
    expect(screen.getByText('従兄弟')).toBeInTheDocument();
  });

  it('性別が表示ラベルに変換されること', () => {
    render(<PrimaryResidentConfirmationSection data={differentData} />);
    expect(screen.getByText('女性')).toBeInTheDocument();
  });

  it('電話番号がハイフン区切りで表示されること', () => {
    render(<PrimaryResidentConfirmationSection data={differentData} />);
    expect(screen.getByText('090-1234-5678')).toBeInTheDocument();
  });
});
```

- [x] 8.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/PrimaryResidentConfirmationSection.test.tsx`
期待結果：FAIL — PrimaryResidentConfirmationSectionが存在しない

- [x] 8.3 **最小実装を書く**
```typescript
// src/components/confirmation/PrimaryResidentConfirmationSection.tsx
import type { PrimaryResidentData } from '../application/PrimaryResidentSection';

interface PrimaryResidentConfirmationSectionProps {
  data: PrimaryResidentData;
}

const residentTypeLabels: Record<string, string> = { '0': '契約者と同じ', '1': '契約者と異なる' };
const sexLabels: Record<string, string> = { '1': '男性', '2': '女性' };
const relationshipLabels: Record<string, string> = {
  '1': '配偶者', '2': '親', '3': '子', '4': '兄弟姉妹',
  '5': '祖父母', '6': '孫', '7': 'おじ・おば', '8': 'その他',
};

function ConfirmationRow({ label, value }: { label: string; value: string }) {
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

export function PrimaryResidentConfirmationSection({ data }: PrimaryResidentConfirmationSectionProps) {
  const isDifferent = data.residentType === '1';
  const birthDate = [data.birthYear, data.birthMonth, data.birthDay].filter(Boolean).join('/');
  const phone = [data.phone1, data.phone2, data.phone3].filter(Boolean).join('-');

  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ⑥ 主たる居住者
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <ConfirmationRow label="区分" value={residentTypeLabels[data.residentType] ?? ''} />
            {isDifferent && (
              <>
                <ConfirmationRow label="主居住者氏名" value={data.name} />
                <ConfirmationRow label="主居住者氏名カナ" value={data.nameKana} />
                <ConfirmationRow label="性別" value={sexLabels[data.sex] ?? ''} />
                <ConfirmationRow label="生年月日" value={birthDate} />
                <ConfirmationRow label="契約者との続柄" value={relationshipLabels[data.relationship] ?? ''} />
                {data.relationship === '8' && (
                  <ConfirmationRow label="続柄（備考）" value={data.relationshipNote} />
                )}
                <ConfirmationRow label="電話番号" value={phone} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [x] 8.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/PrimaryResidentConfirmationSection.test.tsx`
期待結果：PASS

- [x] 8.5 **コミット**
```bash
git add src/components/confirmation/PrimaryResidentConfirmationSection.tsx src/__tests__/PrimaryResidentConfirmationSection.test.tsx
git commit -m "feat: add PrimaryResidentConfirmationSection component"
```

---

### タスク 9：CoResidentConfirmationSection コンポーネント

**関連ファイル：**
- 新規：src/components/confirmation/CoResidentConfirmationSection.tsx
- テスト：src/__tests__/CoResidentConfirmationSection.test.tsx

- [x] 9.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CoResidentConfirmationSection } from '../components/confirmation/CoResidentConfirmationSection';
import type { CoResidentData } from '../components/application/CoResidentSection';

describe('CoResidentConfirmationSection コンポーネント', () => {
  const noResidentData: CoResidentData = { hasCoResident: false, residents: [] };
  const withResidentData: CoResidentData = {
    hasCoResident: true,
    residents: [
      { name: '山田花子', nameKana: 'ヤマダハナコ', sex: '2', birthYear: '1985', birthMonth: '03', birthDay: '20', relationship: '1', relationshipNote: '' },
    ],
  };
  const withOtherRelationData: CoResidentData = {
    hasCoResident: true,
    residents: [
      { name: '山田次郎', nameKana: 'ヤマダジロウ', sex: '1', birthYear: '1990', birthMonth: '06', birthDay: '10', relationship: '8', relationshipNote: '従兄弟' },
    ],
  };
  const emptyResidentsData: CoResidentData = { hasCoResident: true, residents: [] };

  it('見出し「⑦ 同居人の明細」が表示されること', () => {
    render(<CoResidentConfirmationSection data={noResidentData} />);
    expect(screen.getByRole('heading', { name: /⑦ 同居人の明細/ })).toBeInTheDocument();
  });

  it('同居人なしの場合に「なし」と表示されること', () => {
    render(<CoResidentConfirmationSection data={noResidentData} />);
    expect(screen.getByText('なし')).toBeInTheDocument();
  });

  it('同居人ありの場合に「あり」と表示されること', () => {
    render(<CoResidentConfirmationSection data={withResidentData} />);
    expect(screen.getByText('あり')).toBeInTheDocument();
  });

  it('同居人の氏名が表示されること', () => {
    render(<CoResidentConfirmationSection data={withResidentData} />);
    expect(screen.getByText('山田花子')).toBeInTheDocument();
  });

  it('同居人の続柄が表示ラベルに変換されること', () => {
    render(<CoResidentConfirmationSection data={withResidentData} />);
    expect(screen.getByText('配偶者')).toBeInTheDocument();
  });

  it('同居人の続柄が「その他」の場合に備考が表示されること', () => {
    render(<CoResidentConfirmationSection data={withOtherRelationData} />);
    expect(screen.getByText('その他')).toBeInTheDocument();
    expect(screen.getByText('従兄弟')).toBeInTheDocument();
  });

  it('hasCoResident=trueでresidentsが空配列の場合もエラーにならないこと', () => {
    render(<CoResidentConfirmationSection data={emptyResidentsData} />);
    expect(screen.getByText('あり')).toBeInTheDocument();
  });
});
```

- [x] 9.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/CoResidentConfirmationSection.test.tsx`
期待結果：FAIL — CoResidentConfirmationSectionが存在しない

- [x] 9.3 **最小実装を書く**
```typescript
// src/components/confirmation/CoResidentConfirmationSection.tsx
import type { CoResidentData } from '../application/CoResidentSection';

interface CoResidentConfirmationSectionProps {
  data: CoResidentData;
}

const sexLabels: Record<string, string> = { '1': '男性', '2': '女性' };
const relationshipLabels: Record<string, string> = {
  '1': '配偶者', '2': '親', '3': '子', '4': '兄弟姉妹',
  '5': '祖父母', '6': '孫', '7': 'おじ・おば', '8': 'その他',
};

function ConfirmationRow({ label, value }: { label: string; value: string }) {
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

export function CoResidentConfirmationSection({ data }: CoResidentConfirmationSectionProps) {
  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ⑦ 同居人の明細
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <ConfirmationRow label="同居人の有無" value={data.hasCoResident ? 'あり' : 'なし'} />
            {data.hasCoResident && data.residents.map((resident, index) => {
              const birthDate = [resident.birthYear, resident.birthMonth, resident.birthDay].filter(Boolean).join('/');
              return (
                <div key={index}>
                  <div className="text-sm font-bold text-text-primary mt-3 mb-1">
                    同居人{index + 1}
                  </div>
                  <ConfirmationRow label="氏名" value={resident.name} />
                  <ConfirmationRow label="氏名カナ" value={resident.nameKana} />
                  <ConfirmationRow label="性別" value={sexLabels[resident.sex] ?? ''} />
                  <ConfirmationRow label="生年月日" value={birthDate} />
                  <ConfirmationRow label="契約者との続柄" value={relationshipLabels[resident.relationship] ?? ''} />
                  {resident.relationship === '8' && (
                    <ConfirmationRow label="続柄（備考）" value={resident.relationshipNote} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [x] 9.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/CoResidentConfirmationSection.test.tsx`
期待結果：PASS

- [x] 9.5 **コミット**
```bash
git add src/components/confirmation/CoResidentConfirmationSection.tsx src/__tests__/CoResidentConfirmationSection.test.tsx
git commit -m "feat: add CoResidentConfirmationSection component"
```

---

### タスク 10：ApplicationConfirmationPage とルーティング追加

**関連ファイル：**
- 新規：src/app/views/ApplicationConfirmationPage.tsx
- 修正：src/router/index.tsx
- テスト：src/__tests__/ApplicationConfirmationPage.test.tsx
- テスト：src/__tests__/routing.test.tsx

- [x] 10.1 **失敗するテストを書く** — ApplicationConfirmationPage
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useApplicationFormStore } from '../store/applicationFormStore';
import ApplicationConfirmationPage from '../app/views/ApplicationConfirmationPage';

const filledState = {
  contractDate: '2026/07/01',
  contractCourse: { insurancePeriod: '1', paymentMethod: '5', product: 'K008', planType: '1Y8C' },
  housingOverview: { structure: '1', housingType: '2', totalFloors: '5', residentFloor: '3' },
  contractorInfo: {
    contractType: '1', corporateName: '', corporateNameKana: '', positionName: '',
    name: '山田太郎', nameKana: 'ヤマダタロウ', sex: '1', birthYear: '1980', birthMonth: '01', birthDay: '15',
    postalCode: '123-4567', address: '東京都新宿区西新宿1-1', buildingName: '', addressKana: 'トウキョウト',
    phone1: '03', phone2: '1234', phone3: '5678',
  },
  residenceLocation: { postalCode: '123-4567', address: '東京都新宿区西新宿1-1', buildingName: '', addressKana: 'トウキョウト' },
  primaryResident: { residentType: '0', name: '', nameKana: '', sex: '1', birthYear: '', birthMonth: '', birthDay: '', relationship: '', relationshipNote: '', phone1: '', phone2: '', phone3: '' },
  coResident: { hasCoResident: false, residents: [] },
};

describe('ApplicationConfirmationPage', () => {
  beforeEach(() => {
    useApplicationFormStore.setState(filledState);
  });

  it('ステップナビゲーションのステップ4が表示されること', () => {
    render(<BrowserRouter><ApplicationConfirmationPage /></BrowserRouter>);
    expect(screen.getByText('④申込内容確認')).toBeInTheDocument();
  });

  it('全7セクションの見出しが表示されること', () => {
    render(<BrowserRouter><ApplicationConfirmationPage /></BrowserRouter>);
    expect(screen.getByRole('heading', { name: /① 契約希望日/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /② ご契約コース/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /③ 住居の概要/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /④ ご契約者様の情報/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /⑤ 住居の所在地/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /⑥ 主たる居住者/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /⑦ 同居人の明細/ })).toBeInTheDocument();
  });

  it('Q&Aサイドバーが表示されること', () => {
    render(<BrowserRouter><ApplicationConfirmationPage /></BrowserRouter>);
    expect(screen.getByText('よくある質問')).toBeInTheDocument();
  });

  it('戻るボタンと次へボタンが表示されること', () => {
    render(<BrowserRouter><ApplicationConfirmationPage /></BrowserRouter>);
    expect(screen.getByRole('button', { name: /戻る/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /次へ/ })).toBeInTheDocument();
  });
});
```

- [x] 10.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ApplicationConfirmationPage.test.tsx`
期待結果：FAIL — ApplicationConfirmationPageが存在しない

- [x] 10.3 **最小実装を書く**
```typescript
// src/app/views/ApplicationConfirmationPage.tsx
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepNavigation } from '../../components/layout/StepNavigation';
import { QASidebar } from '../../components/home/QASidebar';
import { ScrollTopButton } from '../../components/ui/ScrollTopButton';
import { NavigationButtons } from '../../components/application/NavigationButtons';
import { ContractDateConfirmationSection } from '../../components/confirmation/ContractDateConfirmationSection';
import { ContractCourseConfirmationSection } from '../../components/confirmation/ContractCourseConfirmationSection';
import { HousingOverviewConfirmationSection } from '../../components/confirmation/HousingOverviewConfirmationSection';
import { ContractorInfoConfirmationSection } from '../../components/confirmation/ContractorInfoConfirmationSection';
import { ResidenceLocationConfirmationSection } from '../../components/confirmation/ResidenceLocationConfirmationSection';
import { PrimaryResidentConfirmationSection } from '../../components/confirmation/PrimaryResidentConfirmationSection';
import { CoResidentConfirmationSection } from '../../components/confirmation/CoResidentConfirmationSection';
import { useApplicationFormStore } from '../../store/applicationFormStore';

const qaItems = [
  { question: '保険の開始はいつからですか？', answer: 'お申し込み画面にてお客さまがご入力された契約希望日から補償が開始されます。' },
  { question: 'インターネットで申込みをしても保険証券・約款は届きますか？', answer: '保険証券はお送りしておりません。ご契約時に登録頂いたメールアドレスに「マイページ」開設の案内をお送りします。' },
  { question: '保険金額をどのように決めたら良いですか？', answer: '全ての家財の再調達価額（全て買い揃えた場合に必要な概算額）を基準に決定します。' },
];

function ApplicationConfirmationPage() {
  const navigate = useNavigate();
  const store = useApplicationFormStore();

  const handleBack = useCallback(() => {
    navigate('/application-input');
  }, [navigate]);

  const handleNext = useCallback(() => {
    console.log('ApplicationConfirmationPage: next clicked — submit application');
  }, []);

  return (
    <div className="bg-white font-sans">
      <StepNavigation currentStep={4} />

      <main className="px-4 py-4">
        <div className="flex flex-col gap-4 min-[875px]:flex-row">
          <div className="w-full min-[875px]:w-[800px]">
            <ContractDateConfirmationSection date={store.contractDate} />
            <ContractCourseConfirmationSection data={store.contractCourse} />
            <HousingOverviewConfirmationSection data={store.housingOverview} />
            <ContractorInfoConfirmationSection data={store.contractorInfo} />
            <ResidenceLocationConfirmationSection data={store.residenceLocation} />
            <PrimaryResidentConfirmationSection data={store.primaryResident} />
            <CoResidentConfirmationSection data={store.coResident} />
            <NavigationButtons canProceed={true} onBack={handleBack} onNext={handleNext} />
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

export default ApplicationConfirmationPage;
```

```typescript
// src/router/index.tsx — ルート追加
import ApplicationConfirmationPage from '../app/views/ApplicationConfirmationPage';
// Routes内に追加：
<Route path="/application-confirmation" element={<ApplicationConfirmationPage />} />
```

- [x] 10.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ApplicationConfirmationPage.test.tsx`
期待結果：PASS

- [x] 10.5 **コミット**
```bash
git add src/app/views/ApplicationConfirmationPage.tsx src/router/index.tsx src/__tests__/ApplicationConfirmationPage.test.tsx
git commit -m "feat: add ApplicationConfirmationPage with routing"
```

---

### タスク 11：全テスト実行と最終確認

**関連ファイル：**
- テスト：src/__tests__/routing.test.tsx

- [x] 11.1 **ルーティングテストに/application-confirmationのテストを追加**
```typescript
// src/__tests__/routing.test.tsx に追加
it('/application-confirmationでApplicationConfirmationPageが表示されること', () => {
  render(
    <MemoryRouter initialEntries={['/application-confirmation']}>
      <AppRoutes />
    </MemoryRouter>,
  );
  expect(screen.getByText('④申込内容確認')).toBeInTheDocument();
});
```

- [x] 11.2 **全テストを実行**
コマンド：`npx vitest run`
期待結果：PASS — 全テストが成功すること

- [x] 11.3 **コミット**
```bash
git add src/__tests__/routing.test.tsx
git commit -m "test: add application-confirmation route test and verify all tests pass"
```

---

### タスク 12：確認セクションのラベル幅・値幅を申込入力画面と統一

**関連ファイル：**
- 修正：src/components/confirmation/ContractDateConfirmationSection.tsx
- 修正：src/components/confirmation/ContractCourseConfirmationSection.tsx
- 修正：src/components/confirmation/HousingOverviewConfirmationSection.tsx
- 修正：src/components/confirmation/ContractorInfoConfirmationSection.tsx
- 修正：src/components/confirmation/ResidenceLocationConfirmationSection.tsx
- 修正：src/components/confirmation/PrimaryResidentConfirmationSection.tsx
- 修正：src/components/confirmation/CoResidentConfirmationSection.tsx
- テスト：src/__tests__/*.test.tsx（既存テストの再確認）

- [x] 12.1 **全確認セクションのConfirmationRowレイアウトを申込入力画面のFormRowと統一**

各確認セクションのConfirmationRow（およびContractDateConfirmationSectionの直接マークアップ）を以下のように変更する：

**変更前（inline-flex レイアウト）：**
```html
<div className="inline-flex w-full max-w-[600px] mt-2 first:mt-0">
  <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
    {label}
  </div>
  <div className="border border-l-0 border-border bg-input-bg px-3 py-2 flex-1 text-base text-text-primary">
    {value}
  </div>
</div>
```

**変更後（grid レイアウト — 申込入力画面のFormRowと同じ grid-cols-[260px_1fr]）：**
```html
<div className="grid grid-cols-[260px_1fr] w-full mt-2 first:mt-0">
  <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary whitespace-nowrap flex items-center">
    {label}
  </div>
  <div className="border border-l-0 border-border bg-input-bg px-3 py-2 text-base text-text-primary">
    {value}
  </div>
</div>
```

主な変更点：
- `inline-flex w-full max-w-[600px]` → `grid grid-cols-[260px_1fr] w-full`
- 値側から `flex-1` を削除（gridレイアウトで自動的に1frが適用される）

対象ファイル（7ファイル）：
1. ContractDateConfirmationSection.tsx — 直接マークアップを変更
2. ContractCourseConfirmationSection.tsx — ConfirmationRowを変更
3. HousingOverviewConfirmationSection.tsx — ConfirmationRowを変更
4. ContractorInfoConfirmationSection.tsx — ConfirmationRowを変更
5. ResidenceLocationConfirmationSection.tsx — ConfirmationRowを変更
6. PrimaryResidentConfirmationSection.tsx — ConfirmationRowを変更
7. CoResidentConfirmationSection.tsx — ConfirmationRowを変更

- [x] 12.2 **全テストを実行**
コマンド：`npx vitest run`
期待結果：PASS — 全テストが成功すること（レイアウト変更はテストの表示テキストに影響しないため）

- [ ] 12.3 **コミット**
```bash
git add src/components/confirmation/
git commit -m "fix: align confirmation section label/value widths with input page FormRow layout"
```
