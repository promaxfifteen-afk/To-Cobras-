import React, { useState } from 'react';
import SensitivityCard from './components/SensitivityCard';
import AICoach from './components/AICoach';
import { SensitivityData, Preset } from './types';
import { Trophy, Shield, Crosshair, Menu, X, Github, ChevronRight, Flame } from 'lucide-react';

const DEFAULT_PRESETS: Preset[] = [
  {
    id: 'cobra-balanced',
    name: 'Cobra Recruit (Balanced)',
    description: 'Perfect stability for mid-range combat.',
    data: { general: 92, redDot: 85, scope2x: 75, scope4x: 65, sniperScope: 50, freeLook: 65 }
  },
  {
    id: 'king-cobra',
    name: 'King Cobra (One-Tap)',
    description: 'Maximum speed for lethal drag headshots.',
    data: { general: 100, redDot: 98, scope2x: 92, scope4x: 88, sniperScope: 65, freeLook: 80 }
  },
  {
    id: 'silent-viper',
    name: 'Silent Viper (Sniper)',
    description: 'Steady hands for long-range eliminations.',
    data: { general: 80, redDot: 70, scope2x: 60, scope4x: 50, sniperScope: 35, freeLook: 55 }
  }
];

function App() {
  const [currentSettings, setCurrentSettings] = useState<SensitivityData>(DEFAULT_PRESETS[0].data);
  const [activeTab, setActiveTab] = useState<'presets' | 'ai'>('presets');
  const [activePreset, setActivePreset] = useState<string>(DEFAULT_PRESETS[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // When AI generates data
  const handleAIGenerated = (data: SensitivityData) => {
    setCurrentSettings(data);
    setActiveTab('ai'); // Switch visual indicator
    // Scroll to results
    const resultsElement = document.getElementById('results-section');
    if (resultsElement) resultsElement.scrollIntoView({ behavior: 'smooth' });
  };

  const selectPreset = (preset: Preset) => {
    setCurrentSettings(preset.data);
    setActivePreset(preset.id);
    setActiveTab('presets');
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col relative overflow-x-hidden selection:bg-red-600 selection:text-white">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-0 w-[50%] h-[50%] bg-red-950/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[-10%] w-[40%] h-[40%] bg-orange-950/20 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center">
                 <div className="absolute inset-0 bg-red-600 rotate-45 rounded opacity-20 animate-pulse"></div>
                 <Flame className="text-red-500 w-6 h-6 relative z-10" fill="currentColor" />
              </div>
              <div className="ml-1">
                <h1 className="text-2xl font-brand font-black tracking-tighter text-white">
                  TO <span className="text-red-600">COBRAS</span>
                </h1>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setActiveTab('presets')}
                className={`text-sm uppercase tracking-widest font-bold transition-all hover:-translate-y-0.5 ${activeTab === 'presets' ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
              >
                Cobra Presets
              </button>
              <button 
                onClick={() => setActiveTab('ai')}
                className={`text-sm uppercase tracking-widest font-bold transition-all hover:-translate-y-0.5 ${activeTab === 'ai' ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
              >
                AI Sensei
              </button>
              <span className="bg-red-600/10 border border-red-600/30 text-red-500 px-3 py-1 rounded text-xs font-mono">
                BETA v3.0
              </span>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2 hover:bg-white/5 rounded-lg">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0a0a0c] border-b border-white/10 p-4 space-y-4 shadow-2xl">
             <button 
                onClick={() => { setActiveTab('presets'); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left py-3 px-4 rounded-lg font-brand font-bold ${activeTab === 'presets' ? 'bg-red-600/10 text-red-500' : 'text-gray-300'}`}
              >
                Cobra Presets
              </button>
              <button 
                onClick={() => { setActiveTab('ai'); setIsMobileMenuOpen(false); }}
                className={`block w-full text-left py-3 px-4 rounded-lg font-brand font-bold ${activeTab === 'ai' ? 'bg-red-600/10 text-red-500' : 'text-gray-300'}`}
              >
                AI Sensei
              </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 py-16 md:py-24 text-center px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/20 border border-red-800/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in-up">
           <Trophy size={12} /> #1 Sensitivity Guide
        </div>
        <h2 className="text-5xl md:text-7xl font-brand font-black uppercase tracking-tighter mb-6 leading-tight">
          Strike with <br className="md:hidden" />
          <span className="cobra-gradient-text">Venomous Precision</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light mb-8 leading-relaxed">
          Welcome to <strong className="text-white">TO COBRAS</strong>. Optimize your aim, control your recoil, and dominate the battleground with settings tailored for champions.
        </p>
      </div>

      {/* Main Content */}
      <main className="flex-grow z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Controls & AI */}
          <div className="lg:col-span-5 space-y-8">
            {/* Tab Switcher */}
            <div className="bg-slate-900/80 p-1.5 rounded-xl flex border border-white/10 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === 'presets' 
                    ? 'bg-gradient-to-br from-slate-800 to-slate-700 text-white shadow-lg border border-white/5' 
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                }`}
              >
                Manual Presets
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`flex-1 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === 'ai' 
                    ? 'bg-gradient-to-br from-red-700 to-red-600 text-white shadow-lg shadow-red-900/20 border border-white/10' 
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                }`}
              >
                AI Generator
              </button>
            </div>

            {activeTab === 'presets' ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-left duration-500">
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2 pl-1">Select Combat Style</h3>
                {DEFAULT_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => selectPreset(preset)}
                    className={`w-full text-left p-5 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                      activePreset === preset.id 
                        ? 'bg-gradient-to-r from-slate-900 to-slate-800 border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.15)]' 
                        : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="relative z-10 flex justify-between items-center">
                      <div>
                        <div className={`font-brand font-bold text-lg mb-1 group-hover:text-red-400 transition-colors ${activePreset === preset.id ? 'text-red-500' : 'text-gray-200'}`}>
                          {preset.name}
                        </div>
                        <div className="text-slate-500 text-sm group-hover:text-slate-400 transition-colors">{preset.description}</div>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activePreset === preset.id ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-600 group-hover:bg-slate-700'}`}>
                         <ChevronRight size={18} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-left duration-500">
                <AICoach onDataGenerated={handleAIGenerated} />
                <div className="mt-4 p-4 bg-red-950/10 rounded-lg border border-red-500/10 text-xs text-red-200/60">
                  <p className="flex gap-2">
                    <Shield size={14} className="flex-shrink-0 text-red-500" />
                    COBRA AI analyzes your device specs (PPI, Touch Sampling) to generate the deadliest sensitivity.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Visualization */}
          <div className="lg:col-span-7" id="results-section">
            <div className="sticky top-24">
               {/* Headshot Tip */}
               <div className="mb-6 flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent border border-white/5 relative overflow-hidden group">
                  <div className="absolute left-0 top-0 h-full w-1 bg-red-600"></div>
                  <div className="bg-red-500/10 p-2.5 rounded-lg border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
                    <Crosshair className="text-red-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-brand font-bold text-white text-base uppercase tracking-wider mb-1">Cobra Tip</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {activeTab === 'ai' 
                        ? "AI settings are a baseline. Increase 'General' by +2 if you use a powder or finger sleeves." 
                        : "For 'King Cobra' settings, use a quick 'J' drag motion for maximum headshot rate."}
                    </p>
                  </div>
               </div>

              <SensitivityCard 
                title={activeTab === 'ai' ? "AI Generated Config" : "Active Configuration"} 
                data={currentSettings} 
              />
              
              <div className="mt-8 flex justify-center gap-10 opacity-60 hover:opacity-100 transition-opacity">
                 <div className="text-center">
                    <div className="text-2xl font-brand font-bold text-white">4.9/5</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Rating</div>
                 </div>
                 <div className="w-px bg-slate-800 h-10"></div>
                 <div className="text-center">
                    <div className="text-2xl font-brand font-bold text-white">2.5M+</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Cobras Trained</div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 bg-[#020203] mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-brand font-bold text-2xl text-white mb-2 tracking-tighter">TO <span className="text-red-600">COBRAS</span></p>
          <p className="text-slate-500 text-sm">Strike with precision. Win with style.</p>
          <p className="text-slate-700 text-xs mt-6">© {new Date().getFullYear()} TO COBRAS. Not affiliated with Garena.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;