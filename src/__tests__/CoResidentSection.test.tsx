import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CoResidentSection } from '../components/application/CoResidentSection';

describe('CoResidentSection コンポーネント', () => {
  it('見出し「⑦ 同居人の明細」が表示されること', () => {
    render(<CoResidentSection onChange={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /⑦ 同居人の明細/ })).toBeInTheDocument();
  });

  it('同居人の有無ラジオボタンが表示されること', () => {
    render(<CoResidentSection onChange={vi.fn()} />);
    expect(screen.getByLabelText('なし')).toBeInTheDocument();
    expect(screen.getByLabelText('あり')).toBeInTheDocument();
  });

  it('初期状態では同居人フィールドが非表示であること', () => {
    render(<CoResidentSection onChange={vi.fn()} />);
    expect(screen.queryByPlaceholderText('同居人1 氏名')).not.toBeInTheDocument();
  });

  it('あり選択時に同居人1のフィールドが表示されること', async () => {
    render(<CoResidentSection onChange={vi.fn()} />);
    await userEvent.click(screen.getByLabelText('あり'));
    expect(screen.getByPlaceholderText('同居人1 氏名')).toBeInTheDocument();
  });

  it('同居人追加ボタンが表示されること', async () => {
    render(<CoResidentSection onChange={vi.fn()} />);
    await userEvent.click(screen.getByLabelText('あり'));
    expect(screen.getByText('同居人を追加')).toBeInTheDocument();
  });

  it('同居人追加で2人目のフィールドが表示されること', async () => {
    render(<CoResidentSection onChange={vi.fn()} />);
    await userEvent.click(screen.getByLabelText('あり'));
    await userEvent.click(screen.getByText('同居人を追加'));
    expect(screen.getByPlaceholderText('同居人2 氏名')).toBeInTheDocument();
  });

  it('必須バッジが表示されること', async () => {
    render(<CoResidentSection onChange={vi.fn()} />);
    await userEvent.click(screen.getByLabelText('あり'));
    expect(screen.getAllByText('必須').length).toBeGreaterThanOrEqual(1);
  });
});
