import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import SEO from "./components/SEO";
import ErrorBoundary from "./components/ErrorBoundary";
import SkipLink from "./components/SkipLink";
import "./global.css";

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div className="App">
          <SEO />
          <SkipLink />
          <main id="main-content">
            <Home />
          </main>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
