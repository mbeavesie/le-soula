import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import { lazy, Suspense } from "react";
import Home from "@/pages/home";
import WineDetail from "@/pages/wine-detail";
import NotFound from "@/pages/not-found";

const StudioPage = lazy(() => import("@/pages/studio"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/wine/:slug" component={WineDetail} />
      <Route path="/studio/:rest*">
        {() => (
          <Suspense fallback={<div style={{ padding: 40 }}>Loading Studio…</div>}>
            <StudioPage />
          </Suspense>
        )}
      </Route>
      <Route path="/studio">
        {() => (
          <Suspense fallback={<div style={{ padding: 40 }}>Loading Studio…</div>}>
            <StudioPage />
          </Suspense>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
