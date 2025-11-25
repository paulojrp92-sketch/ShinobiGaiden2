import React, { useState } from 'react';
import Header from './components/Header';
import SubNav from './components/SubNav';
import FadeInSection from './components/FadeInSection';
import HomeView from './components/HomeView';
import WarView from './components/WarView';

const App: React.FC = () => {
  // State to manage which view is currently active
  const [currentView, setCurrentView] = useState<'home' | 'war'>('home');

  return (
    <div className="min-h-screen relative">
      {/* 
        LAYER 1: FONDO FIJO (Patrón de Nubes)
      */}
      <div 
        className="fixed inset-0 w-full h-full -z-50"
        style={{
          backgroundColor: '#468076', 
          backgroundImage: `url('769fe8ea-0909-4939-a67d-b5d2104f3e5a.png')`,
          backgroundRepeat: 'repeat',
          backgroundPosition: 'top left',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Navigation Layer */}
      <Header />
      <SubNav 
        currentView={currentView} 
        onNavigate={setCurrentView} 
      />

      {/* 
        LAYER 2: CAPA CENTRAL (Contenido que se mueve)
      */}
      <main className="relative z-10 max-w-6xl mx-auto mt-[130px] mb-20 px-4 md:px-0">
        
        {/* Render View based on state */}
        {currentView === 'home' ? (
          <HomeView />
        ) : (
          <WarView />
        )}

        {/* Global Footer */}
        <FadeInSection delay="delay-200">
          <div className="text-center mt-10 text-[#0a3d35]/80 text-sm font-semibold bg-white/80 inline-block px-4 py-2 rounded-lg backdrop-blur-sm mx-auto w-full max-w-max shadow-sm block">
            &copy; {new Date().getFullYear()} Shinobi Gaiden 2.0 - Roleplay Community
          </div>
        </FadeInSection>
      </main>
    </div>
  );
};

export default App;