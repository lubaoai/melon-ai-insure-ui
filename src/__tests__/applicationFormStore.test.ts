import { describe, it, expect, beforeEach } from 'vitest';
import { useApplicationFormStore } from '../store/applicationFormStore';

describe('applicationFormStore', () => {
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
      primaryResident: {
        residentType: '', name: '', nameKana: '', sex: '1',
        birthYear: '', birthMonth: '', birthDay: '',
        relationship: '', relationshipNote: '',
        phone1: '', phone2: '', phone3: '',
      },
      coResident: { hasCoResident: false, residents: [] },
    });
  });

  it('初期状態が正しいこと', () => {
    const state = useApplicationFormStore.getState();
    expect(state.contractDate).toBe('');
    expect(state.contractCourse.planType).toBe('');
  });

  it('setContractDateで契約希望日を更新できること', () => {
    useApplicationFormStore.getState().setContractDate('2026/07/01');
    expect(useApplicationFormStore.getState().contractDate).toBe('2026/07/01');
  });

  it('setContractCourseでご契約コースを更新できること', () => {
    useApplicationFormStore.getState().setContractCourse({ insurancePeriod: '2', paymentMethod: '5', product: 'K008', planType: '1Y8C' });
    expect(useApplicationFormStore.getState().contractCourse.insurancePeriod).toBe('2');
    expect(useApplicationFormStore.getState().contractCourse.planType).toBe('1Y8C');
  });

  it('setHousingOverviewで住居の概要を更新できること', () => {
    useApplicationFormStore.getState().setHousingOverview({ structure: '2', housingType: '1', totalFloors: '2', residentFloor: '' });
    expect(useApplicationFormStore.getState().housingOverview.structure).toBe('2');
  });

  it('setContractorInfoでご契約者様の情報を更新できること', () => {
    useApplicationFormStore.getState().setContractorInfo({
      contractType: '2', corporateName: 'テスト株式会社', corporateNameKana: 'テストカブシキガイシャ', positionName: '社長',
      name: '山田太郎', nameKana: 'ヤマダタロウ', sex: '1', birthYear: '1980', birthMonth: '01', birthDay: '15',
      postalCode: '123-4567', address: '東京都新宿区西新宿1-1-1', buildingName: 'テストビル101', addressKana: 'トウキョウトシンジュククニシシンジュク1-1-1',
      phone1: '03', phone2: '1234', phone3: '5678',
    });
    expect(useApplicationFormStore.getState().contractorInfo.corporateName).toBe('テスト株式会社');
  });

  it('setResidenceLocationで住居の所在地を更新できること', () => {
    useApplicationFormStore.getState().setResidenceLocation({ postalCode: '100-0001', address: '東京都千代田区千代田1-1', buildingName: '皇居', addressKana: 'トウキョウトチヨダクチヨダ1-1' });
    expect(useApplicationFormStore.getState().residenceLocation.postalCode).toBe('100-0001');
  });

  it('setPrimaryResidentで主たる居住者を更新できること', () => {
    useApplicationFormStore.getState().setPrimaryResident({ residentType: '0', name: '', nameKana: '', sex: '1', birthYear: '', birthMonth: '', birthDay: '', relationship: '', relationshipNote: '', phone1: '', phone2: '', phone3: '' });
    expect(useApplicationFormStore.getState().primaryResident.residentType).toBe('0');
  });

  it('setCoResidentで同居人の明細を更新できること', () => {
    useApplicationFormStore.getState().setCoResident({ hasCoResident: true, residents: [{ name: '山田花子', nameKana: 'ヤマダハナコ', sex: '2', birthYear: '1985', birthMonth: '03', birthDay: '20', relationship: '1', relationshipNote: '' }] });
    expect(useApplicationFormStore.getState().coResident.hasCoResident).toBe(true);
    expect(useApplicationFormStore.getState().coResident.residents[0].name).toBe('山田花子');
  });

  it('hasDataはデータ未入力時にfalseを返すこと', () => {
    expect(useApplicationFormStore.getState().hasData()).toBe(false);
  });

  it('hasDataは契約希望日入力時にtrueを返すこと', () => {
    useApplicationFormStore.getState().setContractDate('2026/07/01');
    expect(useApplicationFormStore.getState().hasData()).toBe(true);
  });
});
