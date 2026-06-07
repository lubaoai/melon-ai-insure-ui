export function CautionSection() {
  return (
    <div className="m-2">
      <div className="border-4 border-primary mt-4">
        <h1 className="bg-primary text-text-white px-5 pt-1.5 pb-1 text-heading font-bold">
          ご確認いただきたい事項
        </h1>
        <div className="bg-cream">
          <div
            data-testid="caution-scroll"
            className="m-2 h-[300px] overflow-y-auto border border-border rounded-lg p-3 text-sm leading-relaxed"
          >
            <p className="mb-3 font-bold text-text-primary">【契約概要（ご契約の内容に関する重要な事項のご説明）】</p>

            <p className="mb-2"><span className="font-bold">1. 商品の仕組みについて</span></p>
            <p className="mb-2">この商品は、火災、漏水による水濡れや盗難等の損害を補償する家財の補償に加え、賠償責任補償の契約をセットした総合プランです。当プランは、下記の2種類の契約をセットしたプランになっています。</p>
            <p className="mb-1">契約分類：家財保険　お支払いする保険金：借家人家財（生活用動産）の保険金</p>
            <p className="mb-2">契約分類：賠償責任契約　お支払いする保険金：借家人賠償責任保険金および個人賠償責任保険金</p>

            <p className="mb-2"><span className="font-bold">2. 補償内容について：借家人家財（生活用動産）の保険金</span></p>
            <p className="mb-1 font-bold">保険の対象の範囲について</p>
            <p className="mb-1">■ 保険の対象となる家財</p>
            <p className="mb-1">この契約における保険の対象は、被保険者が所有し、保険証券記載の借用住居に収容される家財です。ただし、配偶者等が所有し、借用住居に収納される家財も保険の目的に含まれます。</p>
            <p className="mb-1">■ 保険の対象（家財）に含まれないもの</p>
            <ul className="list-disc pl-5 mb-2 space-y-0.5">
              <li>自動車、原動機付自転車、自転車、船舶、航空機</li>
              <li>通貨、有価証券、預貯金証書、キャッシュカード、クレジットカード等</li>
              <li>稿本、設計書、図案、証書、帳簿その他これらに類するもの</li>
              <li>商品、営業用什器・備品その他これらに類するもの</li>
              <li>電子機器類に使用されるテープ、カード、ディスク等の記憶媒体に記録されているデータ等</li>
              <li>動物および植物</li>
            </ul>

            <p className="mb-1 font-bold">保険金をお支払いする場合</p>
            <p className="mb-1">1. 家財損害保険金：火災、落雷、破裂または爆発、台風等の風災、物体の落下・飛来・衝突、漏水による水濡れ等の事故によって家財が損害を受けた場合</p>
            <p className="mb-1">2. 家財盗難保険金：家財が盗難（未遂を含みます。）によって盗取、毀損、汚損の損害を受けた場合</p>
            <p className="mb-1">3. 通貨・預貯金証書盗難保険金：借用住居内における通貨または預貯金証書の盗難による損害を受けた場合</p>
            <p className="mb-1">4. 持ち出し家財保険金：借用住居から一時的に持ち出された家財に、日本国内の他の建築物内において損害が発生した場合</p>
            <p className="mb-1">5. 水害保険金：台風、暴風雨等による水害によって、家財に再調達価額の30%以上の損害が発生した場合</p>
            <p className="mb-1">6. 臨時費用保険金：家財損害保険金が支払われる場合に、家財損害保険金の30%に相当する額</p>
            <p className="mb-1">7. 残存物取片づけ費用保険金：家財損害保険金が支払われる場合に、家財損害保険金の10%を限度として</p>
            <p className="mb-1">8. 失火見舞費用保険金：家財または借用住居から発生した火災等により、第三者の所有物に損害が発生した場合</p>
            <p className="mb-1">9. 修理費用保険金：借用住居の賃貸借契約に基づき、損害に対し現実に修理された場合</p>
            <p className="mb-2">10. 遺品整理費用保険金：被保険者または配偶者等が死亡したことにより、借用住居の賃貸借契約が終了する場合に遺品整理のための費用を支出した場合</p>

            <p className="mb-1 font-bold">保険金をお支払いできない主な場合</p>
            <ul className="list-disc pl-5 mb-2 space-y-0.5">
              <li>保険契約者、被保険者、配偶者等の故意もしくは重大な過失あるいは法令違反によるとき</li>
              <li>地震、噴火または津波によるとき</li>
              <li>戦争その他の変乱によるとき</li>
              <li>核燃料物質の放射性、爆発性その他有害な特性による事故によるとき</li>
            </ul>

            <p className="mb-2"><span className="font-bold">3. 補償内容について：借家人賠償責任および個人賠償責任の保険金</span></p>
            <p className="mb-1">1. 借家人賠償責任保険：借用住居が、被保険者の責めに帰すべき事由に起因する事故により損害した場合</p>
            <p className="mb-1">2. 個人賠償責任保険金：被保険者が日本国内において発生した偶然な事故により、他人の身体の障害または財物の損壊に対して法律上の損害賠償責任を負担することによって損害を被った場合</p>
            <p className="mb-2">3. 保険金をお支払いできない主な場合：故意、心神喪失、地震・津波、戦争、核燃料物質等によるとき</p>

            <p className="mb-2"><span className="font-bold">4. 引受（保険金支払限度額・保険料）について</span></p>
            <p className="mb-1">■ 保険金支払限度額について：各商品タイプには、1回の事故の保険金お支払い限度額と契約合計支払限度額が定められています。</p>
            <p className="mb-2">■ 保険料について：保険料は、各タイプ毎に定額で設定されています。</p>

            <p className="mb-2"><span className="font-bold">5. 保険料払込および責任開始日について</span></p>
            <p className="mb-1">■ 保険料の種類および払込方法について：契約期間の保険料一括払いとなっています。払込方法は、クレジットカード払い、コンビニ払いの2種類となります。</p>
            <p className="mb-2">■ 責任開始日について：お申込みいただいた内容につき、当会社が引受けを承諾し、所定の期間内に保険料のお支払いが完了した場合、保険契約申込の際に入力した契約希望日とします。</p>

            <p className="mb-2"><span className="font-bold">6. 保険期間および保険契約のご継続について</span></p>
            <p className="mb-1">■ 保険期間について：保険期間は1年間または2年間のいずれかをお選びいただけます。</p>
            <p className="mb-2">■ 保険契約の継続について：保険期間満了日の1ヶ月前までに「継続案内」を送付致します。保険契約者より、保険期間満了までに保険契約を継続しない旨のご通知をいただかない限り、同じ条件で継続されます。</p>

            <p className="mb-2"><span className="font-bold">7. 解約返戻金・満期返戻金・配当金について</span></p>
            <p className="mb-1">■ 解約返戻金について：解約日から保険期間の満了日までの未経過月数に対して月割りをもって計算した額とします。</p>
            <p className="mb-2">■ 満期返戻金・配当金について：この保険には、満期返戻金・配当金はありません。</p>
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
