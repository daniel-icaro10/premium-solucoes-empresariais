import { Moon, Sun } from 'lucide-react';
import { useTheme } from './useTheme';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const label = theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro';
  return (
    <button type="button" className={`icon-btn ${className}`} aria-label={label} title={label} onClick={toggle}>
      {theme === 'dark' ? <Sun size={19} strokeWidth={1.8} /> : <Moon size={19} strokeWidth={1.8} />}
    </button>
  );
}
