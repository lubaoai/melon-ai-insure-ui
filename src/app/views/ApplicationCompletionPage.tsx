import { useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { StepNavigation } from '../../components/layout/StepNavigation';
import { ScrollTopButton } from '../../components/ui/ScrollTopButton';
import { CompletionMessageSection } from '../../components/completion/CompletionMessageSection';
import { CompletionSummarySection } from '../../components/completion/CompletionSummarySection';
import { useApplicationFormStore } from '../../store/applicationFormStore';
import { generateReceptionNumber } from '../../utils/receptionNumber';

function ApplicationCompletionPage() {
  const navigate = useNavigate();
  const store = useApplicationFormStore();

  const receptionNumber = useMemo(() => generateReceptionNumber(), []);

  useEffect(() => {
    if (!store.hasData()) {
      navigate('/', { replace: true });
    }
  }, [store, navigate]);

  return (
    <div className="bg-white font-sans">
      <StepNavigation currentStep={6} />

      <main className="px-4 py-4">
        <div className="max-w-[800px] mx-auto">
          <CompletionMessageSection receptionNumber={receptionNumber} />
          <CompletionSummarySection data={store.contractCourse} amount={0} />
          <div className="m-2 text-center mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2 text-lg font-bold bg-cta text-text-white shadow-soft transition-colors duration-150 hover:bg-cta-hover hover:text-text-primary"
            >
              トップページへ戻る
            </Link>
          </div>
        </div>
      </main>

      <ScrollTopButton />
    </div>
  );
}

export default ApplicationCompletionPage;
