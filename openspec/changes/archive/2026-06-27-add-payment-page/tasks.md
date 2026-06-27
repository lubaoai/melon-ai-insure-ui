### タスク 1：CreditCardInfoData 型定義と Zustand ストア拡張

**関連ファイル：**
- 修正：src/store/applicationFormStore.ts
- テスト：src/__tests__/applicationFormStore.payment.test.ts

- [x] 1.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { useApplicationFormStore } from '../store/applicationFormStore';

describe('applicationFormStore 決済情報', () => {
  beforeEach(() => {
    useApplicationFormStore.setState({
      paymentMethod: 'credit',
      creditCardInfo: { cardNumber: '', expiryMonth: '', expiryYear: '', cardHolder: '', securityCode: '' },
    });
  });

  it('paymentMethod の初期値が credit であること', () => {
    const state = useApplicationFormStore.getState();
    expect(state.paymentMethod).toBe('credit');
  });

  it('creditCardInfo の初期値が全て空文字であること', () => {
    const state = useApplicationFormStore.getState();
    expect(state.creditCardInfo).toEqual({
      cardNumber: '', expiryMonth: '', expiryYear: '', cardHolder: '', securityCode: '',
    });
  });

  it('setPaymentMethod が paymentMethod を更新すること', () => {
    useApplicationFormStore.getState().setPaymentMethod('bank');
    expect(useApplicationFormStore.getState().paymentMethod).toBe('bank');
  });

  it('setCreditCardInfo が creditCardInfo を更新すること', () => {
    const data = { cardNumber: '1234567890123456', expiryMonth: '12', expiryYear: '30', cardHolder: 'TARO YAMADA', securityCode: '123' };
    useApplicationFormStore.getState().setCreditCardInfo(data);
    expect(useApplicationFormStore.getState().creditCardInfo).toEqual(data);
  });
});
```

- [x] 1.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/applicationFormStore.payment.test.ts`
期待結果：FAIL — Type error: paymentMethod, creditCardInfo が存在しない

- [x] 1.3 **最小実装を書く**
`src/store/applicationFormStore.ts` に以下を追加：

型定義をファイル先頭に追加：
```typescript
export interface CreditCardInfoData {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cardHolder: string;
  securityCode: string;
}
```

`ApplicationFormState` インターフェースに追加：
```typescript
paymentMethod: string;
creditCardInfo: CreditCardInfoData;
setPaymentMethod: (method: string) => void;
setCreditCardInfo: (data: CreditCardInfoData) => void;
```

ストア実装に追加（`coResident` の後）：
```typescript
paymentMethod: 'credit',
creditCardInfo: { cardNumber: '', expiryMonth: '', expiryYear: '', cardHolder: '', securityCode: '' },
setPaymentMethod: (method) => set({ paymentMethod: method }),
setCreditCardInfo: (data) => set({ creditCardInfo: data }),
```

- [x] 1.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/applicationFormStore.payment.test.ts`
期待結果：PASS

- [x] 1.5 **コミット**
```bash
git add src/store/applicationFormStore.ts src/__tests__/applicationFormStore.payment.test.ts
git commit -m "feat: add CreditCardInfoData type and payment state to applicationFormStore"
```

---

### タスク 2：PaymentMethodSection コンポーネント

**関連ファイル：**
- 新規：src/components/payment/PaymentMethodSection.tsx
- テスト：src/__tests__/PaymentMethodSection.test.tsx

- [x] 2.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PaymentMethodSection } from '../components/payment/PaymentMethodSection';

describe('PaymentMethodSection コンポーネント', () => {
  it('見出し「お支払方法」が表示されること', () => {
    render(<PaymentMethodSection value="credit" onChange={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /お支払方法/ })).toBeInTheDocument();
  });

  it('クレジットカード払いのラジオボタンが表示されること', () => {
    render(<PaymentMethodSection value="credit" onChange={vi.fn()} />);
    expect(screen.getByLabelText('クレジットカード払')).toBeInTheDocument();
  });

  it('value が credit の場合、クレジットカード払いが選択状態であること', () => {
    render(<PaymentMethodSection value="credit" onChange={vi.fn()} />);
    expect(screen.getByLabelText('クレジットカード払')).toBeChecked();
  });

  it('ラジオボタンを変更した際に onChange が呼ばれること', () => {
    const onChange = vi.fn();
    render(<PaymentMethodSection value="credit" onChange={onChange} />);
    screen.getByLabelText('クレジットカード払').click();
    expect(onChange).toHaveBeenCalledWith('credit');
  });
});
```

- [x] 2.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/PaymentMethodSection.test.tsx`
期待結果：FAIL — Cannot find module '../components/payment/PaymentMethodSection'

- [x] 2.3 **最小実装を書く**
`src/components/payment/PaymentMethodSection.tsx`：
```typescript
interface PaymentMethodSectionProps {
  value: string;
  onChange: (method: string) => void;
}

export function PaymentMethodSection({ value, onChange }: PaymentMethodSectionProps) {
  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          お支払方法
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                name="paymentMethod"
                value="credit"
                checked={value === 'credit'}
                onChange={() => onChange('credit')}
              />
              クレジットカード払
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [x] 2.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/PaymentMethodSection.test.tsx`
期待結果：PASS

- [x] 2.5 **コミット**
```bash
git add src/components/payment/PaymentMethodSection.tsx src/__tests__/PaymentMethodSection.test.tsx
git commit -m "feat: add PaymentMethodSection component with credit card radio"
```

---

### タスク 3：CreditCardSection コンポーネント（入力フィールド表示）

**関連ファイル：**
- 新規：src/components/payment/CreditCardSection.tsx
- テスト：src/__tests__/CreditCardSection.test.tsx

- [x] 3.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CreditCardSection } from '../components/payment/CreditCardSection';
import type { CreditCardInfoData } from '../store/applicationFormStore';

const defaultData: CreditCardInfoData = {
  cardNumber: '', expiryMonth: '', expiryYear: '', cardHolder: '', securityCode: '',
};

describe('CreditCardSection コンポーネント', () => {
  it('見出し「クレジットカード情報」が表示されること', () => {
    render(<CreditCardSection data={defaultData} onChange={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /クレジットカード情報/ })).toBeInTheDocument();
  });

  it('カード番号の入力フィールドが表示されること', () => {
    render(<CreditCardSection data={defaultData} onChange={vi.fn()} />);
    expect(screen.getByLabelText('カード番号')).toBeInTheDocument();
  });

  it('有効期限の入力フィールドが表示されること', () => {
    render(<CreditCardSection data={defaultData} onChange={vi.fn()} />);
    expect(screen.getByLabelText('有効期限（月）')).toBeInTheDocument();
    expect(screen.getByLabelText('有効期限（年）')).toBeInTheDocument();
  });

  it('カード名義人の入力フィールドが表示されること', () => {
    render(<CreditCardSection data={defaultData} onChange={vi.fn()} />);
    expect(screen.getByLabelText('カード名義人')).toBeInTheDocument();
  });

  it('セキュリティコードの入力フィールドが表示されること', () => {
    render(<CreditCardSection data={defaultData} onChange={vi.fn()} />);
    expect(screen.getByLabelText('セキュリティコード')).toBeInTheDocument();
  });

  it('必須バッジが4つ表示されること', () => {
    render(<CreditCardSection data={defaultData} onChange={vi.fn()} />);
    const badges = screen.getAllByText('必須');
    expect(badges).toHaveLength(4);
  });

  it('カード番号入力で onChange が呼ばれること', () => {
    const onChange = vi.fn();
    render(<CreditCardSection data={defaultData} onChange={onChange} />);
    const input = screen.getByLabelText('カード番号');
    input.focus();
    input.value = '4242424242424242';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    expect(onChange).toHaveBeenCalledWith({ ...defaultData, cardNumber: '4242424242424242' });
  });
});
```

- [x] 3.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/CreditCardSection.test.tsx`
期待結果：FAIL — Cannot find module '../components/payment/CreditCardSection'

- [x] 3.3 **最小実装を書く**
`src/components/payment/CreditCardSection.tsx`：
```typescript
import { useCallback } from 'react';
import { FormRow } from '../application/FormRow';
import type { CreditCardInfoData } from '../../store/applicationFormStore';

interface CreditCardSectionProps {
  data: CreditCardInfoData;
  onChange: (data: CreditCardInfoData) => void;
}

export function CreditCardSection({ data, onChange }: CreditCardSectionProps) {
  const updateField = useCallback(
    (field: keyof CreditCardInfoData, value: string) => {
      onChange({ ...data, [field]: value });
    },
    [data, onChange],
  );

  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          クレジットカード情報
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <FormRow label="カード番号" required>
              <input
                aria-label="カード番号"
                type="text"
                maxLength={16}
                value={data.cardNumber}
                onChange={(e) => updateField('cardNumber', e.target.value.replace(/\D/g, ''))}
                className="h-[30px] w-full max-w-[300px] rounded-lg border border-border bg-white px-2 text-base text-text-primary focus:border-sub1 focus:outline-none"
                placeholder="1234567890123456"
              />
            </FormRow>

            <FormRow label="有効期限" required className="mt-2" inputClassName="flex items-center gap-2">
              <input
                aria-label="有効期限（月）"
                type="text"
                maxLength={2}
                value={data.expiryMonth}
                onChange={(e) => updateField('expiryMonth', e.target.value.replace(/\D/g, ''))}
                className="h-[30px] w-[60px] rounded-lg border border-border bg-white px-2 text-base text-text-primary focus:border-sub1 focus:outline-none"
                placeholder="MM"
              />
              <span>/</span>
              <input
                aria-label="有効期限（年）"
                type="text"
                maxLength={2}
                value={data.expiryYear}
                onChange={(e) => updateField('expiryYear', e.target.value.replace(/\D/g, ''))}
                className="h-[30px] w-[60px] rounded-lg border border-border bg-white px-2 text-base text-text-primary focus:border-sub1 focus:outline-none"
                placeholder="YY"
              />
            </FormRow>

            <FormRow label="カード名義人" required className="mt-2">
              <input
                aria-label="カード名義人"
                type="text"
                value={data.cardHolder}
                onChange={(e) => updateField('cardHolder', e.target.value.toUpperCase())}
                className="h-[30px] w-full max-w-[300px] rounded-lg border border-border bg-white px-2 text-base text-text-primary focus:border-sub1 focus:outline-none"
                placeholder="TARO YAMADA"
              />
            </FormRow>

            <FormRow label="セキュリティコード" required className="mt-2">
              <input
                aria-label="セキュリティコード"
                type="text"
                maxLength={4}
                value={data.securityCode}
                onChange={(e) => updateField('securityCode', e.target.value.replace(/\D/g, ''))}
                className="h-[30px] w-[80px] rounded-lg border border-border bg-white px-2 text-base text-text-primary focus:border-sub1 focus:outline-none"
                placeholder="123"
              />
            </FormRow>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [x] 3.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/CreditCardSection.test.tsx`
期待結果：PASS

- [x] 3.5 **コミット**
```bash
git add src/components/payment/CreditCardSection.tsx src/__tests__/CreditCardSection.test.tsx
git commit -m "feat: add CreditCardSection component with input fields"
```

---

### タスク 4：CreditCardSection バリデーション関数

**関連ファイル：**
- 新規：src/utils/creditCardValidation.ts
- テスト：src/__tests__/creditCardValidation.test.ts

- [x] 4.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { validateCreditCardInfo } from '../utils/creditCardValidation';
import type { CreditCardInfoData } from '../store/applicationFormStore';

const validData: CreditCardInfoData = {
  cardNumber: '4242424242424242',
  expiryMonth: '12',
  expiryYear: '30',
  cardHolder: 'TARO YAMADA',
  securityCode: '123',
};

describe('validateCreditCardInfo', () => {
  it('全フィールドが正常な場合、isValid=true で errors が空であること', () => {
    const result = validateCreditCardInfo(validData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('カード番号が空の場合、isValid=false で cardNumber エラーであること', () => {
    const result = validateCreditCardInfo({ ...validData, cardNumber: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.cardNumber).toBe('カード番号を入力してください');
  });

  it('カード番号が16桁未満の場合、isValid=false で cardNumber エラーであること', () => {
    const result = validateCreditCardInfo({ ...validData, cardNumber: '424242424242424' });
    expect(result.isValid).toBe(false);
    expect(result.errors.cardNumber).toBe('カード番号は16桁で入力してください');
  });

  it('有効期限の月が空の場合、isValid=false で expiryMonth エラーであること', () => {
    const result = validateCreditCardInfo({ ...validData, expiryMonth: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.expiryMonth).toBe('有効期限（月）を入力してください');
  });

  it('有効期限の月が00の場合、isValid=false で expiryMonth エラーであること', () => {
    const result = validateCreditCardInfo({ ...validData, expiryMonth: '00' });
    expect(result.isValid).toBe(false);
    expect(result.errors.expiryMonth).toBe('有効期限（月）は01〜12で入力してください');
  });

  it('有効期限の月が13の場合、isValid=false で expiryMonth エラーであること', () => {
    const result = validateCreditCardInfo({ ...validData, expiryMonth: '13' });
    expect(result.isValid).toBe(false);
    expect(result.errors.expiryMonth).toBe('有効期限（月）は01〜12で入力してください');
  });

  it('有効期限の年が空の場合、isValid=false で expiryYear エラーであること', () => {
    const result = validateCreditCardInfo({ ...validData, expiryYear: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.expiryYear).toBe('有効期限（年）を入力してください');
  });

  it('カード名義人が空の場合、isValid=false で cardHolder エラーであること', () => {
    const result = validateCreditCardInfo({ ...validData, cardHolder: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.cardHolder).toBe('カード名義人を入力してください');
  });

  it('セキュリティコードが空の場合、isValid=false で securityCode エラーであること', () => {
    const result = validateCreditCardInfo({ ...validData, securityCode: '' });
    expect(result.isValid).toBe(false);
    expect(result.errors.securityCode).toBe('セキュリティコードを入力してください');
  });

  it('セキュリティコードが2桁の場合、isValid=false で securityCode エラーであること', () => {
    const result = validateCreditCardInfo({ ...validData, securityCode: '12' });
    expect(result.isValid).toBe(false);
    expect(result.errors.securityCode).toBe('セキュリティコードは3〜4桁で入力してください');
  });
});
```

- [x] 4.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/creditCardValidation.test.ts`
期待結果：FAIL — Cannot find module '../utils/creditCardValidation'

- [x] 4.3 **最小実装を書く**
`src/utils/creditCardValidation.ts`：
```typescript
import type { CreditCardInfoData } from '../store/applicationFormStore';

interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof CreditCardInfoData, string>>;
}

export function validateCreditCardInfo(data: CreditCardInfoData): ValidationResult {
  const errors: Partial<Record<keyof CreditCardInfoData, string>> = {};

  if (!data.cardNumber) {
    errors.cardNumber = 'カード番号を入力してください';
  } else if (data.cardNumber.length !== 16) {
    errors.cardNumber = 'カード番号は16桁で入力してください';
  }

  if (!data.expiryMonth) {
    errors.expiryMonth = '有効期限（月）を入力してください';
  } else if (Number(data.expiryMonth) < 1 || Number(data.expiryMonth) > 12) {
    errors.expiryMonth = '有効期限（月）は01〜12で入力してください';
  }

  if (!data.expiryYear) {
    errors.expiryYear = '有効期限（年）を入力してください';
  }

  if (!data.cardHolder) {
    errors.cardHolder = 'カード名義人を入力してください';
  }

  if (!data.securityCode) {
    errors.securityCode = 'セキュリティコードを入力してください';
  } else if (data.securityCode.length < 3) {
    errors.securityCode = 'セキュリティコードは3〜4桁で入力してください';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
```

- [x] 4.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/creditCardValidation.test.ts`
期待結果：PASS

- [x] 4.5 **コミット**
```bash
git add src/utils/creditCardValidation.ts src/__tests__/creditCardValidation.test.ts
git commit -m "feat: add validateCreditCardInfo function with validation rules"
```

---

### タスク 5：PaymentAmountSection コンポーネント

**関連ファイル：**
- 新規：src/components/payment/PaymentAmountSection.tsx
- テスト：src/__tests__/PaymentAmountSection.test.tsx

- [x] 5.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PaymentAmountSection } from '../components/payment/PaymentAmountSection';

describe('PaymentAmountSection コンポーネント', () => {
  it('見出し「お支払金額」が表示されること', () => {
    render(<PaymentAmountSection amount={0} />);
    expect(screen.getByRole('heading', { name: /お支払金額/ })).toBeInTheDocument();
  });

  it('金額が0円の場合、「0円」と表示されること', () => {
    render(<PaymentAmountSection amount={0} />);
    expect(screen.getByText('0円')).toBeInTheDocument();
  });

  it('金額がカンマ区切りで表示されること', () => {
    render(<PaymentAmountSection amount={15000} />);
    expect(screen.getByText('15,000円')).toBeInTheDocument();
  });
});
```

- [x] 5.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/PaymentAmountSection.test.tsx`
期待結果：FAIL — Cannot find module '../components/payment/PaymentAmountSection'

- [x] 5.3 **最小実装を書く**
`src/components/payment/PaymentAmountSection.tsx`：
```typescript
interface PaymentAmountSectionProps {
  amount: number;
}

export function PaymentAmountSection({ amount }: PaymentAmountSectionProps) {
  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          お支払金額
        </h1>
        <div className="bg-cream">
          <div className="m-2">
            <div className="grid grid-cols-1 min-[875px]:grid-cols-[260px_1fr] w-full">
              <div className="border border-border bg-label-bg px-3 py-2 text-sm font-bold text-text-primary flex items-center min-[875px]:whitespace-nowrap">
                保険料合計
              </div>
              <div className="border border-border bg-input-bg px-3 py-2 border-t-0 min-[875px]:border-t min-[875px]:border-l-0">
                <b className="text-base text-text-primary">{amount.toLocaleString()}円</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [x] 5.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/PaymentAmountSection.test.tsx`
期待結果：PASS

- [x] 5.5 **コミット**
```bash
git add src/components/payment/PaymentAmountSection.tsx src/__tests__/PaymentAmountSection.test.tsx
git commit -m "feat: add PaymentAmountSection component"
```

---

### タスク 6：PaymentCautionSection コンポーネント

**関連ファイル：**
- 新規：src/components/payment/PaymentCautionSection.tsx
- テスト：src/__tests__/PaymentCautionSection.test.tsx

- [x] 6.1 **失敗するテストを書く**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PaymentCautionSection } from '../components/payment/PaymentCautionSection';

describe('PaymentCautionSection コンポーネント', () => {
  it('見出し「注意喚起」が表示されること', () => {
    render(<PaymentCautionSection />);
    expect(screen.getByRole('heading', { name: /注意喚起/ })).toBeInTheDocument();
  });

  it('注意喚起の内容がスクロール領域に表示されること', () => {
    render(<PaymentCautionSection />);
    expect(screen.getByText(/クレジットカードのお支払いに関する/)).toBeInTheDocument();
  });

  it('スクロール領域の高さが300pxであること', () => {
    render(<PaymentCautionSection />);
    const scrollArea = screen.getByTestId('caution-scroll-area');
    expect(scrollArea).toHaveStyle({ height: '300px', overflowY: 'auto' });
  });
});
```

- [x] 6.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/PaymentCautionSection.test.tsx`
期待結果：FAIL — Cannot find module '../components/payment/PaymentCautionSection'

- [x] 6.3 **最小実装を書く**
`src/components/payment/PaymentCautionSection.tsx`：
```typescript
const cautionText = `クレジットカードのお支払いに関する注意事項

・クレジットカードでお支払いの場合、お申込み完了後に決済が行われます。
・ご利用いただけるクレジットカードは、VISA、Mastercard、JCB、AMERICAN EXPRESS、Diners Club です。
・デビットカード・プリペイドカードはご利用いただけない場合がございます。
・カードの有効期限が切れている場合は決済ができませんのでご注意ください。
・決済が完了した後、ご登録のメールアドレスに確認メールをお送りします。
・カード番号等の情報は暗号化されて送信されます。`;

export function PaymentCautionSection() {
  return (
    <div className="m-2">
      <div className="border-4 border-[#b40081] mt-4">
        <h1 className="bg-[#b40081] text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          注意喚起
        </h1>
        <div className="bg-cream">
          <div
            data-testid="caution-scroll-area"
            className="m-2 p-2 text-sm text-text-primary whitespace-pre-line border border-border bg-white"
            style={{ height: '300px', overflowY: 'auto' }}
          >
            {cautionText}
          </div>
          <div className="m-2">
            <a href="#" className="text-sm text-[#b40081] font-bold underline">
              ＞全文を見る
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [x] 6.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/PaymentCautionSection.test.tsx`
期待結果：PASS

- [x] 6.5 **コミット**
```bash
git add src/components/payment/PaymentCautionSection.tsx src/__tests__/PaymentCautionSection.test.tsx
git commit -m "feat: add PaymentCautionSection component"
```

---

### タスク 7：PaymentPage ページコンポーネントとルーティング

**関連ファイル：**
- 新規：src/app/views/PaymentPage.tsx
- 修正：src/router/index.tsx
- テスト：src/__tests__/PaymentPage.test.tsx

- [x] 7.1 **失敗するテストを書く**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PaymentPage } from '../app/views/PaymentPage';

vi.mock('../store/applicationFormStore', () => ({
  useApplicationFormStore: () => ({
    hasData: () => true,
    paymentMethod: 'credit',
    creditCardInfo: { cardNumber: '', expiryMonth: '', expiryYear: '', cardHolder: '', securityCode: '' },
    contractCourse: { insurancePeriod: '1', paymentMethod: '5', product: 'K008', planType: '' },
    setPaymentMethod: vi.fn(),
    setCreditCardInfo: vi.fn(),
  }),
}));

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <PaymentPage />
    </MemoryRouter>,
  );
}

describe('PaymentPage コンポーネント', () => {
  it('ステップナビゲーションで⑤決済手続きがアクティブであること', () => {
    renderWithRouter();
    expect(screen.getByText('⑤決済手続き')).toBeInTheDocument();
  });

  it('お支払方法セクションが表示されること', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { name: /お支払方法/ })).toBeInTheDocument();
  });

  it('クレジットカード情報セクションが表示されること', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { name: /クレジットカード情報/ })).toBeInTheDocument();
  });

  it('お支払金額セクションが表示されること', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { name: /お支払金額/ })).toBeInTheDocument();
  });

  it('注意喚起セクションが表示されること', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { name: /注意喚起/ })).toBeInTheDocument();
  });

  it('戻るボタンと次へボタンが表示されること', () => {
    renderWithRouter();
    expect(screen.getByText('戻る')).toBeInTheDocument();
    expect(screen.getByText('次へ')).toBeInTheDocument();
  });

  it('初期状態では次へボタンが無効であること', () => {
    renderWithRouter();
    expect(screen.getByText('次へ').closest('button')).toBeDisabled();
  });

  it('スクロールトップボタンが表示されること', () => {
    renderWithRouter();
    expect(screen.getByLabelText('ページトップへ戻る')).toBeInTheDocument();
  });
});
```

- [x] 7.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/PaymentPage.test.tsx`
期待結果：FAIL — Cannot find module '../app/views/PaymentPage'

- [x] 7.3 **最小実装を書く**
`src/app/views/PaymentPage.tsx`：
```typescript
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepNavigation } from '../../components/layout/StepNavigation';
import { QASidebar } from '../../components/home/QASidebar';
import { ScrollTopButton } from '../../components/ui/ScrollTopButton';
import { NavigationButtons } from '../../components/application/NavigationButtons';
import { PaymentMethodSection } from '../../components/payment/PaymentMethodSection';
import { CreditCardSection } from '../../components/payment/CreditCardSection';
import { PaymentAmountSection } from '../../components/payment/PaymentAmountSection';
import { PaymentCautionSection } from '../../components/payment/PaymentCautionSection';
import { useApplicationFormStore } from '../../store/applicationFormStore';
import { validateCreditCardInfo } from '../../utils/creditCardValidation';

const qaItems = [
  { question: 'どのクレジットカードが使えますか？', answer: 'VISA、Mastercard、JCB、AMERICAN EXPRESS、Diners Clubがご利用いただけます。' },
  { question: 'デビットカードは使えますか？', answer: 'デビットカード・プリペイドカードはご利用いただけない場合がございます。' },
  { question: '支払いはいつ行われますか？', answer: 'お申込み完了後に決済が行われます。' },
];

function PaymentPage() {
  const navigate = useNavigate();
  const store = useApplicationFormStore();

  const [paymentMethod, setPaymentMethod] = useState(store.paymentMethod);
  const [creditCardInfo, setCreditCardInfo] = useState(store.creditCardInfo);

  useEffect(() => {
    if (!store.hasData()) {
      navigate('/application-input', { replace: true });
    }
  }, [store, navigate]);

  const handlePaymentMethodChange = useCallback((method: string) => {
    setPaymentMethod(method);
    store.setPaymentMethod(method);
  }, [store]);

  const handleCreditCardInfoChange = useCallback((data: typeof creditCardInfo) => {
    setCreditCardInfo(data);
    store.setCreditCardInfo(data);
  }, [store]);

  const isValid = validateCreditCardInfo(creditCardInfo).isValid;

  const handleBack = useCallback(() => {
    navigate('/application-confirmation');
  }, [navigate]);

  const handleNext = useCallback(() => {
    console.log('PaymentPage: next clicked — proceed to completion');
  }, []);

  return (
    <div className="bg-white font-sans">
      <StepNavigation currentStep={5} />

      <main className="px-4 py-4">
        <div className="flex flex-col gap-4 min-[875px]:flex-row">
          <div className="w-full min-[875px]:w-[800px]">
            <PaymentMethodSection value={paymentMethod} onChange={handlePaymentMethodChange} />
            <CreditCardSection data={creditCardInfo} onChange={handleCreditCardInfoChange} />
            <PaymentAmountSection amount={0} />
            <PaymentCautionSection />
            <NavigationButtons canProceed={isValid} onBack={handleBack} onNext={handleNext} />
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

export default PaymentPage;
```

`src/router/index.tsx` にルートを追加：
```typescript
import { Routes, Route } from 'react-router-dom';
import HomePage from '../app/views/HomePage';
import IntentConfirmationPage from '../app/views/IntentConfirmationPage';
import ApplicationInputPage from '../app/views/ApplicationInputPage';
import ApplicationConfirmationPage from '../app/views/ApplicationConfirmationPage';
import PaymentPage from '../app/views/PaymentPage';
import NotFoundPage from '../app/views/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/intent-confirmation" element={<IntentConfirmationPage />} />
      <Route path="/application-input" element={<ApplicationInputPage />} />
      <Route path="/application-confirmation" element={<ApplicationConfirmationPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
```

- [x] 7.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/PaymentPage.test.tsx`
期待結果：PASS

- [x] 7.5 **コミット**
```bash
git add src/app/views/PaymentPage.tsx src/router/index.tsx src/__tests__/PaymentPage.test.tsx
git commit -m "feat: add PaymentPage with routing at /payment"
```

---

### タスク 8：ApplicationConfirmationPage の次へボタン遷移先変更

**関連ファイル：**
- 修正：src/app/views/ApplicationConfirmationPage.tsx
- テスト：src/__tests__/ApplicationConfirmationPage.test.tsx

- [x] 8.1 **失敗するテストを書く**
`src/__tests__/ApplicationConfirmationPage.test.tsx` に追加：
```typescript
it('次へボタンをクリックすると /payment に遷移すること', async () => {
  const mockNavigate = vi.fn();
  vi.mocked(useNavigate).mockReturnValue(mockNavigate);

  vi.mocked(useApplicationFormStore).mockReturnValue({
    hasData: () => true,
    contractDate: '2026-01-01',
    contractCourse: { insurancePeriod: '1', paymentMethod: '5', product: 'K008', planType: '1Y8C' },
    housingOverview: { structure: '1', housingType: '2', totalFloors: '10', residentFloor: '5' },
    contractorInfo: { contractType: '1', corporateName: '', corporateNameKana: '', positionName: '', name: '山田太郎', nameKana: 'ヤマダタロウ', sex: '1', birthYear: '1990', birthMonth: '01', birthDay: '01', postalCode: '1000001', address: '東京都千代田区千代田1-1', buildingName: '', addressKana: '', phone1: '03', phone2: '1234', phone3: '5678' },
    residenceLocation: { postalCode: '1000001', address: '東京都千代田区千代田1-1', buildingName: '', addressKana: '' },
    primaryResident: { residentType: '1', name: '', nameKana: '', sex: '1', birthYear: '', birthMonth: '', birthDay: '', relationship: '', relationshipNote: '', phone1: '', phone2: '', phone3: '' },
    coResident: { hasCoResident: false, residents: [] },
    setContractDate: vi.fn(),
    setContractCourse: vi.fn(),
    setHousingOverview: vi.fn(),
    setContractorInfo: vi.fn(),
    setResidenceLocation: vi.fn(),
    setPrimaryResident: vi.fn(),
    setCoResident: vi.fn(),
  } as any);

  render(
    <MemoryRouter>
      <ApplicationConfirmationPage />
    </MemoryRouter>,
  );

  const nextButton = screen.getByText('次へ').closest('button')!;
  fireEvent.click(nextButton);
  expect(mockNavigate).toHaveBeenCalledWith('/payment');
});
```

- [x] 8.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/ApplicationConfirmationPage.test.tsx`
期待結果：FAIL — expect(mockNavigate).toHaveBeenCalledWith('/payment') が失敗（現在は console.log のみ）

- [x] 8.3 **最小実装を書く**
`src/app/views/ApplicationConfirmationPage.tsx` の `handleNext` を変更：
```typescript
const handleNext = useCallback(() => {
  navigate('/payment');
}, [navigate]);
```

- [x] 8.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/ApplicationConfirmationPage.test.tsx`
期待結果：PASS

- [x] 8.5 **コミット**
```bash
git add src/app/views/ApplicationConfirmationPage.tsx src/__tests__/ApplicationConfirmationPage.test.tsx
git commit -m "feat: navigate to /payment from ApplicationConfirmationPage next button"
```

---

### タスク 9：全テストの統合確認

**関連ファイル：**
- なし（既存ファイルの確認のみ）

- [x] 9.1 **全テストを実行して成功を確認**
コマンド：`npx vitest run`
期待結果：PASS — 全テストが成功

- [x] 9.2 **コミット**
```bash
git add -A
git commit -m "test: verify all tests pass with payment page integration"
```
