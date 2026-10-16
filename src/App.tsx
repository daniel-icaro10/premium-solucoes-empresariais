import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { ToastProvider } from './components/Toast';
import { useSession } from './components/useAuth';
import Login from './pages/Login';
import Home from './pages/Home';
import Services from './pages/Services';
import NoLink from './pages/NoLink';
import Clients from './pages/Clients';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function RequireAuth() {
  const location = useLocation();
  if (!useSession()) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}

function RequireAdmin() {
  return useSession()?.role === 'admin' ? <Outlet /> : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="servicos" element={<Services />} />
            <Route path="servicos/:slug" element={<NoLink />} />
            <Route element={<RequireAdmin />}>
              <Route path="clientes" element={<Clients />} />
              <Route path="relatorios" element={<Reports />} />
              <Route path="configuracoes" element={<Settings />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ToastProvider>
  );
}
