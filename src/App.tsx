import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HeroSection from "./components/hero-section";
import ProgramStudi from "./pages/program-studi";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        <main className="w-full pt-16">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/program-studi" element={<ProgramStudi />} />
          </Routes>
        </main>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
