import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { ToastProvider } from './components/Toast';
import Home from './pages/Home';
import Services from './pages/Services';
import ModuleDetail from './pages/ModuleDetail';
import Clients from './pages/Clients';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="servicos" element={<Services />} />
          <Route path="servicos/:slug" element={<ModuleDetail />} />
          <Route path="clientes" element={<Clients />} />
          <Route path="relatorios" element={<Reports />} />
          <Route path="configuracoes" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}
