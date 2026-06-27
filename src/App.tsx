import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto w-full max-w-[1024px] flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
