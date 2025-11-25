
import React, { useState, useEffect } from 'react';
import FadeInSection from './FadeInSection';
import { IMAGES } from '../constants';
import { ShieldCheck, Zap, X, Settings, RefreshCw, Save } from 'lucide-react';

const WarView: React.FC = () => {
  // --- Estados de Datos (Configurables) ---
  const [konohaBalance, setKonohaBalance] = useState(82);
  const [activeSeals, setActiveSeals] = useState(12);
  const [protectedSeals, setProtectedSeals] = useState(5);
  const [mapStatus, setMapStatus] = useState("Rastreo Satelital Activo");
  
  // --- Estados de UI ---
  const [showPopup, setShowPopup] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  // Popup de simulación inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  // Función para forzar re-lanzar el popup de evento
  const triggerEventPopup = () => {
    setShowPopup(false);
    setTimeout(() => setShowPopup(true), 100);
  };

  return (
    <div className="bg-[#fdfdfd] shadow-2xl rounded-xl overflow-hidden min-h-[80vh] relative">
      
      {/* Simple Header */}
      <div className="pt-10 pb-5 text-center bg-[#f0fdf9]">
         <h1 className="text-3xl md:text-5xl font-bold text-[#0a3d35] tracking-tight uppercase">
            Shinobi Gaiden 2.0
          </h1>
      </div>

      <div className="p-6 md:p-12 space-y-12 bg-[#fdfdfd] pb-24">
        
        {/* Power Balance Section */}
        <FadeInSection>
          <section className="mb-8">
            <div className="flex justify-between items-end mb-2 font-bold tracking-wider">
              <span className="text-2xl text-[#1f655c] uppercase">Konoha</span>
              <span className="text-xs text-gray-400 uppercase tracking-widest">Balance de Guerra</span>
              <span className="text-2xl text-blue-700 uppercase">Kirigakure</span>
            </div>
            
            <div className="w-full h-10 bg-blue-600 rounded-full relative overflow-hidden shadow-inner flex items-center">
              {/* Konoha Bar (Green) */}
              <div 
                className="h-full bg-[#22c55e] flex items-center justify-start pl-4 text-white font-bold transition-all duration-500 ease-out relative"
                style={{ width: `${konohaBalance}%` }}
              >
                <span className="relative z-10">{konohaBalance}%</span>
                {/* Efecto visual sutil de brillo en la barra */}
                <div className="absolute top-0 right-0 h-full w-4 bg-white/20 skew-x-[-20deg]"></div>
              </div>
              {/* Kirigakure Label (calculated) */}
              <div className="absolute right-4 text-white font-bold transition-all duration-500">
                {100 - konohaBalance}%
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Seals Stats Section */}
        <FadeInSection>
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-6 w-1 bg-[#1f655c] rounded-full"></div>
              <h2 className="text-xl font-bold text-[#0a3d35] flex items-center gap-2">
                 📜 Sellos (Descubiertos)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Active Seals Card */}
              <div className="bg-white border border-[#d4e2dd] rounded-xl p-8 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-orange-400 mb-4">
                  <Zap size={32} />
                </div>
                <span className="text-5xl font-bold text-[#0a3d35] mb-1">{activeSeals}</span>
                <span className="text-sm font-bold text-gray-400 tracking-widest uppercase">Activos</span>
              </div>

              {/* Protected Seals Card */}
              <div className="bg-white border border-[#d4e2dd] rounded-xl p-8 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-[#1f655c] mb-4">
                  <ShieldCheck size={32} />
                </div>
                <span className="text-5xl font-bold text-[#0a3d35] mb-1">{protectedSeals}</span>
                <span className="text-sm font-bold text-gray-400 tracking-widest uppercase">Protegidos</span>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Map Section */}
        <FadeInSection delay="delay-100">
          <section className="relative">
             <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#1f655c]"></div>
                  <h2 className="text-lg font-bold text-[#0a3d35]">Localización de Sellos</h2>
                </div>
                <span className="px-2 py-1 border border-gray-200 text-gray-400 text-xs font-bold rounded uppercase">
                  Live
                </span>
             </div>

             <div className="relative p-2 bg-white border border-[#d4e2dd] rounded-xl shadow-sm">
               <div className="relative rounded-lg overflow-hidden border border-gray-100 bg-gray-100">
                  <img 
                    src={IMAGES.warMap}
                    alt="Mapa de Guerra" 
                    className="w-full h-auto object-cover min-h-[300px] opacity-90 hover:opacity-100 transition-opacity"
                  />
                  
                  {/* Overlay UI on Map (Dynamic Status) */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-md shadow-sm border border-green-100 flex items-center gap-2 max-w-[80%]">
                    <span className="relative flex h-3 w-3 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-bold text-[#0a3d35] uppercase tracking-wide truncate">
                      {mapStatus}
                    </span>
                  </div>
               </div>
             </div>
             
             <p className="text-center text-xs text-gray-400 mt-4 font-medium">
               El mapa se actualiza en tiempo real según los informes de los ANBU en el campo.
             </p>
          </section>
        </FadeInSection>
      </div>

      {/* --- Admin/Config Button (FAB) --- */}
      <button 
        onClick={() => setShowConfig(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#0a3d35] text-white p-4 rounded-full shadow-lg hover:bg-[#1f655c] hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-green-300"
        title="Configuración de Guerra"
      >
        <Settings size={24} />
      </button>

      {/* --- Admin Alert Popup --- */}
      {showPopup && (
        <div className="fixed bottom-24 right-6 z-50 animate-bounce cursor-pointer" onClick={() => setShowPopup(false)}>
          <div className="bg-[#0a3d35] text-white p-4 rounded-lg shadow-2xl max-w-sm border-l-4 border-yellow-400 relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowPopup(false); }}
              className="absolute top-2 right-2 text-green-200 hover:text-white"
            >
              <X size={16} />
            </button>
            <h4 className="font-bold text-yellow-400 mb-1 text-sm uppercase flex items-center gap-2">
              <Zap size={14} /> ¡Atención Shinobi!
            </h4>
            <p className="text-sm leading-snug">
              ¡Se ha descubierto un sello! Consulta el foro para más información.
            </p>
          </div>
        </div>
      )}

      {/* --- Configuration Modal --- */}
      {showConfig && (
        <div className="fixed inset-0 z-[1100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-[#0a3d35] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Settings size={20} /> Panel de Control
              </h3>
              <button 
                onClick={() => setShowConfig(false)}
                className="text-green-200 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* Balance Slider */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Balance de Guerra (Konoha: {konohaBalance}%)
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={konohaBalance}
                  onChange={(e) => setKonohaBalance(Number(e.target.value))}
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-[#22c55e]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                   <span>Kirigakure Wins</span>
                   <span>Konoha Wins</span>
                </div>
              </div>

              {/* Seal Counters */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                     Sellos Activos
                   </label>
                   <input 
                      type="number"
                      value={activeSeals}
                      onChange={(e) => setActiveSeals(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-[#0a3d35] font-bold focus:ring-2 focus:ring-[#1f655c] focus:outline-none"
                   />
                </div>
                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                     Sellos Protegidos
                   </label>
                   <input 
                      type="number"
                      value={protectedSeals}
                      onChange={(e) => setProtectedSeals(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-[#0a3d35] font-bold focus:ring-2 focus:ring-[#1f655c] focus:outline-none"
                   />
                </div>
              </div>

              {/* Map Text Input */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Estado del Mapa / Ubicación
                </label>
                <input 
                  type="text"
                  value={mapStatus}
                  onChange={(e) => setMapStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#1f655c] focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                 <button 
                  onClick={triggerEventPopup}
                  className="w-full flex items-center justify-center gap-2 text-sm text-[#1f655c] bg-[#e5f2ed] py-2 rounded-lg hover:bg-[#d1e8e1] transition-colors"
                 >
                   <RefreshCw size={16} /> Simular Alerta de Sello
                 </button>
                 
                 <button 
                   onClick={() => setShowConfig(false)}
                   className="w-full flex items-center justify-center gap-2 bg-[#0a3d35] text-white py-2 rounded-lg font-semibold hover:bg-[#1f655c] transition-colors shadow-lg"
                 >
                   <Save size={18} /> Guardar Cambios
                 </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarView;
