
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Search, Plus, MessageCircle, User, Heart } from 'lucide-react';

interface BottomNavigationProps {
  userType: 'provider' | 'user';
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ userType }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    {
      name: 'Beranda',
      path: '/home',
      icon: <Home size={22} />,
      show: true,
    },
    {
      name: 'Wishlist',
      path: '/wishlist',
      icon: <Heart size={22} />,
      show: true,
    },
    {
      name: userType === 'provider' ? 'Tambah Layanan' : 'Tambah Permintaan',
      path: userType === 'provider' ? '/add-service' : '/add-request',
      icon: <Plus size={22} />,
      show: true,
    },
    {
      name: 'Chat',
      path: '/chat',
      icon: <MessageCircle size={22} />,
      show: true,
    },
    {
      name: 'Profil',
      path: '/profile',
      icon: <User size={22} />,
      show: true,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems
          .filter((item) => item.show)
          .map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center justify-center text-xs space-y-1 w-full h-full ${
                  isActive
                    ? 'text-klikjasa-purple font-medium'
                    : 'text-gray-500'
                }`}
              >
                {React.cloneElement(item.icon, {
                  className: isActive ? 'text-klikjasa-purple' : 'text-gray-500',
                })}
                <span>{item.name}</span>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default BottomNavigation;
