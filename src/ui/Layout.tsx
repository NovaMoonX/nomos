import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button, Tabs } from '@moondreamsdev/dreamer-ui/components';
import { useToast } from '@moondreamsdev/dreamer-ui/hooks';
import ThemeToggle from '@ui/ThemeToggle';
import { useAuthContext } from '@hooks/useAuth';

function Layout() {
  const { user, signOut } = useAuthContext();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

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

  const tabsList = [
    { value: 'home', label: 'Home' },
    { value: 'categories', label: 'Categories' },
  ];

  const tabPathMap: Record<string, string> = {
    'home': '/',
    'categories': '/categories',
  };

  const pathTabMap: Record<string, string> = {
    '/': 'home',
    '/categories': 'categories',
  };

  const getCurrentTab = () => {
    return pathTabMap[location.pathname] || 'home';
  };

  const handleTabChange = (value: string) => {
    const path = tabPathMap[value];
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="page transition-colors duration-200">
      <div className="fixed top-4 right-4 flex items-center gap-2 z-10">
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
      
      {user && (
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-8 pt-4">
            <Tabs
              tabsList={tabsList}
              value={getCurrentTab()}
              onValueChange={handleTabChange}
              variant="underline"
            />
          </div>
        </div>
      )}
      
      <Outlet />
    </div>
  );
}

export default Layout;
