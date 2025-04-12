
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, ShoppingBag, MessageSquare, 
  DollarSign, Settings, LogOut, ChevronLeft, Menu, 
  Bell, User, Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAdmin } from '@/contexts/AdminContext';
import Logo from '@/components/Logo';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

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
      icon: LayoutDashboard,
      notifications: 0
    },
    { 
      title: 'Pengguna', 
      path: '/admin/users', 
      icon: Users,
      notifications: 2
    },
    { 
      title: 'Layanan', 
      path: '/admin/services', 
      icon: ShoppingBag,
      notifications: 5
    },
    { 
      title: 'Permintaan', 
      path: '/admin/requests', 
      icon: MessageSquare,
      notifications: 3
    },
    { 
      title: 'Transaksi', 
      path: '/admin/transactions', 
      icon: DollarSign,
      notifications: 1
    },
    { 
      title: 'Pengaturan', 
      path: '/admin/settings', 
      icon: Settings,
      notifications: 0
    }
  ];

  const handleLogout = () => {
    adminLogout();
  };

  const handleLinkClick = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top header (visible on all screen sizes) */}
      <header className="bg-white border-b px-4 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          {/* Mobile menu trigger */}
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu size={20} />
                <span className="sr-only">Toggle menu</span>
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
                        className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                          location.pathname === item.path
                            ? 'bg-klikjasa-purple text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={handleLinkClick}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon size={18} />
                          <span>{item.title}</span>
                        </div>
                        {item.notifications > 0 && (
                          <Badge className="bg-red-500 text-white">{item.notifications}</Badge>
                        )}
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
          
          {/* Logo for larger screens */}
          <div className="hidden lg:flex lg:items-center mr-8">
            <Logo />
          </div>
          
          <h1 className="text-xl font-bold text-klikjasa-purple ml-2 lg:ml-0">
            Admin Dashboard
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Notification dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-[10px] h-5 min-w-5 flex items-center justify-center p-0">
                  11
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2 font-medium">
                Notifikasi
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                {[1, 2, 3].map((item) => (
                  <DropdownMenuItem key={item} className="py-3 px-4 cursor-pointer">
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium">Pengguna baru mendaftar</span>
                      <span className="text-xs text-gray-500">2 menit yang lalu</span>
                    </div>
                  </DropdownMenuItem>
                ))}
                {[4, 5, 6].map((item) => (
                  <DropdownMenuItem key={item} className="py-3 px-4 cursor-pointer">
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium">Transaksi baru selesai</span>
                      <span className="text-xs text-gray-500">10 menit yang lalu</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-2 text-center text-sm text-blue-600">
                Lihat semua notifikasi
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Admin profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-klikjasa-purple text-white">A</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-sm font-medium">Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Pengaturan</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Return to app button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center space-x-1 hidden md:flex"
          >
            <Home size={16} />
            <span>Ke Aplikasi</span>
          </Button>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (desktop only) */}
        <div className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r">
          <div className="flex-1 overflow-auto py-4">
            <nav className="space-y-1 px-3">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-klikjasa-purple text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={18} />
                    <span>{item.title}</span>
                  </div>
                  {item.notifications > 0 && (
                    <Badge className="bg-red-500 text-white">{item.notifications}</Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-klikjasa-purple text-white">A</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Admin Klik Jasa</p>
                <p className="text-xs text-gray-500">admin@klikjasa.com</p>
              </div>
            </div>
            <Separator className="my-2" />
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
