interface CompletionMessageSectionProps {
  receptionNumber: string;
}

export function CompletionMessageSection({ receptionNumber }: CompletionMessageSectionProps) {
  return (
    <div className="m-2">
      <div className="border-4 border-primary">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          申込完了
        </h1>
        <div className="bg-cream p-4 text-center">
          <p className="text-lg text-text-primary font-bold mb-4">
            お申込みが完了いたしました。
          </p>
          <p className="text-sm text-text-primary mb-2">
            以下の受付番号をお控えください。
          </p>
          <div className="inline-block border-2 border-primary bg-white px-6 py-3 rounded">
            <span className="text-sm font-bold text-text-primary">受付番号</span>
            <span className="ml-3 text-xl font-bold text-primary">{receptionNumber}</span>
          </div>
          <p className="text-sm text-text-primary mt-4">
            確認メールをお送りいたしますので、しばらくお待ちください。
          </p>
        </div>
      </div>
    </div>
  );
}
