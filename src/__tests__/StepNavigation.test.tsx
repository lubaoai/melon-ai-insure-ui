import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StepNavigation } from '../components/layout/StepNavigation';

describe('StepNavigation コンポーネント', () => {
  it('6つのステップが表示されること', () => {
    render(<StepNavigation currentStep={1} />);
    expect(screen.getByText('①重要事項同意')).toBeInTheDocument();
    expect(screen.getByText('②意向確認')).toBeInTheDocument();
    expect(screen.getByText('③申込内容入力')).toBeInTheDocument();
    expect(screen.getByText('④申込内容確認')).toBeInTheDocument();
    expect(screen.getByText('⑤決済手続き')).toBeInTheDocument();
    expect(screen.getByText('⑥申込完了')).toBeInTheDocument();
  });

  it('現在のステップがマゼンタ背景でハイライトされること', () => {
    render(<StepNavigation currentStep={1} />);
    const activeStep = screen.getByText('①重要事項同意').closest('li');
    expect(activeStep?.className).not.toContain('bg-label-bg');
    const span = screen.getByText('①重要事項同意');
    expect(span.className).toContain('bg-primary');
    expect(span.className).toContain('text-text-white');
  });

  it('非アクティブステップがライトピンク背景であること', () => {
    render(<StepNavigation currentStep={1} />);
    const span = screen.getByText('②意向確認');
    expect(span.className).toContain('bg-label-bg');
  });

  it('各ステップ名の後ろに矢印アイコンが表示されること', () => {
    render(<StepNavigation currentStep={1} />);
    const arrows = document.querySelectorAll('svg.lucide-chevron-right');
    expect(arrows.length).toBe(5);
  });

  it('ステップ0が指定された場合は1にクランプされること', () => {
    render(<StepNavigation currentStep={0} />);
    const span = screen.getByText('①重要事項同意');
    expect(span.className).toContain('bg-primary');
  });

  it('ステップ7が指定された場合は6にクランプされること', () => {
    render(<StepNavigation currentStep={7} />);
    const span = screen.getByText('⑥申込完了');
    expect(span.className).toContain('bg-primary');
  });
});
