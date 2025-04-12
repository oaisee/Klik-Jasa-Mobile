
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type AdminContextType = {
  isAdmin: boolean;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(
    localStorage.getItem('adminAuthenticated') === 'true'
  );
  const navigate = useNavigate();

  // Check admin status on component mount
  useEffect(() => {
    if (isAdmin) {
      // If we're on the admin login page but already authenticated as admin,
      // redirect to the admin dashboard
      const currentPath = window.location.pathname;
      if (currentPath === '/admin/login') {
        navigate('/admin/dashboard');
      }
    }
  }, [isAdmin, navigate]);

  const adminLogin = (email: string, password: string): boolean => {
    // Hardcoded credentials as requested
    if (email === 'admin@klikjasa.com' && password === 'klikjasa01') {
      setIsAdmin(true);
      localStorage.setItem('adminAuthenticated', 'true');
      toast.success('Login admin berhasil');
      navigate('/admin/dashboard'); // Add explicit navigation to dashboard
      return true;
    }
    toast.error('Email atau password admin salah');
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('adminAuthenticated');
    toast.success('Logout admin berhasil');
    navigate('/admin/login');
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        adminLogin,
        adminLogout
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
