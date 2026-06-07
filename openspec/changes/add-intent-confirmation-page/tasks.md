### タスク 1：ContractSummarySection コンポーネント

**関連ファイル：**
- 新規：src/components/home/ContractSummarySection.tsx
- テスト：src/__tests__/ContractSummarySection.test.tsx

- [x] 1.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContractSummarySection } from '../components/home/ContractSummarySection';

describe('ContractSummarySection コンポーネント', () => {
  it('アンバー見出し「契約の概要（注意喚起情報）」が表示されること', () => {
    render(<ContractSummarySection onConfirm={vi.fn()} />);
    expect(screen.getByText(/契約の概要（注意喚起情報）/)).toBeInTheDocument();
  });

  it('マゼンタ見出し「契約の概要」が表示されること', () => {
    render(<ContractSummarySection onConfirm={vi.fn()} />);
    const headings = screen.getAllByText('契約の概要');
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it('スクロール可能な領域が表示されること', () => {
    render(<ContractSummarySection onConfirm={vi.fn()} />);
    expect(screen.getByTestId('contract-scroll')).toBeInTheDocument();
  });

  it('初期状態では確認チェックボックスが非活性であること', () => {
    render(<ContractSummarySection onConfirm={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('全文を見るリンクが表示されること', () => {
    render(<ContractSummarySection onConfirm={vi.fn()} />);
    expect(screen.getByText('＞全文を見る')).toBeInTheDocument();
  });

  it('確認チェックボックスのラベルが表示されること', () => {
    render(<ContractSummarySection onConfirm={vi.fn()} />);
    const checkbox = screen.getByRole('checkbox');
    const label = checkbox.closest('label');
    expect(label).toHaveTextContent('確認しました');
  });
});
```

- [x] 1.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ContractSummarySection.test.tsx`
期待結果：FAIL — Cannot find module '../components/home/ContractSummarySection'

- [x] 1.3 **最小実装を書く**
```typescript
import { useState, useRef, useCallback } from 'react';
import { Icon } from '../ui/Icon';

interface ContractSummarySectionProps {
  onConfirm: (confirmed: boolean) => void;
}

export function ContractSummarySection({ onConfirm }: ContractSummarySectionProps) {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 10;
    if (isAtBottom) {
      setScrolledToBottom(true);
    }
  }, []);

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setConfirmed(checked);
      onConfirm(checked);
    },
    [onConfirm],
  );

  return (
    <div className="m-2">
      <div className="border-4 border-warning">
        <h1 className="bg-warning text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          <Icon name="alert-circle" size="sm" className="mr-1 inline" />
          契約の概要（注意喚起情報）
        </h1>
        <div className="bg-warning-light p-4 text-sm leading-relaxed">
          <p>「契約の概要」は、保険商品の内容やご注意いただきたい事項のうち、特にご確認いただきたい重要な点をまとめたものです。</p>
          <p className="mt-2">内容をご確認のうえ、「確認しました」をチェックして同意ボタンをクリックしてください。</p>
          <p className="mt-2 font-bold">最後までスクロールすることで「確認しました」にチェックが行えます。</p>
        </div>
      </div>

      <div className="border-4 border-primary mt-4">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          契約の概要
        </h1>
        <div className="bg-cream">
          <div
            data-testid="contract-scroll"
            ref={scrollRef}
            onScroll={handleScroll}
            className="m-2 h-[300px] overflow-y-auto border border-border rounded-lg p-3 text-sm leading-relaxed"
          >
            <p className="mb-3 font-bold text-text-primary">【契約の概要】</p>
            <p className="mb-2">保険期間：1年間または2年間</p>
            <p className="mb-2">保険金額：補償内容により異なります</p>
            <p className="mb-2">保険料：プランにより異なります</p>
            <p className="mb-2">払込方法：一時払いまたは月払い</p>
          </div>

          <div className="text-center mb-2">
            <button className="text-primary-link underline text-sm hover:opacity-70">
              ＞全文を見る
            </button>
          </div>

          <div className="flex justify-center pb-3">
            <div className={`w-[600px] rounded-md p-3 flex items-center justify-center ${scrolledToBottom ? 'bg-white border border-border' : 'bg-qa-bg'}`}>
              <label className={`inline-flex items-center gap-2 ${scrolledToBottom ? 'cursor-pointer text-text-primary' : 'cursor-not-allowed text-text-light'}`}>
                <span className="relative inline-flex h-6 w-6 items-center justify-center">
                  <input type="checkbox" checked={confirmed} onChange={handleCheck} disabled={!scrolledToBottom} className="sr-only" />
                  <span className={`h-6 w-6 rounded-[4px] border ${scrolledToBottom ? 'border-border bg-cream' : 'border-disabled bg-disabled'}`} />
                  <span className={`absolute left-[5px] top-[2px] h-3.5 w-2 rotate-45 border-r-[3px] border-b-[3px] border-accent-orange transition-opacity duration-150 ${confirmed ? 'opacity-100' : 'opacity-0'}`} />
                </span>
                <span className="text-base">確認しました</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [x] 1.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ContractSummarySection.test.tsx`
期待結果：PASS

- [x] 1.5 **コミット**
```bash
git add src/components/home/ContractSummarySection.tsx src/__tests__/ContractSummarySection.test.tsx
git commit -m "feat: add ContractSummarySection component"
```

### タスク 2：CautionSection コンポーネント

**関連ファイル：**
- 新規：src/components/home/CautionSection.tsx
- テスト：src/__tests__/CautionSection.test.tsx

- [x] 2.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CautionSection } from '../components/home/CautionSection';

describe('CautionSection コンポーネント', () => {
  it('マゼンタ見出し「注意喚起」が表示されること', () => {
    render(<CautionSection />);
    expect(screen.getByText('注意喚起')).toBeInTheDocument();
  });

  it('スクロール可能な領域が表示されること', () => {
    render(<CautionSection />);
    expect(screen.getByTestId('caution-scroll')).toBeInTheDocument();
  });

  it('全文を見るリンクが表示されること', () => {
    render(<CautionSection />);
    expect(screen.getByText('＞全文を見る')).toBeInTheDocument();
  });
});
```

- [x] 2.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/CautionSection.test.tsx`
期待結果：FAIL — Cannot find module '../components/home/CautionSection'

- [x] 2.3 **最小実装を書く**
```typescript
export function CautionSection() {
  return (
    <div className="m-2">
      <div className="border-4 border-primary mt-4">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          注意喚起
        </h1>
        <div className="bg-cream">
          <div
            data-testid="caution-scroll"
            className="m-2 h-[300px] overflow-y-auto border border-border rounded-lg p-3 text-sm leading-relaxed"
          >
            <p className="mb-3 font-bold text-text-primary">【注意喚起】</p>
            <p className="mb-2">保険契約にかかる重要事項についての説明です。</p>
            <p className="mb-2">契約の締結にあたり、必ず内容をお読みください。</p>
            <p className="mb-2">告知義務について：申込書記載事項が事実と異なっている場合には、保険金をお支払いできない場合があります。</p>
          </div>

          <div className="text-center mb-2">
            <button className="text-primary-link underline text-sm hover:opacity-70">
              ＞全文を見る
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [x] 2.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/CautionSection.test.tsx`
期待結果：PASS

- [x] 2.5 **コミット**
```bash
git add src/components/home/CautionSection.tsx src/__tests__/CautionSection.test.tsx
git commit -m "feat: add CautionSection component"
```

### タスク 3：意向確認セクションとナビゲーションボタン

**関連ファイル：**
- 新規：src/components/home/IntentionSection.tsx
- テスト：src/__tests__/IntentionSection.test.tsx

- [x] 3.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntentionSection } from '../components/home/IntentionSection';

describe('IntentionSection コンポーネント', () => {
  it('マゼンタ見出し「意向確認」が表示されること', () => {
    render(<IntentionSection canProceed={false} onAgree={vi.fn()} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByText('意向確認')).toBeInTheDocument();
  });

  it('同意チェックボックスが表示されること', () => {
    render(<IntentionSection canProceed={false} onAgree={vi.fn()} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('戻るボタンが常に活性であること', () => {
    render(<IntentionSection canProceed={false} onAgree={vi.fn()} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /戻る/ })).not.toBeDisabled();
  });

  it('canProceed=falseでは次へボタンが非活性であること', () => {
    render(<IntentionSection canProceed={false} onAgree={vi.fn()} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /次へ/ })).toBeDisabled();
  });

  it('canProceed=trueでは次へボタンが活性であること', () => {
    render(<IntentionSection canProceed={true} onAgree={vi.fn()} onBack={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /次へ/ })).not.toBeDisabled();
  });

  it('同意チェックボックス変更でonAgreeが呼ばれること', async () => {
    const handleAgree = vi.fn();
    render(<IntentionSection canProceed={false} onAgree={handleAgree} onBack={vi.fn()} onNext={vi.fn()} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(handleAgree).toHaveBeenCalledWith(true);
  });
});
```

- [x] 3.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/IntentionSection.test.tsx`
期待結果：FAIL — Cannot find module '../components/home/IntentionSection'

- [x] 3.3 **最小実装を書く**
```typescript
import { useCallback } from 'react';
import { Icon } from '../ui/Icon';

interface IntentionSectionProps {
  canProceed: boolean;
  onAgree: (agreed: boolean) => void;
  onBack: () => void;
  onNext: () => void;
}

export function IntentionSection({ canProceed, onAgree, onBack, onNext }: IntentionSectionProps) {
  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onAgree(e.target.checked);
    },
    [onAgree],
  );

  return (
    <div className="m-2">
      <div className="border-4 border-primary mt-4">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          意向確認
        </h1>
        <div className="bg-cream p-4">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" onChange={handleCheck} className="sr-only" />
            <span className="h-6 w-6 rounded-[4px] border border-border bg-cream" />
            <span className="text-base text-text-primary">
              上記の内容について確認し、同意します
            </span>
          </label>
        </div>
      </div>

      <div className="m-2 mt-4 flex justify-center gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2 text-lg font-bold bg-cream text-text-primary border border-border shadow-soft transition-colors duration-150 hover:bg-hover-light"
        >
          <Icon name="arrow-left-circle" size="lg" />
          戻る
        </button>
        <button
          disabled={!canProceed}
          onClick={onNext}
          className={`
            inline-flex items-center justify-center gap-2 rounded-lg w-[230px] py-2
            text-lg font-bold shadow-soft transition-all duration-150 ease-out
            ${canProceed
              ? 'bg-cta text-text-white hover:bg-cta-hover hover:text-text-primary'
              : 'bg-disabled text-text-white cursor-not-allowed'
            }
          `}
        >
          <Icon name="arrow-right-circle" size="lg" />
          次へ
        </button>
      </div>
    </div>
  );
}
```

- [x] 3.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/IntentionSection.test.tsx`
期待結果：PASS

- [x] 3.5 **コミット**
```bash
git add src/components/home/IntentionSection.tsx src/__tests__/IntentionSection.test.tsx
git commit -m "feat: add IntentionSection component with navigation buttons"
```

### タスク 4：Icon に arrow-left-circle を追加

**関連ファイル：**
- 修正：src/components/ui/Icon.tsx

- [x] 4.1 **Icon マップに ArrowLeftCircle を追加**
```typescript
import {
  AlertCircle,
  ArrowLeftCircle,
  ArrowRightCircle,
  ChevronRight,
  CircleChevronUp,
  HelpCircle,
  Square,
  Loader2,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'alert-circle': AlertCircle,
  'arrow-left-circle': ArrowLeftCircle,
  'arrow-right-circle': ArrowRightCircle,
  'chevron-right': ChevronRight,
  'circle-chevron-up': CircleChevronUp,
  'help-circle': HelpCircle,
  square: Square,
  loader: Loader2,
};
```

- [x] 4.2 **TypeScriptビルドで確認**
コマンド：`npx tsc --noEmit`
期待結果：PASS

- [x] 4.3 **コミット**
```bash
git add src/components/ui/Icon.tsx
git commit -m "feat: add arrow-left-circle icon"
```

### タスク 5：IntentConfirmationPage とルーター設定

**関連ファイル：**
- 新規：src/app/views/IntentConfirmationPage.tsx
- テスト：src/__tests__/IntentConfirmationPage.test.tsx
- 修正：src/app/router.ts

- [x] 5.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import IntentConfirmationPage from '../app/views/IntentConfirmationPage';

describe('IntentConfirmationPage', () => {
  it('ステップナビゲーションのステップ2が表示されること', () => {
    render(<BrowserRouter><IntentConfirmationPage /></BrowserRouter>);
    expect(screen.getByText('②意向確認')).toBeInTheDocument();
  });

  it('ContractSummarySectionが表示されること', () => {
    render(<BrowserRouter><IntentConfirmationPage /></BrowserRouter>);
    expect(screen.getByText(/契約の概要（注意喚起情報）/)).toBeInTheDocument();
  });

  it('CautionSectionが表示されること', () => {
    render(<BrowserRouter><IntentConfirmationPage /></BrowserRouter>);
    expect(screen.getByText('注意喚起')).toBeInTheDocument();
  });

  it('意向確認セクションが表示されること', () => {
    render(<BrowserRouter><IntentConfirmationPage /></BrowserRouter>);
    expect(screen.getByText('意向確認')).toBeInTheDocument();
  });

  it('Q&Aサイドバーが表示されること', () => {
    render(<BrowserRouter><IntentConfirmationPage /></BrowserRouter>);
    expect(screen.getByText('よくある質問')).toBeInTheDocument();
  });

  it('初期状態では次へボタンが非活性であること', () => {
    render(<BrowserRouter><IntentConfirmationPage /></BrowserRouter>);
    expect(screen.getByRole('button', { name: /次へ/ })).toBeDisabled();
  });
});
```

- [x] 5.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/IntentConfirmationPage.test.tsx`
期待結果：FAIL — Cannot find module '../app/views/IntentConfirmationPage'

- [x] 5.3 **IntentConfirmationPage を実装**
```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepNavigation } from '../../components/layout/StepNavigation';
import { QASidebar } from '../../components/home/QASidebar';
import { ContractSummarySection } from '../../components/home/ContractSummarySection';
import { CautionSection } from '../../components/home/CautionSection';
import { IntentionSection } from '../../components/home/IntentionSection';
import { ScrollTopButton } from '../../components/ui/ScrollTopButton';

const qaItems = [
  { question: '保険料はいくらですか？', answer: '保険料はプランにより異なります。お見積りページにてご確認ください。' },
  { question: '解約はできますか？', answer: 'いつでも解約可能です。解約時の返金については規約をご確認ください。' },
  { question: '補償内容は変更できますか？', answer: '契約期間中の特約追加・変更が可能な場合がございます。' },
];

function IntentConfirmationPage() {
  const [confirmed, setConfirmed] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const canProceed = confirmed && agreed;

  return (
    <div className="bg-white font-sans">
      <StepNavigation currentStep={2} />

      <main className="px-4 py-4">
        <div className="flex flex-col gap-4 min-[875px]:flex-row">
          <div className="w-full min-[875px]:w-[800px]">
            <ContractSummarySection onConfirm={setConfirmed} />
            <CautionSection />
            <IntentionSection
              canProceed={canProceed}
              onAgree={setAgreed}
              onBack={() => navigate('/')}
              onNext={() => console.log('Navigate to application input page')}
            />
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

export default IntentConfirmationPage;
```

- [x] 5.4 **ルーターに /intent-confirmation を追加**
router.ts に以下のルートを追加する：
```typescript
{ path: '/intent-confirmation', element: <IntentConfirmationPage /> },
```

- [x] 5.5 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/IntentConfirmationPage.test.tsx`
期待結果：PASS

- [x] 5.6 **コミット**
```bash
git add src/app/views/IntentConfirmationPage.tsx src/__tests__/IntentConfirmationPage.test.tsx src/app/router.ts
git commit -m "feat: add IntentConfirmationPage with routing"
```

### タスク 6：統合確認

**関連ファイル：**
- なし（全体確認のみ）

- [x] 6.1 **全テストを実行**
コマンド：`npx vitest run`
期待結果：PASS — 全テスト成功

- [x] 6.2 **TypeScriptビルドを実行**
コマンド：`npx tsc --noEmit`
期待結果：PASS — 型エラーなし

- [x] 6.3 **本番ビルドを実行**
コマンド：`npx vite build`
期待結果：PASS — ビルド成功

- [x] 6.4 **コミット**
```bash
git commit --allow-empty -m "chore: verify build and tests pass for intent confirmation page"
```
