
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAdmin, adminLogout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul>
            <li className="mb-2">
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin/dashboard')}>
                Dashboard
              </Button>
            </li>
            <li className="mb-2">
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin/users')}>
                Users
              </Button>
            </li>
            <li className="mb-2">
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin/services')}>
                Services
              </Button>
            </li>
            <li className="mb-2">
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin/requests')}>
                Requests
              </Button>
            </li>
            <li className="mb-2">
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin/transactions')}>
                Transactions
              </Button>
            </li>
            <li className="mb-2">
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin/settings')}>
                Settings
              </Button>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
