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
    store.setIsCompleted(true);
    navigate('/application-completion');
  }, [store, navigate]);

  return (
    <div className="bg-white font-sans">
      <StepNavigation currentStep={5} />

      <main className="px-4 py-4">
        <div className="flex flex-col gap-4 min-[875px]:flex-row">
          <div className="w-full min-[875px]:w-[800px]">
            <PaymentMethodSection value={paymentMethod} onChange={handlePaymentMethodChange} />
            <CreditCardSection data={creditCardInfo} onChange={handleCreditCardInfoChange} />
            <PaymentAmountSection amount={store.insurancePremium} />
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
