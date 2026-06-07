export function CautionSection() {
  return (
    <div className="m-2">
      <div className="border-4 border-primary mt-4">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          注意喚起
        </h1>
        <div className="bg-cream">
          <div
            data-testid="caution-scroll"
            className="m-2 h-[300px] overflow-y-auto border border-border rounded-lg p-3 text-sm leading-relaxed"
          >
            <p className="mb-3 font-bold text-text-primary">【注意喚起】</p>
            <p className="mb-2">保険契約にかかる重要事項についての説明です。</p>
            <p className="mb-2">契約の締結にあたり、必ず内容をお読みください。</p>
            <p className="mb-2">告知義務について：申込書記載事項が事実と異なっている場合には、保険金をお支払いできない場合があります。</p>
          </div>

          <div className="text-center mb-2">
            <button className="text-primary-link underline text-sm hover:opacity-70">
              ＞全文を見る
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
