
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Summary from "./pages/Summary";
import Comparison from "./pages/Comparison";
import Forecasting from "./pages/Forecasting";
import Rewards from "./pages/Rewards";
import Appliances from "./pages/Appliances";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem('auth_token');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/forecasting" element={<Forecasting />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/appliances" element={<Appliances />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<Settings />} />
            
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
