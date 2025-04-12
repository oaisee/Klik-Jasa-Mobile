
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminProvider } from "./contexts/AdminContext";
import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import MyServices from "./pages/MyServices";
import MyRequests from "./pages/MyRequests";
import AddService from "./pages/AddService";
import AddRequest from "./pages/AddRequest";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import TopUpPage from "./pages/TopUpPage";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminServices from "./pages/admin/AdminServices";
import AdminRequests from "./pages/admin/AdminRequests";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <AdminProvider>
            <Toaster />
            <Sonner />
            <div className="mobile-container mx-auto">
              <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/login/:userType" element={<Login />} />
                <Route path="/register/:userType" element={<Register />} />
                
                {/* Protected routes */}
                <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/my-services" element={<ProtectedRoute><MyServices /></ProtectedRoute>} />
                <Route path="/my-requests" element={<ProtectedRoute><MyRequests /></ProtectedRoute>} />
                <Route path="/add-service" element={<ProtectedRoute><AddService /></ProtectedRoute>} />
                <Route path="/add-request" element={<ProtectedRoute><AddRequest /></ProtectedRoute>} />
                <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/profile/settings" element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>} />
                <Route path="/topup" element={<ProtectedRoute><TopUpPage /></ProtectedRoute>} />
                
                {/* Additional routes for editing services and requests */}
                <Route path="/edit-service/:id" element={<ProtectedRoute><AddService /></ProtectedRoute>} />
                <Route path="/edit-request/:id" element={<ProtectedRoute><AddRequest /></ProtectedRoute>} />
                <Route path="/service/:id" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                
                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
                <Route path="/admin/users" element={<AdminProtectedRoute><AdminUsers /></AdminProtectedRoute>} />
                <Route path="/admin/services" element={<AdminProtectedRoute><AdminServices /></AdminProtectedRoute>} />
                <Route path="/admin/requests" element={<AdminProtectedRoute><AdminRequests /></AdminProtectedRoute>} />
                <Route path="/admin/transactions" element={<AdminProtectedRoute><AdminTransactions /></AdminProtectedRoute>} />
                <Route path="/admin/settings" element={<AdminProtectedRoute><AdminSettings /></AdminProtectedRoute>} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </AdminProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
