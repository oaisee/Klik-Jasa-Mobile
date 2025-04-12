
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, ShoppingBag, MessageSquare, 
  DollarSign, Settings, LogOut, ChevronLeft, Menu, 
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAdmin } from '@/contexts/AdminContext';
import Logo from '@/components/Logo';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { adminLogout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const menuItems = [
    { 
      title: 'Dashboard', 
      path: '/admin/dashboard', 
      icon: LayoutDashboard 
    },
    { 
      title: 'Pengguna', 
      path: '/admin/users', 
      icon: Users 
    },
    { 
      title: 'Layanan', 
      path: '/admin/services', 
      icon: ShoppingBag 
    },
    { 
      title: 'Permintaan', 
      path: '/admin/requests', 
      icon: MessageSquare 
    },
    { 
      title: 'Transaksi', 
      path: '/admin/transactions', 
      icon: DollarSign 
    },
    { 
      title: 'Pengaturan', 
      path: '/admin/settings', 
      icon: Settings 
    }
  ];

  const handleLogout = () => {
    adminLogout();
  };

  const handleLinkClick = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b flex items-center justify-center">
                  <Logo />
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <nav className="space-y-1">
                    {menuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                          location.pathname === item.path
                            ? 'bg-klikjasa-purple text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={handleLinkClick}
                      >
                        <item.icon size={18} />
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="p-4 border-t">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 text-red-600 px-3 py-2 w-full rounded-md hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold text-klikjasa-purple ml-2">
            Admin Dashboard
          </h1>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/')}
          className="flex items-center space-x-1"
        >
          <ChevronLeft size={16} />
          <span>Aplikasi</span>
        </Button>
      </div>

      {/* Desktop layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (desktop only) */}
        <div className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r">
          <div className="p-4 border-b flex items-center justify-center">
            <Logo />
          </div>
          <div className="flex-1 overflow-auto p-4">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-klikjasa-purple text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t flex items-center justify-between">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-600 px-3 py-2 rounded-md hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center space-x-1"
            >
              <ChevronLeft size={16} />
              <span>Aplikasi</span>
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
