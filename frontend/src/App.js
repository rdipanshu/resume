import React, { useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import "./App.css";

import { ThemeProvider } from "./components/portfolio/ThemeProvider";
import Header from "./components/portfolio/Header";
import Hero from "./components/portfolio/Hero";
import About from "./components/portfolio/About";
import Experience from "./components/portfolio/Experience";
import Skills from "./components/portfolio/Skills";
import Projects from "./components/portfolio/Projects";
import EducationCerts from "./components/portfolio/EducationCerts";
import Testimonials from "./components/portfolio/Testimonials";
import Blog from "./components/portfolio/Blog";
import Contact from "./components/portfolio/Contact";
import Footer from "./components/portfolio/Footer";
import PrintableCV from "./components/portfolio/PrintableCV";

const HomePage = () => {
  const handleDownload = useCallback(() => {
    // Trigger browser print dialog — user can save the printable CV as a PDF.
    window.print();
  }, []);

  return (
    <div className="App relative">
      <Header onDownload={handleDownload} />
      <main>
        <Hero onDownload={handleDownload} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <EducationCerts />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <PrintableCV />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="bottom-right" />
    </ThemeProvider>
  );
}

export default App;
