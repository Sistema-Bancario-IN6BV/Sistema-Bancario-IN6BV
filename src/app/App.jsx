import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import LoginCard from '../features/auth/components/LoginCard';
import RegisterCard from '../features/auth/components/RegisterCard';
import { DashboardContainer } from '../shared/components/layout/DashboardContainer';
import { useAuthStore } from '../shared/store/authStore';

function App() {
  const [view, setView] = useState('login');
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      {isAuthenticated
        ? <DashboardContainer />
        : view === 'login'
          ? <LoginCard onGoRegister={() => setView('register')} />
          : <RegisterCard onGoLogin={() => setView('login')} />
      }
    </BrowserRouter>
  );
}

export default App;