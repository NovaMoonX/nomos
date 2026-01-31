import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@moondreamsdev/dreamer-ui/components';
import { useToast } from '@moondreamsdev/dreamer-ui/hooks';
import ThemeToggle from '@ui/ThemeToggle';
import { useAuthContext } from '@hooks';

function Layout() {
  const { user, signOut } = useAuthContext();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      addToast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
        type: 'success',
      });
      navigate('/auth');
    } catch (error) {
      addToast({
        title: 'Error',
        description: (error as Error).message,
        type: 'error',
      });
    }
  };

  return (
    <div className="page transition-colors duration-200">
      <div className="fixed top-4 right-4 flex items-center gap-2">
        <ThemeToggle />
        {user && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground/60">
              {user.email}
            </span>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              Sign Out
            </Button>
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
