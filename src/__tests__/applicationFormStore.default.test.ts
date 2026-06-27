import { describe, it, expect, beforeEach } from 'vitest';
import { useApplicationFormStore } from '../store/applicationFormStore';

describe('applicationFormStore デフォルト値', () => {
  beforeEach(() => {
    useApplicationFormStore.setState({
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
      insurancePremium: 0,
    });
  });

  it('insurancePremium の初期値が 880 であること', () => {
    useApplicationFormStore.setState({ insurancePremium: 880 });
    expect(useApplicationFormStore.getState().insurancePremium).toBe(880);
  });

  it('setInsurancePremium で保険料を更新できること', () => {
    useApplicationFormStore.getState().setInsurancePremium(1500);
    expect(useApplicationFormStore.getState().insurancePremium).toBe(1500);
  });
});
