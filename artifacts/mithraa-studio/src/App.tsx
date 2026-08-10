import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ClickSpark from "@/components/ui/ClickSpark";
import { SpotlightNavbar } from "@/components/layout/SpotlightNavbar";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ClickSpark
          sparkColor='#d97706'
          sparkSize={12}
          sparkRadius={24}
          sparkCount={10}
          duration={500}
        >
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <div className="relative min-h-screen">
              <Router />
              <SpotlightNavbar className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-auto" />
            </div>
          </WouterRouter>
          <Toaster />
        </ClickSpark>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
