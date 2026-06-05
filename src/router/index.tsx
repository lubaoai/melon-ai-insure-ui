import { Routes, Route } from 'react-router-dom';
import HomePage from '../app/views/HomePage';
import NotFoundPage from '../app/views/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
