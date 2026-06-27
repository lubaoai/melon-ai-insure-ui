import { Routes, Route } from 'react-router-dom';
import HomePage from '../app/views/HomePage';
import IntentConfirmationPage from '../app/views/IntentConfirmationPage';
import ApplicationInputPage from '../app/views/ApplicationInputPage';
import ApplicationConfirmationPage from '../app/views/ApplicationConfirmationPage';
import PaymentPage from '../app/views/PaymentPage';
import ApplicationCompletionPage from '../app/views/ApplicationCompletionPage';
import NotFoundPage from '../app/views/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/intent-confirmation" element={<IntentConfirmationPage />} />
      <Route path="/application-input" element={<ApplicationInputPage />} />
      <Route path="/application-confirmation" element={<ApplicationConfirmationPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/application-completion" element={<ApplicationCompletionPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
