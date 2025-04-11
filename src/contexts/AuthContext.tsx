
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userType: 'user' | 'provider' | null;
  setUserType: (type: 'user' | 'provider') => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, phone: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'user' | 'provider' | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // If the user just signed in, we can redirect them
        if (event === 'SIGNED_IN' && currentSession) {
          if (userType) {
            navigate('/home');
          }
        } else if (event === 'SIGNED_OUT') {
          navigate('/onboarding');
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
      
      // Get userType from localStorage if it exists
      const savedUserType = localStorage.getItem('userType') as 'user' | 'provider' | null;
      if (savedUserType) {
        setUserType(savedUserType);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, userType]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      toast.success('Login berhasil');
    } catch (error: any) {
      toast.error(error.message || 'Gagal login');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, phone: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone_number: phone,
            user_type: userType
          }
        }
      });

      if (error) throw error;
      
      toast.success('Pendaftaran berhasil! Silahkan cek email Anda untuk verifikasi.');
    } catch (error: any) {
      toast.error(error.message || 'Gagal mendaftar');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      localStorage.removeItem('userType');
      toast.success('Berhasil keluar');
    } catch (error: any) {
      toast.error(error.message || 'Gagal keluar');
    } finally {
      setLoading(false);
    }
  };

  const setUserTypeWithStorage = (type: 'user' | 'provider') => {
    setUserType(type);
    localStorage.setItem('userType', type);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userType,
        setUserType: setUserTypeWithStorage,
        signIn,
        signUp,
        signOut,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
