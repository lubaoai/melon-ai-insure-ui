### タスク 1：lucide-react パッケージのインストール

**関連ファイル：**
- 修正：package.json

- [x] 1.1 **パッケージをインストールする**
```bash
cd D:\my-project\melon-ai-insure-ui && npm install lucide-react
```

- [x] 1.2 **インストール成功を確認する**
コマンド：`npm ls lucide-react`
期待結果：`lucide-react@x.x.x` が表示されること

- [x] 1.3 **ビルドが通ることを確認する**
コマンド：`npx tsc -b`
期待結果：エラーなしで完了すること

---

### タスク 2：ブランドデザイントークンの定義

**関連ファイル：**
- 修正：src/index.css
- テスト：src/__tests__/design-tokens.test.ts

- [x] 2.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';

describe('ブランドデザイントークン', () => {
  it('プライマリカラーのCSS変数が定義されていること', () => {
    const style = getComputedStyle(document.documentElement);
    expect(style.getPropertyValue('--color-primary').trim()).toBe('#b40081');
  });

  it('CTAカラーのCSS変数が定義されていること', () => {
    const style = getComputedStyle(document.documentElement);
    expect(style.getPropertyValue('--color-cta').trim()).toBe('#FF8B2C');
  });

  it('警告カラーのCSS変数が定義されていること', () => {
    const style = getComputedStyle(document.documentElement);
    expect(style.getPropertyValue('--color-warning').trim()).toBe('#E99606');
  });

  it('クリーム背景色のCSS変数が定義されていること', () => {
    const style = getComputedStyle(document.documentElement);
    expect(style.getPropertyValue('--color-cream').trim()).toBe('#FDFCF6');
  });

  it('フォームラベル背景色のCSS変数が定義されていること', () => {
    const style = getComputedStyle(document.documentElement);
    expect(style.getPropertyValue('--color-label-bg').trim()).toBe('#ffe5f7');
  });

  it('ボーダーグレー色のCSS変数が定義されていること', () => {
    const style = getComputedStyle(document.documentElement);
    expect(style.getPropertyValue('--color-border').trim()).toBe('#A6A6A6');
  });
});
```

- [x] 2.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/design-tokens.test.ts`
期待結果：FAIL — CSS変数が空文字列

- [x] 2.3 **最小実装を書く**
`src/index.css` を以下の内容に更新：
```css
@import 'tailwindcss';

@theme {
  --color-primary: #b40081;
  --color-primary-light: #ffe5f7;
  --color-primary-dark: #8a0060;
  --color-primary-link: #bd0980;

  --color-cta: #FF8B2C;
  --color-cta-hover: #FFB87E;
  --color-cta-dark: #e07020;

  --color-warning: #E99606;
  --color-warning-light: #FFF3D6;

  --color-accent-orange: #F49D34;
  --color-accent-blue: #005BAC;
  --color-accent-teal: #82D7DC;

  --color-cream: #FDFCF6;
  --color-label-bg: #ffe5f7;
  --color-input-bg: #f5f5f5;
  --color-button-area: #CCCCCC;
  --color-green-area: #E9F2CD;
  --color-inquiry-bg: #FBEFFB;
  --color-border: #A6A6A6;
  --color-error: #E3524A;

  --color-text-primary: #393939;
  --color-text-light: #666666;
  --color-text-white: #FFFFFF;

  --font-family-sans: "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif;

  --radius-sm: 4px;
  --radius-md: 5px;
  --radius-lg: 8px;

  --shadow-soft: 2px 2px 1px #999999;

  --spacing-content-max: 1024px;
  --spacing-main-width: 800px;
}
```

- [x] 2.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/design-tokens.test.ts`
期待結果：PASS

- [x] 2.5 **コミット**
```bash
git add src/index.css src/__tests__/design-tokens.test.ts
git commit -m "feat: ブランドデザイントークンをTailwind @themeに定義"
```

---

### タスク 3：Icon コンポーネントの実装

**関連ファイル：**
- 新規：src/components/ui/Icon.tsx
- テスト：src/__tests__/Icon.test.tsx

- [x] 3.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Icon } from '../../components/ui/Icon';

describe('Icon コンポーネント', () => {
  it('alert-circleアイコンがレンダリングされること', () => {
    render(<Icon name="alert-circle" />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('size="sm"で16pxサイズが適用されること', () => {
    render(<Icon name="alert-circle" size="sm" />);
    const svg = document.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('16');
    expect(svg?.getAttribute('height')).toBe('16');
  });

  it('size="lg"で24pxサイズが適用されること', () => {
    render(<Icon name="alert-circle" size="lg" />);
    const svg = document.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('24');
    expect(svg?.getAttribute('height')).toBe('24');
  });

  it('未定義のアイコン名でプレースホルダーがレンダリングされること', () => {
    render(<Icon name="nonexistent-icon" />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('サイズ未指定時はmd(20px)がデフォルトであること', () => {
    render(<Icon name="alert-circle" />);
    const svg = document.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('20');
    expect(svg?.getAttribute('height')).toBe('20');
  });
});
```

- [x] 3.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/Icon.test.tsx`
期待結果：FAIL — モジュールが見つからない

- [x] 3.3 **最小実装を書く**
`src/components/ui/Icon.tsx` を作成：
```typescript
import {
  AlertCircle,
  ArrowRightCircle,
  ChevronRight,
  HelpCircle,
  Square,
  Loader2,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'alert-circle': AlertCircle,
  'arrow-right-circle': ArrowRightCircle,
  'chevron-right': ChevronRight,
  'help-circle': HelpCircle,
  square: Square,
  loader: Loader2,
};

const sizeMap: Record<string, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

type IconName = keyof typeof iconMap;

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Icon({ name, size = 'md', className }: IconProps) {
  const LucideIcon = iconMap[name as IconName];
  const iconSize = sizeMap[size] ?? sizeMap.md;

  if (!LucideIcon) {
    return <span className={className}>?</span>;
  }

  return <LucideIcon width={iconSize} height={iconSize} className={className} />;
}
```

- [x] 3.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/Icon.test.tsx`
期待結果：PASS

- [x] 3.5 **コミット**
```bash
git add src/components/ui/Icon.tsx src/__tests__/Icon.test.tsx
git commit -m "feat: Icon コンポーネントを追加（Lucide React マッピング）"
```

---

### タスク 4：Button コンポーネントの実装

**関連ファイル：**
- 新規：src/components/ui/Button.tsx
- テスト：src/__tests__/Button.test.tsx

- [x] 4.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../components/ui/Button';

describe('Button コンポーネント', () => {
  it('プライマリボタンがオレンジ背景で表示されること', () => {
    render(<Button variant="primary">次へ進む</Button>);
    const button = screen.getByRole('button', { name: '次へ進む' });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('bg-cta');
  });

  it('無効状態のボタンがグレー背景で表示されること', () => {
    render(<Button variant="primary" disabled>次へ進む</Button>);
    const button = screen.getByRole('button', { name: '次へ進む' });
    expect(button).toBeDisabled();
    expect(button.className).toContain('bg-gray-500');
  });

  it('セカンダリボタンがクリーム背景で表示されること', () => {
    render(<Button variant="secondary">戻る</Button>);
    const button = screen.getByRole('button', { name: '戻る' });
    expect(button.className).toContain('bg-cream');
  });

  it('クリック時にonClickハンドラが呼ばれること', async () => {
    const handleClick = vi.fn();
    render(<Button variant="primary" onClick={handleClick}>クリック</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'クリック' }));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('無効状態ではクリックハンドラが呼ばれないこと', async () => {
    const handleClick = vi.fn();
    render(<Button variant="primary" disabled onClick={handleClick}>クリック</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'クリック' }));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

- [x] 4.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/Button.test.tsx`
期待結果：FAIL — モジュールが見つからない

- [x] 4.3 **最小実装を書く**
`src/components/ui/Button.tsx` を作成：
```typescript
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  children: ReactNode;
}

const variantClasses: Record<string, string> = {
  primary:
    'bg-cta text-text-white hover:bg-cta-hover hover:text-text-primary shadow-soft',
  secondary:
    'bg-cream text-text-primary border border-border hover:bg-border hover:text-text-white shadow-soft',
};

const disabledClasses =
  'bg-gray-500 text-text-white cursor-not-allowed shadow-soft';

export function Button({
  variant,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg px-5 py-2.5
        font-bold transition-all duration-150 ease-out
        ${disabled ? disabledClasses : variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
```

- [x] 4.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/Button.test.tsx`
期待結果：PASS

- [x] 4.5 **コミット**
```bash
git add src/components/ui/Button.tsx src/__tests__/Button.test.tsx
git commit -m "feat: Button コンポーネントを追加（primary/secondary バリアント）"
```

---

### タスク 5：Card コンポーネントの実装

**関連ファイル：**
- 新規：src/components/ui/Card.tsx
- テスト：src/__tests__/Card.test.tsx

- [x] 5.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '../../components/ui/Card';

describe('Card コンポーネント', () => {
  it('マゼンタの3辺ボーダーとクリーム背景で表示されること', () => {
    render(<Card>カード内容</Card>);
    const card = screen.getByText('カード内容').closest('div');
    expect(card?.className).toContain('border-primary');
    expect(card?.className).toContain('bg-cream');
  });

  it('ホバー時にシャドウが強調されること', () => {
    render(<Card hoverable>カード内容</Card>);
    const card = screen.getByText('カード内容').closest('div');
    expect(card?.className).toContain('hover:shadow-md');
  });

  it('children がレンダリングされること', () => {
    render(<Card><p>テスト内容</p></Card>);
    expect(screen.getByText('テスト内容')).toBeInTheDocument();
  });
});
```

- [x] 5.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/Card.test.tsx`
期待結果：FAIL — モジュールが見つからない

- [x] 5.3 **最小実装を書く**
`src/components/ui/Card.tsx` を作成：
```typescript
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  hoverable?: boolean;
  className?: string;
}

export function Card({ children, hoverable = false, className = '' }: CardProps) {
  return (
    <div
      className={`
        border-4 border-primary border-t-0 bg-cream p-6 m-2
        transition-shadow duration-150 ease-out
        ${hoverable ? 'hover:shadow-md cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
```

- [x] 5.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/Card.test.tsx`
期待結果：PASS

- [x] 5.5 **コミット**
```bash
git add src/components/ui/Card.tsx src/__tests__/Card.test.tsx
git commit -m "feat: Card コンポーネントを追加（マゼンタ3辺ボーダー）"
```

---

### タスク 6：Badge コンポーネントの実装

**関連ファイル：**
- 新規：src/components/ui/Badge.tsx
- テスト：src/__tests__/Badge.test.tsx

- [x] 6.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../../components/ui/Badge';

describe('Badge コンポーネント', () => {
  it('ライトピンク背景のカテゴリバッジが表示されること', () => {
    render(<Badge>医療</Badge>);
    const badge = screen.getByText('医療');
    expect(badge.className).toContain('bg-label-bg');
    expect(badge.className).toContain('text-primary');
  });

  it('必須バッジが赤背景で表示されること', () => {
    render(<Badge variant="required">必須</Badge>);
    const badge = screen.getByText('必須');
    expect(badge.className).toContain('bg-error');
    expect(badge.className).toContain('text-text-white');
  });
});
```

- [x] 6.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/Badge.test.tsx`
期待結果：FAIL — モジュールが見つからない

- [x] 6.3 **最小実装を書く**
`src/components/ui/Badge.tsx` を作成：
```typescript
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'required';
}

const variantClasses: Record<string, string> = {
  default: 'bg-label-bg text-primary',
  required: 'bg-error text-text-white',
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={`
        inline-block rounded-full px-3 py-1 text-xs font-medium
        ${variantClasses[variant]}
      `}
    >
      {children}
    </span>
  );
}
```

- [x] 6.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/Badge.test.tsx`
期待結果：PASS

- [x] 6.5 **コミット**
```bash
git add src/components/ui/Badge.tsx src/__tests__/Badge.test.tsx
git commit -m "feat: Badge コンポーネントを追加（default/required バリアント）"
```

---

### タスク 7：Header コンポーネントの実装

**関連ファイル：**
- 新規：src/components/layout/Header.tsx
- テスト：src/__tests__/Header.test.tsx

- [x] 7.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../../components/layout/Header';

describe('Header コンポーネント', () => {
  it('ブランドロゴが表示されること', () => {
    render(<Header />);
    expect(screen.getByText('メロン少額短期保険')).toBeInTheDocument();
  });

  it('お問い合わせ電話番号が表示されること', () => {
    render(<Header />);
    expect(screen.getByText(/0120/)).toBeInTheDocument();
  });

  it('マゼンタの下部ボーダーが適用されること', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('border-b-4');
    expect(header.className).toContain('border-primary');
  });
});
```

- [x] 7.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/Header.test.tsx`
期待結果：FAIL — モジュールが見つからない

- [x] 7.3 **最小実装を書く**
`src/components/layout/Header.tsx` を作成：
```typescript
export function Header() {
  return (
    <header
      role="banner"
      className="border-b-4 border-primary bg-white pb-2"
    >
      <div className="mx-auto flex max-w-[1024px] items-center px-4 py-2">
        <div className="text-xl font-bold text-primary">
          メロン少額短期保険
        </div>
        <div className="ml-auto text-sm text-text-light">
          お問い合わせ：0120-XXX-XXX
        </div>
      </div>
    </header>
  );
}
```

- [x] 7.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/Header.test.tsx`
期待結果：PASS

- [x] 7.5 **コミット**
```bash
git add src/components/layout/Header.tsx src/__tests__/Header.test.tsx
git commit -m "feat: Header コンポーネントを追加（マゼンタボーダー）"
```

---

### タスク 8：StepNavigation コンポーネントの実装

**関連ファイル：**
- 新規：src/components/layout/StepNavigation.tsx
- テスト：src/__tests__/StepNavigation.test.tsx

- [x] 8.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StepNavigation } from '../../components/layout/StepNavigation';

describe('StepNavigation コンポーネント', () => {
  it('6つのステップが表示されること', () => {
    render(<StepNavigation currentStep={1} />);
    expect(screen.getByText('①重要事項同意')).toBeInTheDocument();
    expect(screen.getByText('②意向確認')).toBeInTheDocument();
    expect(screen.getByText('③申込内容入力')).toBeInTheDocument();
    expect(screen.getByText('④申込内容確認')).toBeInTheDocument();
    expect(screen.getByText('⑤決済手続き')).toBeInTheDocument();
    expect(screen.getByText('⑥申込完了')).toBeInTheDocument();
  });

  it('現在のステップがマゼンタ背景でハイライトされること', () => {
    render(<StepNavigation currentStep={1} />);
    const activeStep = screen.getByText('①重要事項同意').closest('li');
    expect(activeStep?.className).toContain('bg-primary');
    expect(activeStep?.className).toContain('text-text-white');
  });

  it('非アクティブステップがライトピンク背景であること', () => {
    render(<StepNavigation currentStep={1} />);
    const inactiveStep = screen.getByText('②意向確認').closest('li');
    expect(inactiveStep?.className).toContain('bg-label-bg');
  });

  it('ステップ間にChevronRightアイコンが表示されること', () => {
    render(<StepNavigation currentStep={1} />);
    const separators = document.querySelectorAll('svg.lucide-chevron-right');
    expect(separators.length).toBe(5);
  });

  it('ステップ0が指定された場合は1にクランプされること', () => {
    render(<StepNavigation currentStep={0} />);
    const firstStep = screen.getByText('①重要事項同意').closest('li');
    expect(firstStep?.className).toContain('bg-primary');
  });

  it('ステップ7が指定された場合は6にクランプされること', () => {
    render(<StepNavigation currentStep={7} />);
    const lastStep = screen.getByText('⑥申込完了').closest('li');
    expect(lastStep?.className).toContain('bg-primary');
  });
});
```

- [x] 8.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/StepNavigation.test.tsx`
期待結果：FAIL — モジュールが見つからない

- [x] 8.3 **最小実装を書く**
`src/components/layout/StepNavigation.tsx` を作成：
```typescript
import { Icon } from '../ui/Icon';

const steps = [
  '①重要事項同意',
  '②意向確認',
  '③申込内容入力',
  '④申込内容確認',
  '⑤決済手続き',
  '⑥申込完了',
];

interface StepNavigationProps {
  currentStep: number;
}

function clampStep(step: number): number {
  return Math.max(1, Math.min(6, step));
}

export function StepNavigation({ currentStep }: StepNavigationProps) {
  const activeStep = clampStep(currentStep);

  return (
    <nav className="mx-auto max-w-[1024px] px-4 py-2">
      <ol className="flex flex-wrap items-center justify-center gap-1">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === activeStep;

          return (
            <li key={stepNumber} className="flex items-center">
              <span
                className={`
                  inline-block rounded px-3 py-1.5 text-sm font-medium
                  ${isActive ? 'bg-primary text-text-white' : 'bg-label-bg text-text-primary'}
                `}
              >
                {label}
              </span>
              {stepNumber < steps.length && (
                <Icon name="chevron-right" size="sm" className="mx-1 text-text-light" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

- [x] 8.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/StepNavigation.test.tsx`
期待結果：PASS

- [x] 8.5 **コミット**
```bash
git add src/components/layout/StepNavigation.tsx src/__tests__/StepNavigation.test.tsx
git commit -m "feat: StepNavigation コンポーネントを追加（6段階ステップ）"
```

---

### タスク 9：Footer コンポーネントの実装

**関連ファイル：**
- 新規：src/components/layout/Footer.tsx
- テスト：src/__tests__/Footer.test.tsx

- [x] 9.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../../components/layout/Footer';

describe('Footer コンポーネント', () => {
  it('マゼンタ背景のフッターが表示されること', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer.className).toContain('bg-primary');
  });

  it('著作権表示が白テキストで表示されること', () => {
    render(<Footer />);
    const copyright = screen.getByText(/メロン少額短期保険/);
    expect(copyright.className).toContain('text-text-white');
  });
});
```

- [x] 9.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/Footer.test.tsx`
期待結果：FAIL — モジュールが見つからない

- [x] 9.3 **最小実装を書く**
`src/components/layout/Footer.tsx` を作成：
```typescript
export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-primary py-5"
    >
      <div className="mx-auto max-w-[1024px] px-4 text-center text-xs text-text-white">
        <p>© メロン少額短期保険株式会社 All Rights Reserved.</p>
      </div>
    </footer>
  );
}
```

- [x] 9.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/Footer.test.tsx`
期待結果：PASS

- [x] 9.5 **コミット**
```bash
git add src/components/layout/Footer.tsx src/__tests__/Footer.test.tsx
git commit -m "feat: Footer コンポーネントを追加（マゼンタ背景）"
```

---

### タスク 10：ProductCard コンポーネントの実装

**関連ファイル：**
- 新規：src/components/home/ProductCard.tsx
- テスト：src/__tests__/ProductCard.test.tsx

- [x] 10.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductCard } from '../../components/home/ProductCard';
import type { InsuranceProduct } from '../../modules/products/types';

const sampleProduct: InsuranceProduct = {
  id: '1',
  name: '医療保険プレミアム',
  category: '医療',
  premium: 5000,
  coverage: '入院一時金50万円',
  description: '充実の保障内容の医療保険',
};

describe('ProductCard コンポーネント', () => {
  it('商品名が表示されること', () => {
    render(<ProductCard product={sampleProduct} />);
    expect(screen.getByText('医療保険プレミアム')).toBeInTheDocument();
  });

  it('カテゴリバッジが表示されること', () => {
    render(<ProductCard product={sampleProduct} />);
    expect(screen.getByText('医療')).toBeInTheDocument();
  });

  it('月額保険料が表示されること', () => {
    render(<ProductCard product={sampleProduct} />);
    expect(screen.getByText(/月額 5,000/)).toBeInTheDocument();
  });

  it('補償内容が表示されること', () => {
    render(<ProductCard product={sampleProduct} />);
    expect(screen.getByText('入院一時金50万円')).toBeInTheDocument();
  });

  it('CTAボタンがオレンジ色で表示されること', () => {
    render(<ProductCard product={sampleProduct} />);
    const button = screen.getByRole('button', { name: /詳しく見る/ });
    expect(button.className).toContain('bg-cta');
  });
});
```

- [x] 10.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ProductCard.test.tsx`
期待結果：FAIL — モジュールが見つからない

- [x] 10.3 **最小実装を書く**
`src/components/home/ProductCard.tsx` を作成：
```typescript
import type { InsuranceProduct } from '../../modules/products/types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Icon } from '../ui/Icon';

interface ProductCardProps {
  product: InsuranceProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card hoverable>
      <h2 className="text-lg font-bold text-text-primary">{product.name}</h2>
      <div className="mt-1">
        <Badge>{product.category}</Badge>
      </div>
      <p className="mt-2 text-text-light">{product.coverage}</p>
      <p className="mt-1 text-xl font-bold text-text-primary">
        月額 {product.premium.toLocaleString()} 円
      </p>
      <p className="mt-2 text-sm text-text-light">{product.description}</p>
      <button className="mt-4 inline-flex items-center gap-1 rounded-lg bg-cta px-4 py-2 font-bold text-text-white shadow-soft transition-colors duration-150 ease-out hover:bg-cta-hover hover:text-text-primary">
        <Icon name="arrow-right-circle" size="sm" />
        詳しく見る
      </button>
    </Card>
  );
}
```

- [x] 10.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ProductCard.test.tsx`
期待結果：PASS

- [x] 10.5 **コミット**
```bash
git add src/components/home/ProductCard.tsx src/__tests__/ProductCard.test.tsx
git commit -m "feat: ProductCard コンポーネントを追加（ブランドスタイル）"
```

---

### タスク 11：QASidebar コンポーネントの実装

**関連ファイル：**
- 新規：src/components/home/QASidebar.tsx
- テスト：src/__tests__/QASidebar.test.tsx

- [x] 11.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QASidebar } from '../../components/home/QASidebar';

const sampleQA = [
  { question: '保険料はいくらですか？', answer: '保険料はプランにより異なります。' },
  { question: '解約はできますか？', answer: 'いつでも解約可能です。' },
];

describe('QASidebar コンポーネント', () => {
  it('Q&A質問が表示されること', () => {
    render(<QASidebar items={sampleQA} />);
    expect(screen.getByText('保険料はいくらですか？')).toBeInTheDocument();
    expect(screen.getByText('解約はできますか？')).toBeInTheDocument();
  });

  it('初期状態では回答が非表示であること', () => {
    render(<QASidebar items={sampleQA} />);
    expect(screen.queryByText('保険料はプランにより異なります。')).not.toBeInTheDocument();
  });

  it('質問をクリックすると回答が表示されること', async () => {
    render(<QASidebar items={sampleQA} />);
    await userEvent.click(screen.getByText('保険料はいくらですか？'));
    expect(screen.getByText('保険料はプランにより異なります。')).toBeInTheDocument();
  });

  it('Q&Aが空の場合にメッセージが表示されること', () => {
    render(<QASidebar items={[]} />);
    expect(screen.getByText('よくある質問はありません')).toBeInTheDocument();
  });
});
```

- [x] 11.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/QASidebar.test.tsx`
期待結果：FAIL — モジュールが見つからない

- [x] 11.3 **最小実装を書く**
`src/components/home/QASidebar.tsx` を作成：
```typescript
import { useState } from 'react';
import { Icon } from '../ui/Icon';

interface QAItem {
  question: string;
  answer: string;
}

interface QASidebarProps {
  items: QAItem[];
}

export function QASidebar({ items }: QASidebarProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <aside className="border border-border rounded-lg p-2">
        <p className="text-sm text-text-light">よくある質問はありません</p>
      </aside>
    );
  }

  return (
    <aside className="border border-border rounded-lg p-2">
      <h3 className="mb-2 text-sm font-bold text-text-primary">よくある質問</h3>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index}>
            <button
              className="flex w-full items-center gap-1 rounded bg-gray-100 border border-gray-200 px-2 py-1.5 text-left text-sm text-primary-link hover:bg-gray-200 transition-colors duration-150"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <Icon name="help-circle" size="sm" />
              {item.question}
            </button>
            {openIndex === index && (
              <div className="border border-t-0 border-gray-200 px-2 py-1.5 text-xs text-text-primary">
                {item.answer}
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
```

- [x] 11.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/QASidebar.test.tsx`
期待結果：PASS

- [x] 11.5 **コミット**
```bash
git add src/components/home/QASidebar.tsx src/__tests__/QASidebar.test.tsx
git commit -m "feat: QASidebar コンポーネントを追加（アコーディオン）"
```

---

### タスク 12：TermsSection コンポーネントの実装（スクロール同意）

**関連ファイル：**
- 新規：src/components/home/TermsSection.tsx
- テスト：src/__tests__/TermsSection.test.tsx

- [x] 12.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TermsSection } from '../../components/home/TermsSection';

describe('TermsSection コンポーネント', () => {
  it('スクロール可能な規約エリアが表示されること', () => {
    render(<TermsSection onAgree={vi.fn()} />);
    const termsArea = screen.getByTestId('terms-scroll');
    expect(termsArea).toBeInTheDocument();
  });

  it('初期状態では確認チェックボックスが無効であること', () => {
    render(<TermsSection onAgree={vi.fn()} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('チェックボックスのラベルが表示されること', () => {
    render(<TermsSection onAgree={vi.fn()} />);
    expect(screen.getByText(/確認しました/)).toBeInTheDocument();
  });
});
```

- [x] 12.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/TermsSection.test.tsx`
期待結果：FAIL — モジュールが見つからない

- [x] 12.3 **最小実装を書く**
`src/components/home/TermsSection.tsx` を作成：
```typescript
import { useState, useRef, useCallback } from 'react';
import { Icon } from '../ui/Icon';

interface TermsSectionProps {
  onAgree: (agreed: boolean) => void;
}

export function TermsSection({ onAgree }: TermsSectionProps) {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [agreed, setAgreed] = useState(false);
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
      setAgreed(checked);
      onAgree(checked);
    },
    [onAgree],
  );

  return (
    <div className="m-2">
      <h1 className="bg-primary text-text-white px-5 py-1.5 text-base font-normal">
        <Icon name="alert-circle" size="sm" className="mr-1 inline" />
        重要事項同意
      </h1>
      <div className="border-4 border-primary border-t-0 bg-cream">
        <div
          data-testid="terms-scroll"
          ref={scrollRef}
          onScroll={handleScroll}
          className="m-2 h-[300px] overflow-y-auto border border-border rounded-lg p-2 text-sm leading-relaxed"
        >
          <p className="mb-4">
            メロン少額短期保険 火災保険に関する重要事項をご確認ください。
            本契約にあたり、以下の事項を十分にご理解いただいた上でお申し込みください。
          </p>
          <p className="mb-4">
            第1条（契約の概要）本保険は、火災により生じる損害を補償する保険です。
            補償対象となる損害は、火災、落雷、爆発等により直接生じた損害とします。
          </p>
          <p className="mb-4">
            第2条（保険期間）保険期間は、契約の始期から1年間とします。
            更新については、保険期間満了の30日前までにお申し出ください。
          </p>
          <p className="mb-4">
            第3条（保険料のお支払い）保険料は、一時払いまたは月払いのいずれかにより
            お支払いいただきます。月払いの場合は、指定の口座からの口座振替となります。
          </p>
          <p className="mb-4">
            第4条（解除・解約）契約者はいつでも契約の解除を請求することができます。
            保険会社も、正当な事由がある場合には契約を解除することがあります。
          </p>
          <p>
            第5条（個人情報の取扱い）お客様の個人情報は、適切に管理し、
            本契約の目的以外には使用いたしません。詳細はプライバシーポリシーをご参照ください。
          </p>
        </div>
        <label
          className={`
            m-2 inline-flex items-center gap-2 rounded-md p-3
            bg-cream shadow-soft transition-opacity duration-150
            ${scrolledToBottom ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-50'}
          `}
        >
          <input
            type="checkbox"
            checked={agreed}
            onChange={handleCheck}
            disabled={!scrolledToBottom}
            className="accent-accent-orange h-6 w-6"
          />
          <span className="text-base text-text-primary">
            上記の内容を確認しました
          </span>
        </label>
      </div>
    </div>
  );
}
```

- [x] 12.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/TermsSection.test.tsx`
期待結果：PASS

- [x] 12.5 **コミット**
```bash
git add src/components/home/TermsSection.tsx src/__tests__/TermsSection.test.tsx
git commit -m "feat: TermsSection コンポーネントを追加（スクロール同意）"
```

---

### タスク 13：LoadingOverlay コンポーネントの実装

**関連ファイル：**
- 新規：src/components/ui/LoadingOverlay.tsx
- テスト：src/__tests__/LoadingOverlay.test.tsx

- [x] 13.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingOverlay } from '../../components/ui/LoadingOverlay';

describe('LoadingOverlay コンポーネント', () => {
  it('isVisible=true のときにオーバーレイが表示されること', () => {
    render(<LoadingOverlay isVisible={true} />);
    expect(screen.getByText('処理を行っております')).toBeInTheDocument();
  });

  it('isVisible=false のときにオーバーレイが非表示であること', () => {
    render(<LoadingOverlay isVisible={false} />);
    expect(screen.queryByText('処理を行っております')).not.toBeInTheDocument();
  });

  it('Loader2アイコンが回転アニメーション付きで表示されること', () => {
    render(<LoadingOverlay isVisible={true} />);
    const svg = document.querySelector('svg.animate-spin');
    expect(svg).toBeInTheDocument();
  });
});
```

- [x] 13.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/LoadingOverlay.test.tsx`
期待結果：FAIL — モジュールが見つからない

- [x] 13.3 **最小実装を書く**
`src/components/ui/LoadingOverlay.tsx` を作成：
```typescript
import { Icon } from './Icon';

interface LoadingOverlayProps {
  isVisible: boolean;
}

export function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50">
      <Icon name="loader" size="lg" className="animate-spin text-text-white" />
      <p className="mt-4 text-sm text-text-white">処理を行っております</p>
    </div>
  );
}
```

- [x] 13.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/LoadingOverlay.test.tsx`
期待結果：PASS

- [x] 13.5 **コミット**
```bash
git add src/components/ui/LoadingOverlay.tsx src/__tests__/LoadingOverlay.test.tsx
git commit -m "feat: LoadingOverlay コンポーネントを追加"
```

---

### タスク 14：ScrollTopButton コンポーネントの実装

**関連ファイル：**
- 新規：src/components/ui/ScrollTopButton.tsx
- テスト：src/__tests__/ScrollTopButton.test.tsx

- [x] 14.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScrollTopButton } from '../../components/ui/ScrollTopButton';

describe('ScrollTopButton コンポーネント', () => {
  it('「ページトップへ」ボタンが表示されること', () => {
    render(<ScrollTopButton />);
    expect(screen.getByText('ページトップへ')).toBeInTheDocument();
  });

  it('クリック時にwindow.scrollToが呼ばれること', async () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(<ScrollTopButton />);
    await userEvent.click(screen.getByText('ページトップへ'));
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    scrollToSpy.mockRestore();
  });
});
```

- [x] 14.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ScrollTopButton.test.tsx`
期待結果：FAIL — モジュールが見つからない

- [x] 14.3 **最小実装を書く**
`src/components/ui/ScrollTopButton.tsx` を作成：
```typescript
export function ScrollTopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 rounded-md border border-gray-400 bg-button-area px-3 py-1 text-sm text-text-primary shadow-soft transition-colors duration-150 hover:bg-gray-300"
    >
      ページトップへ
    </button>
  );
}
```

- [x] 14.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ScrollTopButton.test.tsx`
期待結果：PASS

- [x] 14.5 **コミット**
```bash
git add src/components/ui/ScrollTopButton.tsx src/__tests__/ScrollTopButton.test.tsx
git commit -m "feat: ScrollTopButton コンポーネントを追加"
```

---

### タスク 15：HomePage の再設計

**関連ファイル：**
- 修正：src/app/views/HomePage.tsx
- テスト：src/__tests__/HomePage.test.tsx（修正）

- [x] 15.1 **失敗するテストを書く**
`src/__tests__/HomePage.test.tsx` を以下の内容に更新：
```typescript
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse, delay } from 'msw';
import HomePage from '../app/views/HomePage';

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
];

const server = setupServer(
  http.get('/api/products', () => {
    return HttpResponse.json(mockProducts);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('HomePage（再設計版）', () => {
  it('ローディング中にオーバーレイが表示されること', async () => {
    server.use(
      http.get('/api/products', async () => {
        await delay(100);
        return HttpResponse.json(mockProducts);
      }),
    );
    render(<HomePage />);
    expect(screen.getByText('処理を行っております')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('処理を行っております')).not.toBeInTheDocument();
    });
  });

  it('ステップナビゲーションが表示されること', async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText('①重要事項同意')).toBeInTheDocument();
    });
  });

  it('保険商品カードが表示されること', async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText('医療保険プレミアム')).toBeInTheDocument();
    });
    expect(screen.getByText('生命保険スタンダード')).toBeInTheDocument();
  });

  it('商品データが空のときメッセージが表示されること', async () => {
    server.use(http.get('/api/products', () => HttpResponse.json([])));
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText('現在ご利用いただける商品はありません')).toBeInTheDocument();
    });
  });

  it('Q&Aサイドバーが表示されること', async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText('よくある質問')).toBeInTheDocument();
    });
  });

  it('重要事項同意セクションが表示されること', async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText('重要事項同意')).toBeInTheDocument();
    });
  });

  it('「次へ進む」ボタンが表示されること', async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /次へ進む/ })).toBeInTheDocument();
    });
  });
});
```

- [x] 15.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/HomePage.test.tsx`
期待結果：FAIL — 新しいアサーションに合致しない

- [x] 15.3 **最小実装を書く**
`src/app/views/HomePage.tsx` を以下の内容に更新：
```typescript
import { useState, useEffect } from 'react';
import type { InsuranceProduct } from '../../modules/products/types';
import { getInsuranceProducts } from '../../modules/products/api';
import { StepNavigation } from '../../components/layout/StepNavigation';
import { ProductCard } from '../../components/home/ProductCard';
import { QASidebar } from '../../components/home/QASidebar';
import { TermsSection } from '../../components/home/TermsSection';
import { LoadingOverlay } from '../../components/ui/LoadingOverlay';
import { ScrollTopButton } from '../../components/ui/ScrollTopButton';
import { Icon } from '../../components/ui/Icon';

const qaItems = [
  { question: '保険料はいくらですか？', answer: '保険料はプランにより異なります。お見積りページにてご確認ください。' },
  { question: '解約はできますか？', answer: 'いつでも解約可能です。解約時の返金については規約をご確認ください。' },
  { question: '補償内容は変更できますか？', answer: '契約期間中の特約追加・変更が可能な場合がございます。' },
];

function HomePage() {
  const [products, setProducts] = useState<InsuranceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    getInsuranceProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <LoadingOverlay isVisible={loading} />

      <StepNavigation currentStep={1} />

      <main className="mx-auto max-w-[1024px] px-4 py-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* 左カラム: メインコンテンツ */}
          <div className="w-full lg:w-[800px]">
            {/* 商品カード一覧 */}
            <div className="mb-4">
              <h1 className="bg-primary text-text-white px-5 py-1.5 text-base font-normal">
                保険商品一覧
              </h1>
              <div className="border-4 border-primary border-t-0 bg-cream">
                {products.length === 0 && !loading ? (
                  <p className="p-4 text-center text-text-light">
                    現在ご利用いただける商品はありません
                  </p>
                ) : (
                  <div className="grid gap-2 p-2 sm:grid-cols-2">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 重要事項同意 */}
            <TermsSection onAgree={setAgreed} />

            {/* ボタンエリア */}
            <div className="m-2 rounded-md bg-button-area p-2 text-center">
              <button
                disabled={!agreed}
                className={`
                  inline-flex items-center gap-2 rounded-lg px-5 py-3
                  text-lg font-bold shadow-soft
                  transition-all duration-150 ease-out
                  ${agreed
                    ? 'bg-cta text-text-white hover:bg-cta-hover hover:text-text-primary'
                    : 'bg-gray-500 text-text-white cursor-not-allowed'
                  }
                `}
              >
                <Icon name="arrow-right-circle" size="lg" />
                次へ進む
              </button>
            </div>
          </div>

          {/* 右カラム: Q&Aサイドバー */}
          <div className="w-full lg:w-[197px]">
            <QASidebar items={qaItems} />
          </div>
        </div>
      </main>

      <ScrollTopButton />
    </div>
  );
}

export default HomePage;
```

- [x] 15.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/HomePage.test.tsx`
期待結果：PASS

- [x] 15.5 **コミット**
```bash
git add src/app/views/HomePage.tsx src/__tests__/HomePage.test.tsx
git commit -m "feat: HomePageを再設計（2カラム、ステップナビ、同意セクション）"
```

---

### タスク 16：App レイアウトラッパーの更新

**関連ファイル：**
- 修正：src/App.tsx
- テスト：src/__tests__/routing.test.tsx（修正）

- [x] 16.1 **失敗するテストを書く**
`src/__tests__/routing.test.tsx` を更新：
```typescript
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { AppRoutes } from '../router';

const server = setupServer(
  http.get('/api/products', () => {
    return HttpResponse.json([]);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ルーティング', () => {
  it('ルートパスでHomePageが表示されること', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(screen.getByText('①重要事項同意')).toBeInTheDocument();
  });

  it('存在しないパスで404ページが表示されること', () => {
    render(
      <MemoryRouter initialEntries={['/nonexistent-path']}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(screen.getByText('ページが見つかりません')).toBeInTheDocument();
  });
});
```

- [x] 16.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/routing.test.tsx`
期待結果：FAIL — 「保険商品一覧」ではなく「①重要事項同意」を探すため

- [x] 16.3 **App.tsx に Header と Footer を追加**
`src/App.tsx` を更新：
```typescript
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
```

- [x] 16.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/routing.test.tsx`
期待結果：PASS

- [x] 16.5 **コミット**
```bash
git add src/App.tsx src/__tests__/routing.test.tsx
git commit -m "feat: AppにHeader/Footerレイアウトラッパーを追加"
```

---

### タスク 17：NotFoundPage のブランドスタイル適用

**関連ファイル：**
- 修正：src/app/views/NotFoundPage.tsx

- [x] 17.1 **NotFoundPage をブランドスタイルに更新**
`src/app/views/NotFoundPage.tsx` を更新：
```typescript
function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-cream">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-lg text-text-primary">ページが見つかりません</p>
        <p className="mt-2 text-sm text-text-light">お探しのページは存在しません。</p>
        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-cta px-6 py-2 font-bold text-text-white shadow-soft transition-colors duration-150 hover:bg-cta-hover"
        >
          トップページへ戻る
        </a>
      </div>
    </div>
  );
}

export default NotFoundPage;
```

- [x] 17.2 **ビルドが通ることを確認**
コマンド：`npx tsc -b && npx vite build`
期待結果：エラーなしで完了

- [x] 17.3 **コミット**
```bash
git add src/app/views/NotFoundPage.tsx
git commit -m "feat: NotFoundPageにブランドスタイルを適用"
```

---

### タスク 18：全テストの通過確認とビルド検証

**関連ファイル：**
- 全ファイル

- [x] 18.1 **全テストを実行**
コマンド：`npx vitest run`
期待結果：全テストPASS

- [x] 18.2 **TypeScriptビルドを実行**
コマンド：`npx tsc -b`
期待結果：型エラーなし

- [x] 18.3 **本番ビルドを実行**
コマンド：`npx vite build`
期待結果：ビルド成功

- [x] 18.4 **Lintを実行**
コマンド：`npx eslint .`
期待結果：エラーなし（警告のみ許容）
