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
import ProtectedRoute from "./components/ProtectedRoute";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/recursos" element={<FeaturesPage />} />
          <Route path="/planos" element={<PricingPage />} />
          <Route path="/sobre-nos" element={<AboutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/videos" element={<ProtectedRoute><VideoHistory /></ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute><VideoUpload /></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute><UserFeedback /></ProtectedRoute>} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/relatórios" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/operacao" element={<ProtectedRoute><OperationRoute><OperationPanel /></OperationRoute></ProtectedRoute>} />
          <Route path="/blog" element={<NotFound />} />
          <Route path="/carreiras" element={<NotFound />} />
          <Route path="/imprensa" element={<NotFound />} />
          <Route path="/ajuda" element={<NotFound />} />
          <Route path="/contato" element={<NotFound />} />
          <Route path="/status" element={<NotFound />} />
          <Route path="/privacidade" element={<NotFound />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
