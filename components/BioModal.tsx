
import React from 'react';
import { MASON_BIO } from '../constants';

interface BioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BioModal: React.FC<BioModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Fallback images in case local loading fails
  const fallbackImage1 = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/James_Mason_in_The_Seventh_Veil_trailer.jpg/320px-James_Mason_in_The_Seventh_Veil_trailer.jpg";
  const fallbackImage2 = "https://upload.wikimedia.org/wikipedia/commons/6/6c/James_Mason_Boxer_1947.jpg";

  // Prevent infinite loops if fallback also fails
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallback: string) => {
    const target = e.currentTarget;
    if (target.src !== fallback) {
      target.src = fallback;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      {/* CORREÇÃO: Max-height definida em 85vh para não estourar tela, padding otimizado */}
      <div className="bg-deco-dark border-2 border-deco-gold w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-lg shadow-[0_0_40px_rgba(212,175,55,0.4)] relative flex flex-col scrollbar-thin scrollbar-thumb-deco-gold scrollbar-track-deco-dark">
        {/* Decorative corner */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-4 border-l-4 border-deco-gold pointer-events-none"></div>
        <div className="absolute top-3 right-3 w-6 h-6 border-t-4 border-r-4 border-deco-gold pointer-events-none"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-deco-gold hover:text-white transition-colors text-3xl z-10 bg-deco-dark/50 rounded-full w-10 h-10 flex items-center justify-center"
        >
          &times;
        </button>

        <div className="p-6 md:p-8 text-center">
          
          {/* Dual Image Gallery - Slightly smaller on mobile to save space */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6 mt-4">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-deco-gold overflow-hidden shadow-2xl shrink-0 group">
               <img 
                src="./james-mason1.jpg"
                onError={(e) => handleImageError(e, fallbackImage1)}
                alt="James Mason Portrait" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            {/* Second image with slightly different style for visual interest */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg border-4 border-deco-gold overflow-hidden shadow-2xl shrink-0 transform md:rotate-2 group">
               <img 
                src="./james-mason2.jpg"
                onError={(e) => handleImageError(e, fallbackImage2)}
                alt="James Mason Scene" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-deco text-deco-gold mb-2 tracking-wide">{MASON_BIO.name}</h2>
          <p className="text-gray-400 italic font-serif text-lg md:text-xl mb-4">{MASON_BIO.birth}</p>
          
          <div className="text-left space-y-4 font-sans text-deco-paper leading-relaxed text-base md:text-lg">
            <p>{MASON_BIO.description}</p>
            
            <div className="my-4 border-t border-gray-700 pt-4">
              <h3 className="font-deco text-deco-gold mb-3 text-xl md:text-2xl">Traços Marcantes</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {MASON_BIO.traits.map((trait, index) => (
                  <li key={index}>{trait}</li>
                ))}
              </ul>
            </div>

            <div className="bg-black/40 p-4 rounded border border-gray-800 text-sm md:text-base">
              <p className="text-gray-400 italic text-center">
                "Eu sou um ator, não uma celebridade." — James Mason
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
