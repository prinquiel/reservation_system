import { AdminRoutes } from './routes/AdminRoutes';
import { SupabaseProvider } from './providers/SupabaseProvider';

function App() {
  return (
    <SupabaseProvider>
      <AdminRoutes />
    </SupabaseProvider>
  );
}

export default App;
