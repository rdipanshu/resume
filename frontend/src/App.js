import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import "./App.css";

import { ThemeProvider } from "./components/portfolio/ThemeProvider";
import Header from "./components/portfolio/Header";
import Hero from "./components/portfolio/Hero";
import About from "./components/portfolio/About";
import Experience from "./components/portfolio/Experience";
import Skills from "./components/portfolio/Skills";
import Education from "./components/portfolio/Education";
import Testimonials from "./components/portfolio/Testimonials";
import Contact from "./components/portfolio/Contact";
import Footer from "./components/portfolio/Footer";
import Scene3D from "./components/portfolio/Scene3D";

const HomePage = () => {
  return (
    <div className="App relative">
      <Scene3D />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
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
