import React from 'react';
import { SensitivityData } from '../types';
import { Target, Crosshair, Eye, Zap, ZoomIn, Disc } from 'lucide-react';

interface SensitivityCardProps {
  data: SensitivityData;
  title?: string;
}

const SensitivitySlider = ({ label, value, icon: Icon, color }: { label: string; value: number; icon: any; color: string }) => (
  <div className="mb-4 group">
    <div className="flex justify-between items-end mb-1">
      <div className="flex items-center gap-2 text-gray-300 group-hover:text-white transition-colors">
        <Icon size={18} className={color} />
        <span className="font-medium tracking-wide text-sm md:text-base">{label}</span>
      </div>
      <span className={`font-brand font-bold text-lg ${color}`}>{value}</span>
    </div>
    <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-1000 ease-out ${color.replace('text-', 'bg-')}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const SensitivityCard: React.FC<SensitivityCardProps> = ({ data, title }) => {
  return (
    <div className="w-full bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-xl p-6 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      
      {title && (
        <div className="flex items-center gap-2 mb-6 border-b border-slate-700 pb-3">
          <Zap className="text-red-500" />
          <h2 className="text-2xl font-brand font-bold text-white uppercase tracking-wider">{title}</h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        <SensitivitySlider 
          label="General" 
          value={data.general} 
          icon={Disc} 
          color="text-red-500" 
        />
        <SensitivitySlider 
          label="Red Dot" 
          value={data.redDot} 
          icon={Target} 
          color="text-orange-500" 
        />
        <SensitivitySlider 
          label="2x Scope" 
          value={data.scope2x} 
          icon={ZoomIn} 
          color="text-yellow-500" 
        />
        <SensitivitySlider 
          label="4x Scope" 
          value={data.scope4x} 
          icon={Crosshair} 
          color="text-green-500" 
        />
        <SensitivitySlider 
          label="Sniper Scope" 
          value={data.sniperScope} 
          icon={Crosshair} 
          color="text-blue-500" 
        />
        <SensitivitySlider 
          label="Free Look" 
          value={data.freeLook} 
          icon={Eye} 
          color="text-purple-500" 
        />
      </div>
    </div>
  );
};

export default SensitivityCard;