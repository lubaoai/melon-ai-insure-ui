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
