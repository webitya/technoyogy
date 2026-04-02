import '../admin.css';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin — Technoyogyx Content Studio',
  description: 'Admin panel for managing blog posts',
};

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">{children}</div>
    </div>
  );
}
