import { StepNavigation } from '../../components/layout/StepNavigation';
import { QASidebar } from '../../components/home/QASidebar';
import { ScrollTopButton } from '../../components/ui/ScrollTopButton';

const qaItems = [
  { question: '保険の開始はいつからですか？', answer: 'お申し込み画面にてお客さまがご入力された契約希望日から補償が開始されます。' },
  { question: 'インターネットで申込みをしても保険証券・約款は届きますか？', answer: '保険証券はお送りしておりません。ご契約時に登録頂いたメールアドレスに「マイページ」開設の案内をお送りします。' },
  { question: '保険金額をどのように決めたら良いですか？', answer: '全ての家財の再調達価額（全て買い揃えた場合に必要な概算額）を基準に決定します。' },
];

function ApplicationInputPage() {
  return (
    <div className="bg-white font-sans">
      <StepNavigation currentStep={3} />

      <main className="px-4 py-4">
        <div className="flex flex-col gap-4 min-[875px]:flex-row">
          <div className="w-full min-[875px]:w-[800px]">
            <p>申込入力画面</p>
          </div>

          <div className="w-full min-[875px]:w-[197px]">
            <QASidebar items={qaItems} />
          </div>
        </div>
      </main>

      <ScrollTopButton />
    </div>
  );
}

export default ApplicationInputPage;
