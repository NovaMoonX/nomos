import { DreamerUIProvider } from '@moondreamsdev/dreamer-ui/providers';
import { ErrorBoundary } from '@moondreamsdev/dreamer-ui/components';
import { RouterProvider } from 'react-router-dom';
import { router } from '@routes/AppRoutes';
import { AuthProvider } from '@contexts/AuthContext';

function App() {
  return (
    <ErrorBoundary>
      <DreamerUIProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </DreamerUIProvider>
    </ErrorBoundary>
  );
}

export default App;
