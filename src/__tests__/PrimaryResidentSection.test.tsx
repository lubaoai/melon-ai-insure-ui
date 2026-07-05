import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PrimaryResidentSection } from '../components/application/PrimaryResidentSection';

describe('PrimaryResidentSection コンポーネント', () => {
  it('見出し「⑥ 主たる居住者」が表示されること', () => {
    render(<PrimaryResidentSection onChange={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /⑥ 主たる居住者/ })).toBeInTheDocument();
  });

  it('区分のラジオボタンが表示されること', () => {
    render(<PrimaryResidentSection onChange={vi.fn()} />);
    expect(screen.getByLabelText('契約者と同じ')).toBeInTheDocument();
    expect(screen.getByLabelText('契約者と異なる')).toBeInTheDocument();
  });

  it('初期状態では居住者詳細フィールドが非表示であること', () => {
    render(<PrimaryResidentSection onChange={vi.fn()} />);
    expect(screen.queryByPlaceholderText('主居住者氏名')).not.toBeInTheDocument();
  });

  it('契約者と異なる選択時に詳細フィールドが表示されること', async () => {
    render(<PrimaryResidentSection onChange={vi.fn()} />);
    await userEvent.click(screen.getByLabelText('契約者と異なる'));
    expect(screen.getByPlaceholderText('主居住者氏名')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/カナ/)).toBeInTheDocument();
  });

  it('続柄のドロップダウンが表示されること', async () => {
    render(<PrimaryResidentSection onChange={vi.fn()} />);
    await userEvent.click(screen.getByLabelText('契約者と異なる'));
    expect(screen.getByLabelText('契約者との続柄')).toBeInTheDocument();
  });

  it('必須バッジが表示されること', async () => {
    render(<PrimaryResidentSection onChange={vi.fn()} />);
    expect(screen.getByText('必須')).toBeInTheDocument();
  });

  it('続柄でその他選択時に備考が表示されること', async () => {
    render(<PrimaryResidentSection onChange={vi.fn()} />);
    await userEvent.click(screen.getByLabelText('契約者と異なる'));
    await userEvent.selectOptions(screen.getByLabelText('契約者との続柄'), '8');
    expect(screen.getByPlaceholderText(/続柄備考/)).toBeInTheDocument();
  });
});
