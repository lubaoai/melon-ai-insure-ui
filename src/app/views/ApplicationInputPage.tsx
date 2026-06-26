import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepNavigation } from '../../components/layout/StepNavigation';
import { QASidebar } from '../../components/home/QASidebar';
import { ScrollTopButton } from '../../components/ui/ScrollTopButton';
import { ContractDateSection } from '../../components/application/ContractDateSection';
import { ContractCourseSection } from '../../components/application/ContractCourseSection';
import { HousingOverviewSection } from '../../components/application/HousingOverviewSection';
import { ContractorInfoSection } from '../../components/application/ContractorInfoSection';
import { ResidenceLocationSection } from '../../components/application/ResidenceLocationSection';
import { PrimaryResidentSection } from '../../components/application/PrimaryResidentSection';
import { CoResidentSection } from '../../components/application/CoResidentSection';
import { NavigationButtons } from '../../components/application/NavigationButtons';
import type { ContractorAddress } from '../../components/application/ResidenceLocationSection';
import { useApplicationFormStore } from '../../store/applicationFormStore';

const qaItems = [
  { question: '保険の開始はいつからですか？', answer: 'お申し込み画面にてお客さまがご入力された契約希望日から補償が開始されます。' },
  { question: 'インターネットで申込みをしても保険証券・約款は届きますか？', answer: '保険証券はお送りしておりません。ご契約時に登録頂いたメールアドレスに「マイページ」開設の案内をお送りします。' },
  { question: '保険金額をどのように決めたら良いですか？', answer: '全ての家財の再調達価額（全て買い揃えた場合に必要な概算額）を基準に決定します。' },
];

function ApplicationInputPage() {
  const navigate = useNavigate();
  const {
    contractDate, contractCourse, housingOverview, contractorInfo,
    residenceLocation, primaryResident, coResident,
    setContractDate, setContractCourse, setHousingOverview, setContractorInfo,
    setResidenceLocation, setPrimaryResident, setCoResident,
  } = useApplicationFormStore();

  const isCorporate = contractorInfo.contractType === '2';
  const isDifferentResident = primaryResident.residentType === '0';

  const contractorAddress: ContractorAddress = useMemo(() => ({
    postalCode: contractorInfo.postalCode,
    address: contractorInfo.address,
    buildingName: contractorInfo.buildingName,
    addressKana: contractorInfo.addressKana,
  }), [contractorInfo.postalCode, contractorInfo.address, contractorInfo.buildingName, contractorInfo.addressKana]);

  const canProceed = useMemo(() => {
    // ①契約希望日
    if (!contractDate.trim()) return false;

    // ②ご契約コース
    if (!contractCourse.planType.trim()) return false;

    // ③住居の概要
    if (!housingOverview.totalFloors.trim()) return false;
    if (housingOverview.housingType === '2' && !housingOverview.residentFloor.trim()) return false;

    // ④ご契約者様の情報
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

    // ⑤住居の所在地
    if (!residenceLocation.postalCode.trim()) return false;
    if (!residenceLocation.address.trim()) return false;
    if (!residenceLocation.addressKana.trim()) return false;

    // ⑥主たる居住者
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

    // ⑦同居人の明細 — hasCoResidentがtrueの場合のみ同居人1の必須チェック
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

export default ApplicationInputPage;
