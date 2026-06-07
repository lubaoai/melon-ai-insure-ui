export function CautionSection() {
  return (
    <div className="m-2">
      <div className="border-4 border-primary mt-4">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ご確認いただきたい事項
        </h1>
        <div className="bg-cream p-4">
          <p className="mb-3 text-base text-text-primary font-bold">
            下記の事項を充分ご確認ください。<br />全て「はい」の場合のみお申込が可能です
          </p>
          <div className="space-y-0">
            <div className="flex items-start border-t border-border py-3">
              <div className="flex-1 text-sm text-text-primary pr-4">
                重要事項説明書（注意喚起情報・個人情報の取扱いについて）および契約概要の内容をご理解いただきましたか？
              </div>
              <div className="flex items-center gap-4 text-sm shrink-0">
                <label className="inline-flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="confirm1" value="yes" className="accent-primary" />
                  はい
                </label>
                <label className="inline-flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="confirm1" value="no" className="accent-primary" />
                  いいえ
                </label>
              </div>
            </div>
            <div className="flex items-start border-t border-border py-3">
              <div className="flex-1 text-sm text-text-primary pr-4">
                ご契約にあたり、告知義務があることをご理解いただきましたか？（申込書記載事項が事実と異なる場合、保険金がお支払いできない場合や契約を解除される場合があります）
              </div>
              <div className="flex items-center gap-4 text-sm shrink-0">
                <label className="inline-flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="confirm2" value="yes" className="accent-primary" />
                  はい
                </label>
                <label className="inline-flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="confirm2" value="no" className="accent-primary" />
                  いいえ
                </label>
              </div>
            </div>
            <div className="flex items-start border-t border-border py-3 border-b">
              <div className="flex-1 text-sm text-text-primary pr-4">
                他に補償内容が同様の保険契約（自動車保険、火災保険、傷害保険など）はありませんか？（補償が重複する場合、いずれか一方の保険契約からは保険金が支払われない場合があります）
              </div>
              <div className="flex items-center gap-4 text-sm shrink-0">
                <label className="inline-flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="confirm3" value="yes" className="accent-primary" />
                  はい
                </label>
                <label className="inline-flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="confirm3" value="no" className="accent-primary" />
                  いいえ
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
