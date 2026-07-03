### タスク 1：ConfirmationRowコンポーネントの作成（TDD）

**関連ファイル：**
- 新規：src/components/confirmation/ConfirmationRow.tsx
- テスト：src/__tests__/ConfirmationRow.test.tsx

- [x] 1.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConfirmationRow } from '../components/confirmation/ConfirmationRow';

describe('ConfirmationRow コンポーネント', () => {
  it('ラベルと値が表示されること', () => {
    render(<ConfirmationRow label="契約種別" value="個人" />);
    expect(screen.getByText('契約種別')).toBeInTheDocument();
    expect(screen.getByText('個人')).toBeInTheDocument();
  });

  it('モバイル表示で1カラムの縦スタックレイアウトが適用されること', () => {
    const { container } = render(<ConfirmationRow label="契約種別" value="個人" />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain('grid-cols-1');
  });

  it('デスクトップ表示で2カラムレイアウトが適用されること', () => {
    const { container } = render(<ConfirmationRow label="契約種別" value="個人" />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain('min-[875px]:grid-cols-[260px_1fr]');
  });

  it('値セルにモバイル用ボーダークラスが適用されること', () => {
    const { container } = render(<ConfirmationRow label="契約種別" value="個人" />);
    const valueCell = container.querySelector('.bg-input-bg') as HTMLElement;
    expect(valueCell.className).toContain('border-t-0');
    expect(valueCell.className).toContain('min-[875px]:border-t');
    expect(valueCell.className).toContain('min-[875px]:border-l-0');
  });

  it('ラベルが空文字でもレイアウトが崩れないこと', () => {
    const { container } = render(<ConfirmationRow label="" value="個人" />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain('grid-cols-1');
  });

  it('値が空文字でもレイアウトが崩れないこと', () => {
    const { container } = render(<ConfirmationRow label="契約種別" value="" />);
    const grid = container.firstChild as HTMLElement;
    expect(grid.className).toContain('grid-cols-1');
  });
});
```

- [x] 1.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ConfirmationRow.test.tsx`
期待結果：FAIL — Cannot find module '../components/confirmation/ConfirmationRow'

- [x] 1.3 **最小実装を書く**
```typescript
interface ConfirmationRowProps {
  label: string;
  value: string;
}

export function ConfirmationRow({ label, value }: ConfirmationRowProps) {
  return (
    <div className="grid grid-cols-1 min-[875px]:grid-cols-[260px_1fr] w-full mt-2 first:mt-0">
      <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary flex items-center min-[875px]:whitespace-nowrap">
        {label}
      </div>
      <div className="border border-border bg-input-bg px-3 py-2 border-t-0 min-[875px]:border-t min-[875px]:border-l-0 text-base text-text-primary">
        {value}
      </div>
    </div>
  );
}
```

- [x] 1.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ConfirmationRow.test.tsx`
期待結果：PASS

- [x] 1.5 **コミット**
```bash
git add src/components/confirmation/ConfirmationRow.tsx src/__tests__/ConfirmationRow.test.tsx
git commit -m "feat: add ConfirmationRow component with responsive layout"
```

### タスク 2：ContractDateConfirmationSectionの移行

**関連ファイル：**
- 修正：src/components/confirmation/ContractDateConfirmationSection.tsx
- テスト：src/__tests__/ContractDateConfirmationSection.test.tsx

- [x] 2.1 **失敗するテストを書く**
```typescript
// 既存テストファイルに追加
it('ConfirmationRowコンポーネントを使用していること', () => {
  const { container } = render(<ContractDateConfirmationSection date="2026/07/01" />);
  const grids = container.querySelectorAll('.grid');
  const mainGrid = grids[0];
  expect(mainGrid.className).toContain('grid-cols-1');
  expect(mainGrid.className).toContain('min-[875px]:grid-cols-[260px_1fr]');
});
```

- [x] 2.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ContractDateConfirmationSection.test.tsx`
期待結果：FAIL — grid-cols-1クラスが見つからない

- [x] 2.3 **実装を修正**
```typescript
import { ConfirmationRow } from './ConfirmationRow';

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
            <ConfirmationRow label="契約希望日" value={date} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [x] 2.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ContractDateConfirmationSection.test.tsx`
期待結果：PASS

- [x] 2.5 **コミット**
```bash
git add src/components/confirmation/ContractDateConfirmationSection.tsx src/__tests__/ContractDateConfirmationSection.test.tsx
git commit -m "feat: migrate ContractDateConfirmationSection to ConfirmationRow"
```

### タスク 3：ContractCourseConfirmationSectionの移行

**関連ファイル：**
- 修正：src/components/confirmation/ContractCourseConfirmationSection.tsx
- テスト：src/__tests__/ContractCourseConfirmationSection.test.tsx

- [x] 3.1 **失敗するテストを書く**
```typescript
// 既存テストファイルに追加
it('ConfirmationRowコンポーネントを使用していること', () => {
  const { container } = render(
    <ContractCourseConfirmationSection data={{
      insurancePeriod: '1', paymentMethod: '年払い', product: 'ファミリー',
      planType: 'スタンダード', insurancePremium: '12000', insurancePremiumType: '火災',
    }} />
  );
  const grids = container.querySelectorAll('.grid');
  const firstRowGrid = grids[0];
  expect(firstRowGrid.className).toContain('grid-cols-1');
  expect(firstRowGrid.className).toContain('min-[875px]:grid-cols-[260px_1fr]');
});
```

- [x] 3.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ContractCourseConfirmationSection.test.tsx`
期待結果：FAIL — grid-cols-1クラスが見つからない

- [x] 3.3 **実装を修正**
ContractCourseConfirmationSection内のローカルConfirmationRow定義を削除し、共通ConfirmationRowをインポートする。ConfirmationRowの使用箇所では`label`と`value`プロパティを渡すよう変更する。`mt-2 first:mt-0`はConfirmationRow側に含まれるため、呼び出し側から削除する。

```typescript
import { ConfirmationRow } from './ConfirmationRow';
// ローカルConfirmationRow関数を削除
// <ConfirmationRow label="..." value="..." /> の形式に統一
```

- [x] 3.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ContractCourseConfirmationSection.test.tsx`
期待結果：PASS

- [x] 3.5 **コミット**
```bash
git add src/components/confirmation/ContractCourseConfirmationSection.tsx src/__tests__/ContractCourseConfirmationSection.test.tsx
git commit -m "feat: migrate ContractCourseConfirmationSection to ConfirmationRow"
```

### タスク 4：HousingOverviewConfirmationSectionの移行

**関連ファイル：**
- 修正：src/components/confirmation/HousingOverviewConfirmationSection.tsx
- テスト：src/__tests__/HousingOverviewConfirmationSection.test.tsx

- [x] 4.1 **失敗するテストを書く**
```typescript
// 既存テストファイルに追加
it('ConfirmationRowコンポーネントを使用していること', () => {
  const { container } = render(
    <HousingOverviewConfirmationSection data={{
      structure: '1', housingType: '2', totalFloors: '3', floorNumber: '1', housingRemark: '',
    }} />
  );
  const grids = container.querySelectorAll('.grid');
  const firstRowGrid = grids[0];
  expect(firstRowGrid.className).toContain('grid-cols-1');
  expect(firstRowGrid.className).toContain('min-[875px]:grid-cols-[260px_1fr]');
});
```

- [x] 4.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/HousingOverviewConfirmationSection.test.tsx`
期待結果：FAIL — grid-cols-1クラスが見つからない

- [x] 4.3 **実装を修正**
ローカルConfirmationRowを削除し、共通ConfirmationRowをインポートする。

- [x] 4.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/HousingOverviewConfirmationSection.test.tsx`
期待結果：PASS

- [x] 4.5 **コミット**
```bash
git add src/components/confirmation/HousingOverviewConfirmationSection.tsx src/__tests__/HousingOverviewConfirmationSection.test.tsx
git commit -m "feat: migrate HousingOverviewConfirmationSection to ConfirmationRow"
```

### タスク 5：ContractorInfoConfirmationSectionの移行

**関連ファイル：**
- 修正：src/components/confirmation/ContractorInfoConfirmationSection.tsx
- テスト：src/__tests__/ContractorInfoConfirmationSection.test.tsx

- [x] 5.1 **失敗するテストを書く**
```typescript
// 既存テストファイルに追加
it('ConfirmationRowコンポーネントを使用していること', () => {
  const { container } = render(<ContractorInfoConfirmationSection data={personalData} />);
  const grids = container.querySelectorAll('.grid');
  const firstRowGrid = grids[0];
  expect(firstRowGrid.className).toContain('grid-cols-1');
  expect(firstRowGrid.className).toContain('min-[875px]:grid-cols-[260px_1fr]');
});
```

- [x] 5.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ContractorInfoConfirmationSection.test.tsx`
期待結果：FAIL — grid-cols-1クラスが見つからない

- [x] 5.3 **実装を修正**
ローカルConfirmationRowを削除し、共通ConfirmationRowをインポートする。

- [x] 5.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ContractorInfoConfirmationSection.test.tsx`
期待結果：PASS

- [x] 5.5 **コミット**
```bash
git add src/components/confirmation/ContractorInfoConfirmationSection.tsx src/__tests__/ContractorInfoConfirmationSection.test.tsx
git commit -m "feat: migrate ContractorInfoConfirmationSection to ConfirmationRow"
```

### タスク 6：ResidenceLocationConfirmationSectionの移行

**関連ファイル：**
- 修正：src/components/confirmation/ResidenceLocationConfirmationSection.tsx
- テスト：src/__tests__/ResidenceLocationConfirmationSection.test.tsx

- [x] 6.1 **失敗するテストを書く**
```typescript
// 既存テストファイルに追加
it('ConfirmationRowコンポーネントを使用していること', () => {
  const { container } = render(
    <ResidenceLocationConfirmationSection data={{
      postalCode: '123-4567', address: 'テスト', buildingName: '', addressKana: '',
    }} />
  );
  const grids = container.querySelectorAll('.grid');
  const firstRowGrid = grids[0];
  expect(firstRowGrid.className).toContain('grid-cols-1');
  expect(firstRowGrid.className).toContain('min-[875px]:grid-cols-[260px_1fr]');
});
```

- [x] 6.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ResidenceLocationConfirmationSection.test.tsx`
期待結果：FAIL — grid-cols-1クラスが見つからない

- [x] 6.3 **実装を修正**
ローカルConfirmationRowを削除し、共通ConfirmationRowをインポートする。

- [x] 6.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ResidenceLocationConfirmationSection.test.tsx`
期待結果：PASS

- [x] 6.5 **コミット**
```bash
git add src/components/confirmation/ResidenceLocationConfirmationSection.tsx src/__tests__/ResidenceLocationConfirmationSection.test.tsx
git commit -m "feat: migrate ResidenceLocationConfirmationSection to ConfirmationRow"
```

### タスク 7：PrimaryResidentConfirmationSectionの移行

**関連ファイル：**
- 修正：src/components/confirmation/PrimaryResidentConfirmationSection.tsx
- テスト：src/__tests__/PrimaryResidentConfirmationSection.test.tsx

- [x] 7.1 **失敗するテストを書く**
```typescript
// 既存テストファイルに追加
it('ConfirmationRowコンポーネントを使用していること', () => {
  const { container } = render(
    <PrimaryResidentConfirmationSection data={{
      residentType: '1', name: 'テスト', nameKana: 'テスト', sex: '1',
      birthYear: '1980', birthMonth: '01', birthDay: '15', relationship: '1', relationshipNote: '',
      phone1: '03', phone2: '1234', phone3: '5678',
    }} />
  );
  const grids = container.querySelectorAll('.grid');
  const firstRowGrid = grids[0];
  expect(firstRowGrid.className).toContain('grid-cols-1');
  expect(firstRowGrid.className).toContain('min-[875px]:grid-cols-[260px_1fr]');
});
```

- [x] 7.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/PrimaryResidentConfirmationSection.test.tsx`
期待結果：FAIL — grid-cols-1クラスが見つからない

- [x] 7.3 **実装を修正**
ローカルConfirmationRowを削除し、共通ConfirmationRowをインポートする。

- [x] 7.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/PrimaryResidentConfirmationSection.test.tsx`
期待結果：PASS

- [x] 7.5 **コミット**
```bash
git add src/components/confirmation/PrimaryResidentConfirmationSection.tsx src/__tests__/PrimaryResidentConfirmationSection.test.tsx
git commit -m "feat: migrate PrimaryResidentConfirmationSection to ConfirmationRow"
```

### タスク 8：CoResidentConfirmationSectionの移行

**関連ファイル：**
- 修正：src/components/confirmation/CoResidentConfirmationSection.tsx
- テスト：src/__tests__/CoResidentConfirmationSection.test.tsx

- [x] 8.1 **失敗するテストを書く**
```typescript
// 既存テストファイルに追加
it('ConfirmationRowコンポーネントを使用していること', () => {
  const { container } = render(
    <CoResidentConfirmationSection data={{
      hasCoResident: true,
      residents: [{ name: 'テスト', nameKana: 'テスト', sex: '1', birthYear: '1980', birthMonth: '01', birthDay: '15', relationship: '1', relationshipNote: '' }],
    }} />
  );
  const grids = container.querySelectorAll('.grid');
  const firstRowGrid = grids[0];
  expect(firstRowGrid.className).toContain('grid-cols-1');
  expect(firstRowGrid.className).toContain('min-[875px]:grid-cols-[260px_1fr]');
});
```

- [x] 8.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/CoResidentConfirmationSection.test.tsx`
期待結果：FAIL — grid-cols-1クラスが見つからない

- [x] 8.3 **実装を修正**
ローカルConfirmationRowを削除し、共通ConfirmationRowをインポートする。

- [x] 8.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/CoResidentConfirmationSection.test.tsx`
期待結果：PASS

- [x] 8.5 **コミット**
```bash
git add src/components/confirmation/CoResidentConfirmationSection.tsx src/__tests__/CoResidentConfirmationSection.test.tsx
git commit -m "feat: migrate CoResidentConfirmationSection to ConfirmationRow"
```

### タスク 9：全テストの回帰確認

**関連ファイル：**
- なし（検証のみ）

- [x] 9.1 **全テストを実行**
コマンド：`npx vitest run`
期待結果：PASS — 全テストが成功すること

- [x] 9.2 **コミット**
変更がない場合はコミット不要。テスト修正が含まれる場合はコミットする。
