
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import MyServices from "./pages/MyServices";
import MyRequests from "./pages/MyRequests";
import AddService from "./pages/AddService";
import AddRequest from "./pages/AddRequest";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
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
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
