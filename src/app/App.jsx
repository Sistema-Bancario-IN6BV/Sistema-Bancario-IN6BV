import { useState } from 'react';
import LoginCard from '../features/auth/components/LoginCard';
import RegisterCard from '../features/auth/components/RegisterCard';
import Dashboard from '../features/dashboard/components/Dashboard';
import { useAuthStore } from '../shared/store/authStore';


function App() {
  const [view, setView] = useState('login');
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return view === 'login'
    ? <LoginCard onGoRegister={() => setView('register')} />
    : <RegisterCard onGoLogin={() => setView('login')} />;
}

export default App;
