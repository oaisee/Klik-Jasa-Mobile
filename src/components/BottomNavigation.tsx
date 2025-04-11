
import React from 'react';
import { Home, ListChecks, PlusCircle, MessageSquare, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center text-xs ${
        isActive ? 'text-klikjasa-purple' : 'text-gray-500'
      }`}
    >
      <div className="mb-1">{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

interface BottomNavigationProps {
  userType: 'provider' | 'user';
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ userType }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6">
      <div className="flex justify-between items-center">
        <NavItem
          icon={<Home size={20} />}
          label="Beranda"
          to="/home"
          isActive={currentPath === '/home'}
        />
        <NavItem
          icon={<ListChecks size={20} />}
          label={userType === 'provider' ? 'Layanan Saya' : 'Permintaan Saya'}
          to={userType === 'provider' ? '/my-services' : '/my-requests'}
          isActive={currentPath === (userType === 'provider' ? '/my-services' : '/my-requests')}
        />
        <NavItem
          icon={<PlusCircle size={20} />}
          label={userType === 'provider' ? 'Tambah Layanan' : 'Tambah Permintaan'}
          to={userType === 'provider' ? '/add-service' : '/add-request'}
          isActive={currentPath === (userType === 'provider' ? '/add-service' : '/add-request')}
        />
        <NavItem
          icon={<MessageSquare size={20} />}
          label="Chat"
          to="/chat"
          isActive={currentPath === '/chat'}
        />
        <NavItem
          icon={<User size={20} />}
          label="Profil"
          to="/profile"
          isActive={currentPath === '/profile'}
        />
      </div>
    </div>
  );
};

export default BottomNavigation;
