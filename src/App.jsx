import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import DealList from "./components/DealList";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-blue-200 to-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <HeroSection />
        <DealList />
      </main>
    </div>
  );
};

export default App;
