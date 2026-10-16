import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { signIn, useSession } from '../components/useAuth';
import { useUsers } from '../data/users';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);
  const [forgot, setForgot] = useState(false);

  const { users } = useUsers();
  const session = useSession();
  const from = (location.state as { from?: string } | null)?.from ?? '/';
  if (session) return <Navigate to={from} replace />;

  return (
    <div className="login">
      <aside className="login__brand">
        <div className="login__stripe" />
        <div className="login__brand-content">
          <h2>Central de Serviços</h2>
          <p>Contabilidade, finanças, crédito, seguros e muito mais, reunidos em um só lugar para a sua empresa.</p>
        </div>
        <small>Premium Soluções Empresariais</small>
      </aside>

      <main className="login__main">
        <form
          className="login__form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Informe um e-mail válido.');
            if (!password) return setError('Informe sua senha.');
            const failure = signIn(users, email, password, remember);
            if (failure) return setError(failure);
            setError('');
            setLoading(true);
            window.setTimeout(() => navigate(from, { replace: true }), 400);
          }}
        >
          <img src="/logo.png" alt="Premium Soluções Empresariais" className="login__logo" />
          <h1>Acesse sua conta</h1>
          <p className="login__sub">Entre com seu e-mail e senha para continuar.</p>

          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" className="input" autoComplete="email" placeholder="voce@empresa.com.br" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
          </div>

          <div className="field">
            <div className="login__label-row">
              <label htmlFor="password">Senha</label>
              <button type="button" className="login__link" onClick={() => setForgot(true)}>Esqueci minha senha</button>
            </div>
            <div className="login__password">
              <input id="password" type={showPassword ? 'text' : 'password'} className="input" autoComplete="current-password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="icon-btn" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setShowPassword((s) => !s)}>
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <label className="login__remember">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Manter conectado
          </label>

          {forgot && (
            <div className="login__notice" role="status">
              Para redefinir sua senha, fale com o administrador da Premium Soluções Empresariais.
            </div>
          )}
          {error && <div className="field-error" role="alert">{error}</div>}

          <button type="submit" className="btn btn--primary login__submit" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </main>
    </div>
  );
}
