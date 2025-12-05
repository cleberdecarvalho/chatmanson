import React from 'react';

interface StatsBarProps {
  label: string;
  value: number;
  colorClass: string;
}

export const StatsBar: React.FC<StatsBarProps> = ({ label, value, colorClass }) => {
  return (
    <div className="flex flex-col w-full max-w-[180px] mx-2">
      <div className="flex justify-between items-center text-xs md:text-sm font-bold font-deco tracking-widest text-deco-gold mb-1 md:mb-2">
        <span className="mr-3">{label.toUpperCase()}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 md:h-3 w-full bg-deco-dark border border-gray-600 rounded-full overflow-hidden relative shadow-inner">
        <div 
          className={`h-full transition-all duration-1000 ease-out ${colorClass}`}
          style={{ width: `${value}%` }}
        />
        {/* Shine effect */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white opacity-10"></div>
      </div>
    </div>
  );
};