
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User, Key, AtSign, Phone } from 'lucide-react';
import Logo from '../components/Logo';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Register: React.FC = () => {
  const { userType } = useParams<{ userType: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp, setUserType, user } = useAuth();

  const isProviderRegister = userType === 'provider';

  useEffect(() => {
    // Set user type when component mounts
    if (userType === 'provider' || userType === 'user') {
      setUserType(userType);
    }
    
    // If already logged in, redirect to home
    if (user) {
      navigate('/home');
    }
  }, [userType, setUserType, user, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !phone || !password) {
      toast.error('Semua field harus diisi');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Password tidak cocok');
      return;
    }

    try {
      setIsLoading(true);
      await signUp(email, password, name, phone);
      
      // Automatically navigate to login page after successful registration
      navigate(`/login/${userType}`);
    } catch (error) {
      // Error is already handled in signUp function
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mobile-container p-6">
      <button
        onClick={() => navigate(`/login/${userType}`)}
        className="absolute top-6 left-6 text-klikjasa-purple"
        disabled={isLoading}
      >
        <ArrowLeft size={24} />
      </button>

      <div className="py-12 flex flex-col items-center">
        <Logo />
        
        <h1 className="text-2xl font-bold mt-8 mb-2 text-klikjasa-purple">
          Daftar {isProviderRegister ? 'Penyedia Jasa' : 'Pengguna Jasa'}
        </h1>
        <p className="text-gray-500 text-sm mb-8 text-center">
          Buat akun untuk mulai {isProviderRegister ? 'menawarkan jasa' : 'menggunakan jasa'} di KlikJasa
        </p>

        <form onSubmit={handleRegister} className="w-full space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AtSign size={18} className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Nomor Telepon
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={18} className="text-gray-400" />
              </div>
              <input
                id="phone"
                type="tel"
                placeholder="Masukkan nomor telepon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key size={18} className="text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                placeholder="Buat password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Konfirmasi Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key size={18} className="text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Konfirmasi password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary w-full py-3 mt-6"
            disabled={isLoading}
          >
            {isLoading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Sudah punya akun?{' '}
            <button 
              onClick={() => navigate(`/login/${userType}`)}
              className="text-klikjasa-electric-blue font-medium"
              disabled={isLoading}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
