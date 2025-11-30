import React, { useState } from 'react';
import { PlayStyle, SensitivityData, GenerationStatus } from '../types';
import { generateSensitivitySettings } from '../services/gemini';
import { Bot, Smartphone, Gamepad2, Loader2, Sparkles, AlertCircle, Zap } from 'lucide-react';

interface AICoachProps {
  onDataGenerated: (data: SensitivityData) => void;
}

const AICoach: React.FC<AICoachProps> = ({ onDataGenerated }) => {
  const [device, setDevice] = useState('');
  const [playStyle, setPlayStyle] = useState<PlayStyle>(PlayStyle.BALANCED);
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!device.trim()) return;

    setStatus('loading');
    setError(null);

    try {
      const data = await generateSensitivitySettings(device, playStyle);
      onDataGenerated(data);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setError("Connection to Cobra Server failed. Verify API Key.");
      setStatus('error');
    } finally {
      // Reset success status after animation
      setTimeout(() => {
        if (status !== 'error') setStatus('idle');
      }, 2000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0f0f13] to-[#0a0a0c] border border-slate-800 rounded-xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl pointer-events-none group-hover:bg-red-600/10 transition-colors"></div>
      
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="bg-gradient-to-br from-red-600 to-red-800 p-3 rounded-xl shadow-lg shadow-red-900/20">
          <Bot className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-brand font-bold text-white tracking-wide">Cobra AI Sensei</h2>
          <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Device Analysis Module</p>
        </div>
      </div>

      <form onSubmit={handleGenerate} className="space-y-6 relative z-10">
        {/* Device Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-300 uppercase tracking-wide">
            <Smartphone size={16} className="text-red-500" />
            Your Device Model
          </label>
          <input
            type="text"
            value={device}
            onChange={(e) => setDevice(e.target.value)}
            placeholder="e.g. iPhone 13, Samsung S23, POCO X3..."
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-medium"
            required
          />
        </div>

        {/* Playstyle Select */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-300 uppercase tracking-wide">
            <Gamepad2 size={16} className="text-red-500" />
            Combat Style
          </label>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(PlayStyle).map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setPlayStyle(style)}
                className={`text-xs md:text-sm py-3 px-2 rounded-lg border transition-all duration-200 ${
                  playStyle === style
                    ? 'bg-red-600/10 border-red-500 text-red-400 font-bold shadow-[0_0_15px_rgba(220,38,38,0.1)]'
                    : 'bg-slate-900/30 border-slate-800 text-gray-500 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                {style.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>

        {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-950/20 p-3 rounded-lg text-sm border border-red-900/30 animate-pulse">
                <AlertCircle size={16} />
                {error}
            </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className={`w-full group relative overflow-hidden py-4 rounded-lg font-brand font-bold uppercase tracking-widest text-white transition-all duration-300 shadow-lg
            ${status === 'loading' ? 'bg-slate-800 cursor-not-allowed' : 'bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 hover:shadow-red-900/30 hover:-translate-y-0.5'}
          `}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {status === 'loading' ? (
              <>
                <Loader2 className="animate-spin" /> Calibrating...
              </>
            ) : (
              <>
                <Zap size={20} className="group-hover:text-yellow-300 transition-colors" /> Generate Venom Settings
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  );
};

export default AICoach;