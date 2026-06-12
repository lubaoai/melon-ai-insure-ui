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
  const [customerNumber, setCustomerNumber] = useState('');
  const navigate = useNavigate();

  const canProceed = confirmed && customerNumber.trim() !== '';

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
              onCustomerNumberChange={setCustomerNumber}
              onBack={() => navigate('/')}
              onNext={() => navigate('/application-input')}
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
