import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@hooks';
import Loading from '@ui/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
