import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import VideoHistory from "./pages/VideoHistory";
import VideoUpload from "./pages/VideoUpload";
import UserFeedback from "./pages/UserFeedback";
import Reports from "./pages/Reports";
import Checkout from "./pages/Checkout";
import OperationPanel from "./pages/OperationPanel";
import OperationRoute from "./components/OperationRoute";
import NotFound from "./pages/NotFound";
import PremiumRoute from "./components/PremiumRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/videos" element={<VideoHistory />} />
          <Route path="/upload" element={<VideoUpload />} />
          <Route path="/feedback" element={<UserFeedback />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/relatorios" element={<PremiumRoute><Reports /></PremiumRoute>} />
          <Route path="/operacao" element={<OperationRoute><OperationPanel /></OperationRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
