import { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Bell, ChevronDown, Headphones, LayoutDashboard, LayoutGrid, LogOut, Menu, Search,
  Settings, UserRound, Users, BarChart3,
} from 'lucide-react';
import { MODULES, NOTIFICATIONS } from '../data/modules';
import { getSession, signOut } from './useAuth';

const NAV = [
  { to: '/', label: 'Início', icon: LayoutDashboard, end: true },
  { to: '/servicos', label: 'Serviços', icon: LayoutGrid, count: MODULES.length },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/relatorios', label: 'Relatórios', icon: BarChart3 },
  { to: '/configuracoes', label: 'Configurações', icon: Settings },
];

function useClickOutside(onOutside: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onOutside();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onOutside]);
  return ref;
}

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const notifRef = useClickOutside(() => setNotifOpen(false));
  const userRef = useClickOutside(() => setUserOpen(false));
  const session = getSession();
  const initials = (session?.name ?? 'U').split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  const unread = notifications.filter((n) => n.unread).length;

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="app">
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="sidebar__brand">
          <img src="/logo.png" alt="Premium Soluções Empresariais" />
        </div>
        <nav className="nav">
          <div className="nav__label">Central de Serviços</div>
          {NAV.map(({ to, label, icon: Icon, end, count }) => (
            <NavLink key={to} to={to} end={end}>
              <Icon size={18} strokeWidth={1.8} />
              {label}
              {count !== undefined && <span className="count">{count}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar__footer">
          <a className="support-card" href="mailto:suporte@premiumsolucoes.com.br">
            <Headphones size={20} />
            <div>
              <strong>Suporte</strong>
              <span>Fale conosco</span>
            </div>
          </a>
        </div>
      </aside>
      <div className={`backdrop ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)} />

      <div className="main">
        <header className="topbar">
          <button className="icon-btn topbar__menu" aria-label="Abrir menu" onClick={() => setMenuOpen(true)}>
            <Menu size={20} />
          </button>
          <form
            className="topbar__search"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/servicos?q=${encodeURIComponent(query)}`);
            }}
          >
            <Search size={16} />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar serviços…"
              aria-label="Buscar serviços"
            />
            <kbd>Ctrl K</kbd>
          </form>

          <div className="topbar__actions">
            <div ref={notifRef} style={{ position: 'relative' }}>
              <button className="icon-btn" aria-label="Notificações" onClick={() => setNotifOpen((o) => !o)}>
                <Bell size={19} strokeWidth={1.8} />
                {unread > 0 && <span className="dot" />}
              </button>
              {notifOpen && (
                <div className="popover" style={{ width: 'min(340px, calc(100vw - 32px))' }}>
                  <div className="popover__head">
                    <strong>Notificações</strong>
                    {unread > 0 && (
                      <button
                        className="cell-sub"
                        onClick={() => setNotifications((ns) => ns.map((n) => ({ ...n, unread: false })))}
                      >
                        Marcar todas como lidas
                      </button>
                    )}
                  </div>
                  {notifications.map((n) => (
                    <button
                      key={n.id}
                      className="popover__item"
                      onClick={() => setNotifications((ns) => ns.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))}
                    >
                      <span className={n.unread ? 'unread-dot' : 'read-dot'} />
                      <div>
                        <p>{n.title}</p>
                        <small>{n.time}</small>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div ref={userRef} style={{ position: 'relative' }}>
              <button className="user-btn" onClick={() => setUserOpen((o) => !o)}>
                <span className="avatar">{initials}</span>
                <span className="user-btn__text">
                  <strong>{session?.name ?? 'Usuário'}</strong>
                  <span>Premium Soluções</span>
                </span>
                <ChevronDown size={16} color="var(--text-3)" />
              </button>
              {userOpen && (
                <div className="popover">
                  <button className="menu-item"><UserRound size={16} /> Meu perfil</button>
                  <button className="menu-item" onClick={() => navigate('/configuracoes')}><Settings size={16} /> Configurações</button>
                  <button
                    className="menu-item"
                    style={{ borderTop: '1px solid var(--border)' }}
                    onClick={() => {
                      signOut();
                      navigate('/login', { replace: true });
                    }}
                  >
                    <LogOut size={16} /> Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
