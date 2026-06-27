import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContractDateSection } from '../components/application/ContractDateSection';

describe('ContractDateSection コンポーネント', () => {
  it('見出し「① 契約希望日」が表示されること', () => {
    render(<ContractDateSection onChange={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /① 契約希望日/ })).toBeInTheDocument();
  });

  it('契約希望日の入力フィールドが表示されること', () => {
    render(<ContractDateSection onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText('yyyy/mm/dd')).toBeInTheDocument();
  });

  it('必須バッジが表示されること', () => {
    render(<ContractDateSection onChange={vi.fn()} />);
    expect(screen.getByText('必須')).toBeInTheDocument();
  });

  it('注記テキストが表示されること', () => {
    render(<ContractDateSection onChange={vi.fn()} />);
    expect(screen.getByText(/家財保険をお申込みの場合/)).toBeInTheDocument();
  });

  it('日付入力でonChangeが呼ばれること', async () => {
    const handleChange = vi.fn();
    render(<ContractDateSection onChange={handleChange} />);
    await userEvent.type(screen.getByPlaceholderText('yyyy/mm/dd'), '2026/07/01');
    expect(handleChange).toHaveBeenCalled();
  });

  it('value propsが指定された場合、その値で初期化されること', () => {
    render(<ContractDateSection onChange={vi.fn()} value="2026/07/04" />);
    expect(screen.getByDisplayValue('2026/07/04')).toBeInTheDocument();
  });
});
