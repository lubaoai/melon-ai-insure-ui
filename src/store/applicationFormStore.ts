import { create } from 'zustand';
import type { ContractCourseData } from '../components/application/ContractCourseSection';
import type { HousingOverviewData } from '../components/application/HousingOverviewSection';
import type { ContractorInfoData } from '../components/application/ContractorInfoSection';
import type { ResidenceLocationData } from '../components/application/ResidenceLocationSection';
import type { PrimaryResidentData } from '../components/application/PrimaryResidentSection';
import type { CoResidentData } from '../components/application/CoResidentSection';

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
  hasData: () => get().contractDate.trim() !== '' || get().contractorInfo.name.trim() !== '',
}));
