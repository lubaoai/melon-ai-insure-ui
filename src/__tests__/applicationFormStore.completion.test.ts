import { describe, it, expect, beforeEach } from 'vitest';
import { useApplicationFormStore } from '../store/applicationFormStore';

describe('applicationFormStore 申込み完了フラグ', () => {
  beforeEach(() => {
    useApplicationFormStore.setState({ isCompleted: false });
  });

  it('isCompleted の初期値が false であること', () => {
    expect(useApplicationFormStore.getState().isCompleted).toBe(false);
  });

  it('setIsCompleted で isCompleted を true に更新できること', () => {
    useApplicationFormStore.getState().setIsCompleted(true);
    expect(useApplicationFormStore.getState().isCompleted).toBe(true);
  });

  it('setIsCompleted で isCompleted を false に戻せること', () => {
    useApplicationFormStore.getState().setIsCompleted(true);
    useApplicationFormStore.getState().setIsCompleted(false);
    expect(useApplicationFormStore.getState().isCompleted).toBe(false);
  });
});
