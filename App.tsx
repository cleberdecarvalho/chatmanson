
import React, { useState, useEffect, useRef } from 'react';
import { Message, GameStats } from './types';
import { INITIAL_STATS, INITIAL_MESSAGE, MASON_BIO } from './constants';
// Alterado para usar o serviço da Groq
import { sendMessageToMason } from './services/groqService';
import { StatsBar } from './components/StatsBar';
import { BioModal } from './components/BioModal';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBioOpen, setIsBioOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with first message
  useEffect(() => {
    const { cleanText } = processResponse(INITIAL_MESSAGE);
    setMessages([{
      role: 'model',
      text: cleanText,
      timestamp: new Date()
    }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [messages, isLoading]);

  const processResponse = (rawText: string) => {
    let cleanText = rawText;
    let newTrust = stats.trust;
    let newIntimacy = stats.intimacy;

    const trustMatch = rawText.match(/Confiança:\s*(\d+)%/i);
    const intimacyMatch = rawText.match(/Intimidade:\s*(\d+)%/i);

    if (trustMatch) newTrust = parseInt(trustMatch[1]);
    if (intimacyMatch) newIntimacy = parseInt(intimacyMatch[1]);

    cleanText = cleanText.replace(/Confiança:\s*\d+%/gi, '').replace(/Intimidade:\s*\d+%/gi, '').trim();

    return { cleanText, newTrust, newIntimacy };
  };

  const handleReset = () => {
    // Removed window.confirm to ensure immediate execution and avoid browser blocking issues
    setIsLoading(false);
    setInput(''); // Clear input box
    setStats(INITIAL_STATS);
    const { cleanText } = processResponse(INITIAL_MESSAGE);
    setMessages([{ 
      role: 'model', 
      text: cleanText, 
      timestamp: new Date() 
    }]);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const lowerInput = userMsg.text.toLowerCase();
    if (['reiniciar', 'reset', 'nova história'].some(cmd => lowerInput.includes(cmd))) {
      handleReset();
      setIsLoading(false); // Ensure loading is off if we reset via text command
      return;
    }

    try {
      const responseRaw = await sendMessageToMason([...messages, userMsg], userMsg.text);
      const { cleanText, newTrust, newIntimacy } = processResponse(responseRaw);
      setStats({ trust: newTrust, intimacy: newIntimacy });
      
      const modelMsg: Message = {
        role: 'model',
        text: cleanText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessageText = (text: string) => {
    // Remove all line breaks and join text into a single paragraph
    const cleanText = text.replace(/\n+/g, ' ').trim();
    
    // Split by actions (text between asterisks)
    const parts = cleanText.split(/(\*[^*]+\*)/g);
    
    return (
      <div className="leading-relaxed text-base md:text-lg">
        {parts.map((part, partIdx) => {
          const isAction = part.startsWith('*') && part.endsWith('*');
          if (isAction) {
            const content = part.slice(1, -1);
            return (
              <span key={partIdx} className="text-gray-400 italic font-sans text-sm md:text-base">
                {content}
              </span>
            );
          }
          return (
            <span key={partIdx} className="font-serif text-[#E0C097] tracking-wide text-lg md:text-xl">
              {part}
            </span>
          );
        })}
      </div>
    );
  };

  // Fallback para imagem local se falhar, usando constante para URL online
  const fallbackImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/James_Mason_in_The_Seventh_Veil_trailer.jpg/320px-James_Mason_in_The_Seventh_Veil_trailer.jpg";
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    // Proteção contra loop infinito de erro
    if (target.src !== fallbackImage) {
      target.src = fallbackImage;
    }
  };

  return (
    <div className="relative flex h-screen w-full overflow-hidden font-sans">
      
      {/* ================= BACKGROUND IMAGE LAYER ================= */}
      <div className="absolute inset-0 z-0">
        <img 
          src="./background.jpg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      {/* ================= CONTENT LAYER (z-10 to sit above background) ================= */}
      <div className="relative z-10 flex h-full w-full">
      
        {/* ================= AREA ESQUERDA: CHAT (LIVRO/NOVEL STYLE) ================= */}
        <div className="flex-1 flex flex-col h-full relative">
          
          {/* HEADER RESTAURADO: Visível em Desktop e Mobile */}
          <header className="flex-none bg-[#0E0E0E]/90 border-b border-[#D4AF37]/20 p-4 flex justify-between items-center z-20 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-sm">
               <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setIsBioOpen(true)}>
                  <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-[#D4AF37] group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                     <img src="./james-mason1.jpg" onError={handleImageError} alt="JM" className="w-full h-full object-cover" />
                     {/* Online dot */}
                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                  </div>
                  <div>
                     <h1 className="font-deco text-[#D4AF37] text-sm md:text-xl tracking-widest leading-none drop-shadow-md">VIAJANDO NO TEMPO</h1>
                     <span className="text-gray-500 text-[10px] md:text-xs font-sans uppercase tracking-[0.2em]">James Mason • 1945</span>
                  </div>
               </div>
               
               <div className="flex items-center gap-4">
                   {/* Stats compactos apenas no Mobile (Desktop tem sidebar) */}
                   <div className="md:hidden flex flex-col items-end gap-1 mr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-blue-400 font-bold uppercase">Conf</span>
                        <div className="w-12 h-1 bg-gray-800 rounded-full"><div style={{width: `${stats.trust}%`}} className="h-full bg-blue-500 rounded-full"></div></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-red-500 font-bold uppercase">Int</span>
                        <div className="w-12 h-1 bg-gray-800 rounded-full"><div style={{width: `${stats.intimacy}%`}} className="h-full bg-red-600 rounded-full"></div></div>
                      </div>
                   </div>

                   <button 
                      onClick={handleReset} 
                      className="border border-[#D4AF37]/50 text-[#D4AF37] px-3 py-1 md:px-4 md:py-2 text-[10px] md:text-xs font-deco tracking-widest hover:bg-[#D4AF37] hover:text-[#0E0E0E] transition-all rounded-sm uppercase active:scale-95"
                   >
                      RESET
                   </button>
               </div>
          </header>

          {/* Área de Mensagens */}
          <main className="flex-1 overflow-y-auto p-4 md:p-0 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
            <div className="max-w-4xl mx-auto min-h-full flex flex-col justify-end pb-4 pt-4">
              
              {/* INTRO VIDEO - FIXADO ACIMA DO DIÁLOGO */}
              <div className="w-full mb-8 animate-fade-in px-4 md:px-8">
                 <video 
                    src="./Intro.mp4" 
                    controls 
                    autoPlay 
                    muted 
                    className="w-full rounded-lg border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.1)] bg-black aspect-video object-cover"
                 >
                    Seu navegador não suporta a exibição de vídeos.
                 </video>
              </div>

              {messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                
                if (isUser) {
                  // USER MESSAGE (Right aligned bubble, simple)
                  return (
                    <div key={index} className="flex justify-end mb-6 px-4 md:px-8 animate-fade-in">
                      <div className="bg-[#2A2A2A]/90 backdrop-blur-sm text-gray-100 py-3 px-5 rounded-2xl rounded-tr-sm max-w-[85%] border border-white/5 shadow-sm">
                        <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                      </div>
                      <div className="w-8 h-8 ml-3 rounded-full bg-indigo-900/50 flex items-center justify-center text-xs font-bold border border-white/10 shrink-0 backdrop-blur-sm">
                        VC
                      </div>
                    </div>
                  );
                } else {
                  // MODEL MESSAGE (NOVEL STYLE - SEM BALÕES DE FUNDO PARA O PERSONAGEM)
                  return (
                    <div key={index} className="flex mb-8 px-4 md:px-8 animate-fade-in">
                      {/* Avatar Column */}
                      <div className="flex-none mr-3 md:mr-4 flex flex-col items-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-[#D4AF37]/30 shadow-sm cursor-pointer hover:border-[#D4AF37] transition-colors" onClick={() => setIsBioOpen(true)}>
                          <img 
                            src="./james-mason1.jpg" 
                            onError={handleImageError} 
                            alt="James Mason" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Content Column - Novel Style (No background bubble) */}
                      <div className="flex-1 min-w-0">
                         <div className="flex items-center gap-2 mb-2">
                          <span className="text-[#D4AF37] font-deco font-bold tracking-wider text-xs md:text-sm text-shadow-black">James Mason</span>
                        </div>
                        
                        {/* Texto flui diretamente no fundo, sem container colorido */}
                        <div className="prose prose-invert max-w-none drop-shadow-md">
                             {renderMessageText(msg.text)}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}

              {/* Loading State */}
              {isLoading && (
                <div className="flex px-4 md:px-8 mb-8">
                   <div className="w-10 h-10 md:w-12 md:h-12 mr-4 rounded-full overflow-hidden border border-gray-700 opacity-50">
                      <img src="./james-mason1.jpg" onError={handleImageError} className="w-full h-full object-cover grayscale" />
                   </div>
                   <div className="flex items-center text-gray-500 italic text-sm">
                      <span className="animate-pulse">James está pensando...</span>
                   </div>
                </div>
              )}
              
              <div ref={messagesEndRef} className="h-4" />
            </div>
          </main>

          {/* Input Area (Floating at bottom center) */}
          <footer className="flex-none p-4 md:p-6 bg-gradient-to-t from-black via-black/90 to-transparent z-10">
            <div className="max-w-4xl mx-auto relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Digite sua resposta..."
                className="w-full bg-[#1A1A1A]/90 backdrop-blur-md text-gray-100 border border-gray-700/50 rounded-xl px-4 py-4 pr-12 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-[#202020] transition-all shadow-lg font-sans text-base placeholder-gray-600"
                autoFocus
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#D4AF37] transition-colors disabled:opacity-30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
          </footer>
        </div>

        {/* ================= AREA DIREITA: PERFIL FIXO (SIDEBAR) ================= */}
        {/* CORREÇÃO: Altura definida por porcentagem para não estourar a tela */}
        <aside className="hidden md:flex w-[380px] h-full bg-[#0E0E0E]/95 border-l border-white/5 flex-col shadow-2xl z-20 backdrop-blur-sm overflow-hidden">
          
          {/* Imagem Grande de Destaque - Altura fixa em 45% da tela */}
          <div className="relative w-full h-[45%] group cursor-pointer overflow-hidden flex-none" onClick={() => setIsBioOpen(true)}>
             <img 
                src="./james-mason1.jpg"
                onError={handleImageError}
                alt="James Mason Profile"
                className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
             />
             {/* Gradiente Overlay para texto legível */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-transparent"></div>
             
             <div className="absolute bottom-0 left-0 w-full p-6">
                <h1 className="font-deco text-3xl text-[#D4AF37] drop-shadow-lg mb-1">{MASON_BIO.name}</h1>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em] mb-4">Londres, 1945</p>
                
                {/* Stats Overlay on Image */}
                <div className="space-y-4 bg-black/60 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                   <StatsBar label="Confiança" value={stats.trust} colorClass="bg-blue-600" />
                   <StatsBar label="Intimidade" value={stats.intimacy} colorClass="bg-red-700" />
                </div>
             </div>
          </div>

          {/* Scrollable Bio Content - Ocupa o restante da altura (flex-1) */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-800">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Características</h3>
             <div className="flex flex-wrap gap-2 mb-6">
                {MASON_BIO.traits.map((trait, i) => (
                   <span key={i} className="text-[11px] text-gray-300 bg-white/5 px-2 py-1 rounded border border-white/5">
                      {trait}
                   </span>
                ))}
             </div>

             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Contexto Atual</h3>
             <p className="text-sm text-gray-400 font-sans leading-relaxed mb-6">
                {MASON_BIO.description}
             </p>

             <div className="p-4 bg-[#151515] rounded border border-[#D4AF37]/20 text-center">
                <p className="italic font-serif text-[#D4AF37] text-sm">
                   "Eu sou um ator, não uma celebridade."
                </p>
             </div>
             
             <button 
                onClick={() => setIsBioOpen(true)}
                className="w-full mt-6 py-2 text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors border-t border-white/5"
             >
                Ver Detalhes Completos
             </button>
             
             {/* Espaço extra no final para garantir scroll confortável */}
             <div className="h-4"></div>
          </div>
        </aside>

        <BioModal isOpen={isBioOpen} onClose={() => setIsBioOpen(false)} />
      </div>
    </div>
  );
};

export default App;
