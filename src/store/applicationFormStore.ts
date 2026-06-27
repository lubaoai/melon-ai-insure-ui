import { create } from 'zustand';
import type { ContractCourseData } from '../components/application/ContractCourseSection';
import type { HousingOverviewData } from '../components/application/HousingOverviewSection';
import type { ContractorInfoData } from '../components/application/ContractorInfoSection';
import type { ResidenceLocationData } from '../components/application/ResidenceLocationSection';
import type { PrimaryResidentData } from '../components/application/PrimaryResidentSection';
import type { CoResidentData } from '../components/application/CoResidentSection';
import { getDefaultContractDate } from '../utils/defaultContractDate';

export interface CreditCardInfoData {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cardHolder: string;
  securityCode: string;
}

interface ApplicationFormState {
  contractDate: string;
  contractCourse: ContractCourseData;
  housingOverview: HousingOverviewData;
  contractorInfo: ContractorInfoData;
  residenceLocation: ResidenceLocationData;
  primaryResident: PrimaryResidentData;
  coResident: CoResidentData;
  paymentMethod: string;
  creditCardInfo: CreditCardInfoData;
  setContractDate: (date: string) => void;
  setContractCourse: (data: ContractCourseData) => void;
  setHousingOverview: (data: HousingOverviewData) => void;
  setContractorInfo: (data: ContractorInfoData) => void;
  setResidenceLocation: (data: ResidenceLocationData) => void;
  setPrimaryResident: (data: PrimaryResidentData) => void;
  setCoResident: (data: CoResidentData) => void;
  setPaymentMethod: (method: string) => void;
  setCreditCardInfo: (data: CreditCardInfoData) => void;
  isCompleted: boolean;
  setIsCompleted: (value: boolean) => void;
  insurancePremium: number;
  setInsurancePremium: (amount: number) => void;
  hasData: () => boolean;
}

export const useApplicationFormStore = create<ApplicationFormState>((set, get) => ({
  contractDate: getDefaultContractDate(),
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
  primaryResident: {
    residentType: '', name: '', nameKana: '', sex: '1',
    birthYear: '', birthMonth: '', birthDay: '',
    relationship: '', relationshipNote: '',
    phone1: '', phone2: '', phone3: '',
  },
  coResident: { hasCoResident: false, residents: [] },
  paymentMethod: 'credit',
  creditCardInfo: { cardNumber: '', expiryMonth: '', expiryYear: '', cardHolder: '', securityCode: '' },
  setContractDate: (date) => set({ contractDate: date }),
  setContractCourse: (data) => set({ contractCourse: data }),
  setHousingOverview: (data) => set({ housingOverview: data }),
  setContractorInfo: (data) => set({ contractorInfo: data }),
  setResidenceLocation: (data) => set({ residenceLocation: data }),
  setPrimaryResident: (data) => set({ primaryResident: data }),
  setCoResident: (data) => set({ coResident: data }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setCreditCardInfo: (data) => set({ creditCardInfo: data }),
  isCompleted: false,
  setIsCompleted: (value) => set({ isCompleted: value }),
  insurancePremium: 880,
  setInsurancePremium: (amount) => set({ insurancePremium: amount }),
  hasData: () => get().contractDate.trim() !== '' || get().contractorInfo.name.trim() !== '',
}));
