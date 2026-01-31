import { useState } from 'react';
import { Button, Input, Label } from '@moondreamsdev/dreamer-ui/components';
import { useToast } from '@moondreamsdev/dreamer-ui/hooks';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { useAuthContext } from '@hooks';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onToggleMode: () => void;
}

export function AuthForm({ mode, onToggleMode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithEmail, signUpWithEmail } = useAuthContext();
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
      addToast({
        title: mode === 'login' ? 'Welcome back!' : 'Account created!',
        description: mode === 'login' ? 'Successfully signed in.' : 'Welcome to Nomos!',
        type: 'success',
      });
    } catch (error) {
      addToast({
        title: 'Authentication Error',
        description: (error as Error).message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <p className="mt-2 text-foreground/60">
            {mode === 'login'
              ? 'Welcome back to Nomos'
              : 'Get started with Nomos'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? 'Loading...'
              : mode === 'login'
                ? 'Sign In'
                : 'Create Account'}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={onToggleMode}
            className={join(
              'text-sm text-primary hover:underline',
              loading && 'pointer-events-none opacity-50'
            )}
            disabled={loading}
          >
            {mode === 'login'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
