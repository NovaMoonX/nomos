import { useState } from 'react';
import { AuthForm } from './AuthForm';

export function Auth() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthForm mode={mode} onToggleMode={toggleMode} />
    </div>
  );
}
