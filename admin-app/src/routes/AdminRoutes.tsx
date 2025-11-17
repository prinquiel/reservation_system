import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthPage } from '../pages/AuthPage';
import { DashboardPage } from '../pages/DashboardPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ReservationDetailPage } from '../pages/ReservationDetailPage';
import { ReservationsPage } from '../pages/ReservationsPage';
import { RoleManagementPage } from '../pages/RoleManagementPage';
import { UserManagementPage } from '../pages/UserManagementPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { SettingsPage } from '../pages/SettingsPage';
import { WorkersPage } from '../pages/WorkersPage';

export function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/reservations/:id" element={<ReservationDetailPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/workers" element={<WorkersPage />} />
        <Route path="/roles" element={<RoleManagementPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AdminLayout>
  );
}
