
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User, Key } from 'lucide-react';
import Logo from '../components/Logo';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const { userType } = useParams<{ userType: string }>();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isProviderLogin = userType === 'provider';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast.error('Email dan password harus diisi');
      return;
    }

    // Here you would typically call an API to authenticate the user
    // For demo purposes, we'll just navigate to the home page
    toast.success(`Login berhasil sebagai ${isProviderLogin ? 'Penyedia Jasa' : 'Pengguna Jasa'}`);
    navigate('/home', { state: { userType: isProviderLogin ? 'provider' : 'user' } });
  };

  const handleRegister = () => {
    navigate(`/register/${userType}`);
  };

  return (
    <div className="mobile-container p-6">
      <button
        onClick={() => navigate('/onboarding')}
        className="absolute top-6 left-6 text-klikjasa-purple"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="py-12 flex flex-col items-center">
        <Logo />
        
        <h1 className="text-2xl font-bold mt-8 mb-2 text-klikjasa-purple">
          Login {isProviderLogin ? 'Penyedia Jasa' : 'Pengguna Jasa'}
        </h1>
        <p className="text-gray-500 text-sm mb-8 text-center">
          Silahkan login untuk mengakses {isProviderLogin ? 'akun penyedia jasa' : 'akun pengguna jasa'} Anda
        </p>

        <form onSubmit={handleLogin} className="w-full space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="Masukkan email anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                required
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
                placeholder="Masukkan password anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-klikjasa-electric-blue">
              Lupa password?
            </a>
          </div>

          <button type="submit" className="btn-primary w-full py-3">
            Login
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Belum punya akun?{' '}
            <button 
              onClick={handleRegister}
              className="text-klikjasa-electric-blue font-medium"
            >
              Daftar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
