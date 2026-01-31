import { DreamerUIProvider } from '@moondreamsdev/dreamer-ui/providers';
import { ErrorBoundary } from '@moondreamsdev/dreamer-ui/components';
import { RouterProvider } from 'react-router-dom';
import { router } from '@routes/AppRoutes';

function App() {
  return (
    <ErrorBoundary>
      <DreamerUIProvider>
        <RouterProvider router={router} />
      </DreamerUIProvider>
    </ErrorBoundary>
  );
}

export default App;
