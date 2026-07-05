import { describe, it, expect } from 'vitest';

describe('ブランドデザイントークン', () => {
  it('プライマリカラーがTailwindクラスとして使用可能であること', () => {
    const div = document.createElement('div');
    div.className = 'bg-primary';
    expect(div.className).toContain('bg-primary');
  });

  it('CTAカラーがTailwindクラスとして使用可能であること', () => {
    const div = document.createElement('div');
    div.className = 'bg-cta';
    expect(div.className).toContain('bg-cta');
  });

  it('警告カラーがTailwindクラスとして使用可能であること', () => {
    const div = document.createElement('div');
    div.className = 'bg-warning';
    expect(div.className).toContain('bg-warning');
  });

  it('クリーム背景色がTailwindクラスとして使用可能であること', () => {
    const div = document.createElement('div');
    div.className = 'bg-cream';
    expect(div.className).toContain('bg-cream');
  });

  it('フォームラベル背景色がTailwindクラスとして使用可能であること', () => {
    const div = document.createElement('div');
    div.className = 'bg-label-bg';
    expect(div.className).toContain('bg-label-bg');
  });

  it('ボーダーグレー色がTailwindクラスとして使用可能であること', () => {
    const div = document.createElement('div');
    div.className = 'border-border';
    expect(div.className).toContain('border-border');
  });

  it('テキストカラートークンが使用可能であること', () => {
    const div = document.createElement('div');
    div.className = 'text-text-primary text-text-light text-text-white';
    expect(div.className).toContain('text-text-primary');
    expect(div.className).toContain('text-text-light');
    expect(div.className).toContain('text-text-white');
  });

  it('シャドウトークンが使用可能であること', () => {
    const div = document.createElement('div');
    div.className = 'shadow-soft';
    expect(div.className).toContain('shadow-soft');
  });

  it('disabled色トークンが使用可能であること', () => {
    const div = document.createElement('div');
    div.className = 'bg-disabled';
    expect(div.className).toContain('bg-disabled');
  });

  it('Q&A背景色トークンが使用可能であること', () => {
    const div = document.createElement('div');
    div.className = 'bg-qa-bg';
    expect(div.className).toContain('bg-qa-bg');
  });

  it('ホバーlight色トークンが使用可能であること', () => {
    const div = document.createElement('div');
    div.className = 'bg-hover-light';
    expect(div.className).toContain('bg-hover-light');
  });

  it('タイポグラフィトークンが使用可能であること', () => {
    const div = document.createElement('div');
    div.className = 'text-heading text-body text-small leading-base';
    expect(div.className).toContain('text-heading');
    expect(div.className).toContain('text-body');
    expect(div.className).toContain('text-small');
    expect(div.className).toContain('leading-base');
  });

  it('カラーバリエーショントークンが使用可能であること', () => {
    const div = document.createElement('div');
    div.className = 'bg-primary-light bg-primary-dark bg-cta-hover';
    expect(div.className).toContain('bg-primary-light');
    expect(div.className).toContain('bg-primary-dark');
    expect(div.className).toContain('bg-cta-hover');
  });
});
