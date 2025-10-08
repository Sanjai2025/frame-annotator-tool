import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
        theme === 'dark' ? 'bg-primary' : 'bg-muted'
      }`}
    >
      <span
        className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-background shadow ring-0 transition duration-200 ease-in-out ${
          theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
        }`}
      >
        <span
          className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in ${
            theme === 'dark' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Sun className="h-3 w-3 text-foreground" />
        </span>
        <span
          className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in ${
            theme === 'dark' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Moon className="h-3 w-3 text-foreground" />
        </span>
      </span>
    </button>
  );
}
