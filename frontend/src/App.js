import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import "./App.css";

import { TransitionProvider } from "./transition/TransitionProvider";
import TabBar from "./components/nav/TabBar";
import AboutTab from "./components/tabs/AboutTab";
import ExperienceTab from "./components/tabs/ExperienceTab";
import SkillsTab from "./components/tabs/SkillsTab";
import EducationTab from "./components/tabs/EducationTab";
import WordsTab from "./components/tabs/WordsTab";
import ContactTab from "./components/tabs/ContactTab";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <TransitionProvider>
          <TabBar />
          <Routes>
            <Route path="/" element={<AboutTab />} />
            <Route path="/about" element={<AboutTab />} />
            <Route path="/experience" element={<ExperienceTab />} />
            <Route path="/skills" element={<SkillsTab />} />
            <Route path="/education" element={<EducationTab />} />
            <Route path="/words" element={<WordsTab />} />
            <Route path="/contact" element={<ContactTab />} />
            <Route path="*" element={<Navigate to="/about" replace />} />
          </Routes>
        </TransitionProvider>
        <Toaster richColors position="bottom-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
