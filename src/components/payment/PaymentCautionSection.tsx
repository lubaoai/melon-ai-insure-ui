const cautionText = `クレジットカードのお支払いに関する注意事項

・クレジットカードでお支払いの場合、お申込み完了後に決済が行われます。
・ご利用いただけるクレジットカードは、VISA、Mastercard、JCB、AMERICAN EXPRESS、Diners Club です。
・デビットカード・プリペイドカードはご利用いただけない場合がございます。
・カードの有効期限が切れている場合は決済ができませんのでご注意ください。
・決済が完了した後、ご登録のメールアドレスに確認メールをお送りします。
・カード番号等の情報は暗号化されて送信されます。`;

export function PaymentCautionSection() {
  return (
    <div className="m-2">
      <div className="border-4 border-[#b40081] mt-4">
        <h1 className="bg-[#b40081] text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          注意喚起
        </h1>
        <div className="bg-cream">
          <div
            data-testid="caution-scroll-area"
            className="m-2 p-2 text-sm text-text-primary whitespace-pre-line border border-border bg-white"
            style={{ height: '300px', overflowY: 'auto' }}
          >
            {cautionText}
          </div>
          <div className="m-2">
            <a href="#" className="text-sm text-[#b40081] font-bold underline">
              ＞全文を見る
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
