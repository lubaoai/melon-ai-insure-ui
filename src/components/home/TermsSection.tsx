import { useState, useRef, useCallback } from 'react';
import { Icon } from '../ui/Icon';

interface TermsSectionProps {
  onAgree: (agreed: boolean) => void;
}

export function TermsSection({ onAgree }: TermsSectionProps) {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 10;
    if (isAtBottom) {
      setScrolledToBottom(true);
    }
  }, []);

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setAgreed(checked);
      onAgree(checked);
    },
    [onAgree],
  );

  return (
    <div className="m-2">
      {/* 注意喚起情報セクション（アンバー） */}
      <div className="border-4 border-warning">
        <h1 className="bg-warning text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          <Icon name="alert-circle" size="sm" className="mr-1 inline" />
          重要事項説明書（注意喚起情報・個人情報の取扱いについて）
        </h1>
        <div className="bg-warning-light p-4 text-sm leading-relaxed">
          <p>下記の重要事項説明書の内容を最後までお読みいただき、内容をご確認の上、「確認しました」にチェックを入れ、「同意」ボタンをクリックしてください。</p>
          <p className="mt-2">重要事項説明書を最後までスクロールすると、チェックボックスが有効になります。</p>
        </div>
      </div>

      {/* 重要事項説明書セクション（マゼンタ） */}
      <div className="border-4 border-primary mt-4">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          重要事項説明書
        </h1>
        <div className="bg-cream">
          <div
            data-testid="terms-scroll"
            ref={scrollRef}
            onScroll={handleScroll}
            className="m-2 h-[300px] overflow-y-auto border border-border rounded-lg p-3 text-sm leading-relaxed"
          >
            <p className="mb-3 font-bold text-text-primary">【注意喚起情報（ご契約の際にご注意いただきたい事項）】</p>
            <p className="mb-2"><span className="font-bold">1. クーリングオフについて</span></p>
            <p className="mb-1">■ クーリングオフ制度とは</p>
            <p className="mb-1">クーリングオフ制度とは、保険契約者がお申込みから一定期間であればお申込みの撤回ができる制度です。本契約については法令に定めるクーリングオフの対象となる契約ではありませんが、当会社独自の制度としてクーリングオフ制度を設けています。なお、継続契約にはこの制度はありません。</p>
            <p className="mb-1">■ クーリングオフをご希望の場合</p>
            <p className="mb-1">クーリングオフをご希望の場合は、お申込み日より10日以内に、書面にてその旨をご通知ください。</p>
            <p className="mb-1">■ 宛先</p>
            <p className="mb-2">メロン少額短期保険株式会社　クーリングオフ受付係<br />〒261-8501 千葉県千葉市美浜区 中瀬1-3　幕張テクノガーデンD棟 10階</p>

            <p className="mb-2"><span className="font-bold">2. 告知義務および通知義務について</span></p>
            <p className="mb-1">■ 契約お申込み時の告知義務について</p>
            <p className="mb-1">保険契約者または被保険者には、ご契約の申込みをされるときには、支払事由発生の可能性に関する重要な事項について、保険契約申込書または告知書において告知事項として質問をした事項について、当会社に事実を正確に申し出ていただく義務（告知義務）があります。申込書記載事項が事実と異なっている場合には、保険金をお支払いできない場合や、契約を解除させていただく場合があります。</p>
            <p className="mb-1">■ 契約締結後の通知義務について</p>
            <p className="mb-2">ご契約後に次の変更等が生じる場合には、必ず事前に当会社契約センター宛にご通知ください。ご通知がない場合には、変更の後に生じた事故による損害については、保険金をお支払いできない場合や、契約を解除させていただく場合があります。</p>

            <p className="mb-2"><span className="font-bold">3. 責任開始日について</span></p>
            <p className="mb-2">お申込みいただいた内容につき、当会社が引受けを承諾し、所定の期間内に保険料のお支払いが完了した場合、保険契約申込の際に入力した契約希望日とします。</p>

            <p className="mb-2"><span className="font-bold">4. 保険金をお支払いできない主な場合</span></p>
            <p className="mb-2">保険金をお支払いできない主な場合については、契約概要の補償内容についてをご参照ください。</p>

            <p className="mb-2"><span className="font-bold">5. 保険料のお支払いがなかった場合の取扱い</span></p>
            <p className="mb-2">保険料のお支払いがなかった場合は、お申込みがなかったものとします。</p>

            <p className="mb-2"><span className="font-bold">6. 解約返戻金について</span></p>
            <p className="mb-2">ご契約を解約される場合は、当会社契約センターまでご連絡ください。解約返戻金は、解約日から保険期間の満了日までの未経過月数（1ケ月未満の端数は切り捨てます。）に対して月割りをもって計算した額とします。</p>

            <p className="mb-2"><span className="font-bold">7. 保険契約の継続時の契約条件の見直しについて</span></p>
            <p className="mb-2">保険契約の継続時に、保険料の計算方法、保険金額等の契約条件を見直す場合があります。また、継続契約のお引受けを行わない場合があります。</p>

            <p className="mb-2"><span className="font-bold">8. 少額短期保険業者の保険契約の引受制限について</span></p>
            <p className="mb-1">当会社（少額短期保険業者）が引き受けることが出来る保険契約の要件は、保険業法により下記のとおり定められています。</p>
            <p className="mb-1">■ 保険期間について：保険期間は生命保険の場合は1年以内、損害保険の場合は2年以内となります。</p>
            <p className="mb-1">■ 保険金額の上限について：被保険者1名あたりの保険金額の上限は区分ごとに定められています。</p>
            <p className="mb-2">■ 被保険者あたりの保険金額合計について：被保険者1名あたり、引き受けるすべての保険の保険金額の合計額は2,000万円が上限となります。</p>

            <p className="mb-2"><span className="font-bold">9. 補償重複について</span></p>
            <p className="mb-2">以下の補償については、補償内容が同様の保険契約が他にある場合、補償が重複することがあります。補償が重複すると、補償の対象となる事故について、どちらの保険契約からでも補償されますが、いずれか一方の保険契約からは保険金が支払われない場合があります。</p>

            <p className="mb-2"><span className="font-bold">10. 指定紛争解決機関について</span></p>
            <p className="mb-1">当会社はお客さまからお申し出いただいた苦情等については、解決に向けて真摯な対応に努める所存でございます。なお、必要に応じ、一般社団法人日本少額短期保険協会が運営し、当会社が契約する指定紛争解決機関「少額短期ほけん相談室」をご利用いただくことができます。</p>
            <p className="mb-2">一般社団法人日本少額短期保険協会「少額短期ほけん相談室」<br />TEL.0120-82-1144</p>

            <p className="mb-2"><span className="font-bold">11. その他法令で注意喚起が必要とされている事項</span></p>
            <p className="mb-1">■ 想定外の事象が発生した場合：保険事故が多発して保険収支が悪化した場合に、保険料の増額や保険金額の減額を行うことがあります。</p>
            <p className="mb-2">■ 万一当会社が破たんした場合：万一当会社が経営破たんした場合であっても、「損害保険契約者保護機構」、「生命保険契約者保護機構」による保護はございません。</p>

            <p className="mb-4"><span className="font-bold">12. 反社会的勢力に対する基本方針について</span></p>
            <p className="mb-4">当会社は、暴力、威力または詐欺的手法を駆使して経済的利益を追求する集団または個人（いわゆる反社会的勢力）による被害を防止するために、反社会的勢力等への対応態勢を整備するとともに、反社会的勢力等との関係遮断、不当要求等に対する拒絶等について、弁護士や警察等とも連携して、毅然とした姿勢で組織的に対応いたします。</p>

            <p className="mb-3 font-bold text-text-primary">【個人情報に関する重要事項（お客さまに関する個人情報のお取扱いについて）】</p>

            <p className="mb-2"><span className="font-bold">1. 個人情報の利用目的について</span></p>
            <p className="mb-1">当会社は、個人情報を次の目的のために必要な範囲で利用します。これらの目的のほかに利用することはありません。</p>
            <ul className="list-disc pl-5 mb-2 space-y-0.5">
              <li>各種保険契約のお引受け・ご継続・維持管理</li>
              <li>保険金のお支払い手続き</li>
              <li>当会社または当会社の提携会社からの各種商品やサービスのご案内</li>
              <li>当会社の商品に関する業務・サービスの充実や各種の調査</li>
            </ul>

            <p className="mb-2"><span className="font-bold">2. センシティブ情報の取得・利用について</span></p>
            <p className="mb-2">当会社は、人種、信条、社会的身分、病歴、犯罪の経歴、犯罪被害事実等の要配慮個人情報ならびに労働組合への加盟、門地、本籍地、保健医療および性生活に関する個人情報（以下「センシティブ情報」といいます。）を、次に掲げる場合を除くほか、取得、利用または第三者提供を行いません。</p>
            <ul className="list-disc pl-5 mb-2 space-y-0.5">
              <li>保険業の適切な業務運営を確保する必要性から、本人の同意に基づき業務遂行上必要な範囲でセンシティブ情報を取得、利用または第三者提供する場合</li>
              <li>相続手続きを伴う保険金支払い事務等の遂行に必要な限りにおいて、センシティブ情報を取得、利用または第三者提供する場合</li>
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要がある場合</li>
            </ul>

            <p className="mb-2"><span className="font-bold">3. 契約不成立の際の借用住居の貸主への通知について</span></p>
            <p className="mb-2">借用住宅の賃貸借契約書に、保険付保の条項が含まれている場合、申込書作成時に指定された払込方法による保険料の払い込みがなかったことにより契約が成立しなかった場合には、取扱代理店を通じ、借用住居の賃貸借契約の貸主に対し、保険契約不成立の旨を通知させていただく場合があります。</p>

            <p className="mb-2"><span className="font-bold">4. 契約情報の開示</span></p>
            <p className="mb-2">当会社は、契約者・被保険者以外からの契約内容などのお問合せにはお答えすることはありません。</p>

            <p className="mb-2"><span className="font-bold">5. 個人情報の第三者への提供に関して</span></p>
            <p className="mb-1">当会社は、次の場合を除いて、契約者・被保険者の同意なく、契約者・被保険者の個人情報を第三者に提供することはありません。</p>
            <ul className="list-disc pl-5 mb-2 space-y-0.5">
              <li>業務上必要な範囲で、業務委託契約に基づく業務委託会社等に取扱いを委託する場合</li>
              <li>再保険契約の締結や再保険金の受領など、再保険手続きに関して必要な場合</li>
              <li>保険制度の健全な運営を維持または不正な保険金請求を防止するために、他の保険業に関連する企業・団体・協会等と共同利用する場合</li>
              <li>各種法令に基づく場合</li>
            </ul>

            <p className="mb-2"><span className="font-bold">6. 個人情報の開示等の手続きについて</span></p>
            <p className="mb-2">当会社で保有する契約者・被保険者ご自身の個人情報について、利用目的の通知、内容の訂正・追加・削除・利用の停止、消去および第三者への提供の停止の求めがあった場合には、遅滞なく対応します。</p>

            <p className="mb-2"><span className="font-bold">7. 本重要事項説明書の内容にご同意いただけない場合</span></p>
            <p className="mb-2">当会社は、契約者・被保険者がご契約にあたり必要な記載事項の記載をご希望されない場合および本重要事項説明書の内容の全部または一部をご承認いただけない場合、ご契約をお断りすることがあります。</p>

            <p className="mb-2"><span className="font-bold">8. お問合せ窓口</span></p>
            <p className="mb-2">メロン少額短期保険株式会社　お客さま相談室<br />TEL.03-6895-0962</p>

            <p className="mb-2"><span className="font-bold">9. その他</span></p>
            <p className="mb-1">当会社は、お客さまサービスの向上のため、お客さまからのご連絡事項、ご要望等を正しく理解し、適切な対応をとらせていただくことを目的として、電話による会話を録音させていただいております。</p>
            <p className="mb-1">支払い時情報交換制度：当会社は、一般社団法人日本少額短期保険協会、少額短期保険業者および、特定の損害保険会社とともに保険金等のお支払いまたは、保険契約の解除、取り消しもしくは、無効の判断の参考とすることを目的として、保険契約に関する所定の情報を相互照会しております。</p>
          </div>

          {/* 全文を見るリンク */}
          <div className="text-center mb-2">
            <button className="text-primary-link underline text-sm hover:opacity-70">
              ＞全文を見る
            </button>
          </div>

          {/* 確認チェックボックス（グレーバー中央配置） */}
          <div className="flex justify-center pb-3">
            <div className={`w-[600px] rounded-md p-3 flex items-center justify-center ${scrolledToBottom ? 'bg-white border border-border' : 'bg-qa-bg'}`}>
              <label
                className={`
                  inline-flex items-center gap-2
                  ${scrolledToBottom ? 'cursor-pointer text-text-primary' : 'cursor-not-allowed text-text-light'}
                `}
              >
                <span className="relative inline-flex h-6 w-6 items-center justify-center">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={handleCheck}
                    disabled={!scrolledToBottom}
                    className="sr-only"
                  />
                  <span className={`h-6 w-6 rounded-[4px] border ${scrolledToBottom ? 'border-border bg-cream' : 'border-disabled bg-disabled'}`} />
                  <span
                    className={`
                      absolute left-[5px] top-[2px] h-3.5 w-2
                      rotate-45 border-r-[3px] border-b-[3px] border-accent-orange
                      transition-opacity duration-150
                      ${agreed ? 'opacity-100' : 'opacity-0'}
                    `}
                  />
                </span>
                <span className="text-base">
                  確認しました
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
