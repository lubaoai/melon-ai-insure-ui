import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepNavigation } from '../../components/layout/StepNavigation';
import { QASidebar } from '../../components/home/QASidebar';
import { TermsSection } from '../../components/home/TermsSection';
import { ScrollTopButton } from '../../components/ui/ScrollTopButton';
import { Icon } from '../../components/ui/Icon';

const qaItems = [
  { question: '保険料はいくらですか？', answer: '保険料はプランにより異なります。お見積りページにてご確認ください。' },
  { question: '解約はできますか？', answer: 'いつでも解約可能です。解約時の返金については規約をご確認ください。' },
  { question: '補償内容は変更できますか？', answer: '契約期間中の特約追加・変更が可能な場合がございます。' },
];

function HomePage() {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white font-sans">
      <StepNavigation currentStep={1} />

      <main className="px-4 py-4">
        <div className="flex flex-col gap-4 min-[875px]:flex-row">
          {/* 左カラム: メインコンテンツ */}
          <div className="w-full min-[875px]:w-[800px]">
            {/* 重要事項説明書 */}
            <TermsSection onAgree={setAgreed} />

            {/* 同意ボタンエリア */}
            <div className="m-2 rounded-md bg-button-area p-2 text-center">
              <button
                disabled={!agreed}
                onClick={() => navigate('/intent-confirmation')}
                className={`
                  inline-flex items-center justify-center gap-2 rounded-lg w-[230px] py-3
                  text-lg font-bold shadow-soft
                  transition-all duration-150 ease-out
                  ${agreed
                    ? 'bg-cta text-text-white hover:bg-cta-hover hover:text-text-primary'
                    : 'bg-disabled text-text-white cursor-not-allowed'
                  }
                `}
              >
                <Icon name="arrow-right-circle" size="lg" />
                同意
              </button>
            </div>
          </div>

          {/* 右カラム: Q&Aサイドバー */}
          <div className="w-full min-[875px]:w-[197px]">
            <QASidebar items={qaItems} />
          </div>
        </div>
      </main>

      <ScrollTopButton />
    </div>
  );
}

export default HomePage;
