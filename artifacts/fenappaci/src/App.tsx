import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import Request from "@/pages/Request";
import Investment from "@/pages/Investment";
import Partnership from "@/pages/Partnership";
import Export from "@/pages/Export";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import MarketPrices from "@/pages/MarketPrices";
import News from "@/pages/News";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/">
        <Layout><Home /></Layout>
      </Route>
      <Route path="/about">
        <Layout><About /></Layout>
      </Route>
      <Route path="/products">
        <Layout><Products /></Layout>
      </Route>
      <Route path="/request">
        <Layout><Request /></Layout>
      </Route>
      <Route path="/investment">
        <Layout><Investment /></Layout>
      </Route>
      <Route path="/partnership">
        <Layout><Partnership /></Layout>
      </Route>
      <Route path="/export">
        <Layout><Export /></Layout>
      </Route>
      <Route path="/contact">
        <Layout><Contact /></Layout>
      </Route>
      <Route path="/marche">
        <Layout><MarketPrices /></Layout>
      </Route>
      <Route path="/news">
        <Layout><News /></Layout>
      </Route>
      <Route>
        <Layout><NotFound /></Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
