import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

// Lazy load pages for better initial bundle size
const Index = lazy(() => import("./pages/Index"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiesPolicy = lazy(() => import("./pages/CookiesPolicy"));
const TicTacToe = lazy(() => import("./pages/TicTacToe"));
const ProfitPatterns = lazy(() => import("./pages/ProfitPatterns"));
const CryptoReport = lazy(() => import("./pages/CryptoReport"));
const ExpenseTracker = lazy(() => import("./pages/ExpenseTracker"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-agency-navy"><div className="text-white text-xl">Loading...</div></div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<CookiesPolicy />} />
            <Route path="/tictactoe" element={<TicTacToe />} />
            <Route path="/profitpatterns" element={<ProfitPatterns />} />
            <Route path="/crypto_report" element={<CryptoReport />} />
            <Route path="/expensetracker" element={<ExpenseTracker />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
