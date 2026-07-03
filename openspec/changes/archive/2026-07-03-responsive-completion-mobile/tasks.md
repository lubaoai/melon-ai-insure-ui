### タスク 1：CompletionSummarySectionのConfirmationRowへの移行（TDD）

**関連ファイル：**
- 修正：src/components/completion/CompletionSummarySection.tsx
- テスト：src/__tests__/CompletionSummarySection.test.tsx

- [x] 1.1 **失敗するテストを書く**
```typescript
// 既存テストファイルに追加
it('ConfirmationRowコンポーネントを使用していること', () => {
  const { container } = render(<CompletionSummarySection data={defaultData} amount={15000} />);
  const grids = container.querySelectorAll('.grid');
  const firstRowGrid = grids[0];
  expect(firstRowGrid.className).toContain('grid-cols-1');
  expect(firstRowGrid.className).toContain('min-[875px]:grid-cols-[260px_1fr]');
});
```

- [x] 1.2 **テストを実行 — 失敗を確認**
コマンド：`npx vitest run src/__tests__/CompletionSummarySection.test.tsx`
期待結果：FAIL — grid-cols-1クラスが見つからない

- [x] 1.3 **実装を修正**
ローカルSummaryRow関数を削除し、ConfirmationRowをインポートする。
```typescript
import { ConfirmationRow } from '../confirmation/ConfirmationRow';
// SummaryRow関数定義を削除
// <SummaryRow label="..." value="..." /> を <ConfirmationRow label="..." value="..." /> に置換
```

- [x] 1.4 **テストを実行 — 成功を確認**
コマンド：`npx vitest run src/__tests__/CompletionSummarySection.test.tsx`
期待結果：PASS

- [x] 1.5 **コミット**
```bash
git add src/components/completion/CompletionSummarySection.tsx src/__tests__/CompletionSummarySection.test.tsx
git commit -m "feat: migrate CompletionSummarySection to ConfirmationRow for responsive layout"
```

### タスク 2：全テストの回帰確認

**関連ファイル：**
- なし（検証のみ）

- [x] 2.1 **全テストを実行**
コマンド：`npx vitest run`
期待結果：PASS — 全テストが成功すること

- [x] 2.2 **コミット**
変更がない場合はコミット不要。
