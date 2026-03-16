import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

const NeuralAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Neural Link Established. I am Spirit AI. How can I optimize your mindset today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.toLowerCase();
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let response = "";

      // --- HEURISTIC INTELLIGENCE MATRIX ---
      if (userMsg.includes("prime minister") && userMsg.includes("india")) {
        response = "The current Prime Minister of India is Shri Narendra Modi. He has been serving since 2014.";
      } 
      else if (userMsg.includes("who are u") || userMsg.includes("your name")) {
        response = "I am Spirit AI, a high-level neural interface designed to analyze cognitive patterns for StudentMind.";
      }
      else if (userMsg.includes("status") || userMsg.includes("system")) {
        response = "All systems nominal. Neural Link: 89% Focus Efficiency. Encryption: AES-256 Active.";
      }
      else if (userMsg.includes("okay") || userMsg.includes("good") || userMsg.includes("correct")) {
        response = "Confirmed. Neural paths synchronized. Focus rank updated to peak levels.";
      }
      else if (userMsg.includes("help") || userMsg.includes("what can you do")) {
        response = "I can decode research, analyze your cognitive load, and provide multi-lingual summaries of your HUD.";
      }
      else {
        response = "Analyzing data packet... My current neural database suggests you focus on 'Quantum Learning Patterns' based on your recent activity.";
      }
      
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="bg-[#0f172a]/90 border border-indigo-500/30 w-80 h-[450px] rounded-[2.5rem] shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden mb-6"
          >
            <div className="bg-indigo-600/20 p-5 border-b border-indigo-500/20 flex justify-between items-center">
              <div className="flex items-center gap-2 text-indigo-400">
                <Sparkles size={16} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Neural Assistant v1.5</span>
              </div>
              <X size={16} className="cursor-pointer text-indigo-400 hover:text-white" onClick={() => setIsOpen(false)}/>
            </div>

            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] leading-relaxed shadow-lg ${
                    m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-300 rounded-tl-none border border-slate-700'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700 animate-pulse text-[9px] text-indigo-400 font-bold uppercase tracking-widest">
                    AI Brain Computing...
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-900/50 border-t border-slate-800 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Neural Core..." 
                className="bg-black/50 border border-slate-700 rounded-xl px-4 py-2 text-[10px] flex-1 outline-none focus:border-indigo-500 text-white transition-all" 
              />
              <button onClick={handleSend} className="bg-indigo-600 p-2.5 rounded-xl text-white hover:bg-indigo-500 transition-colors shadow-lg">
                <Send size={16}/>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-600 p-5 rounded-[1.5rem] shadow-[0_0_30px_#6366f170] text-white relative group border border-indigo-400/30"
      >
        <MessageSquare size={28} />
      </motion.button>
    </div>
  );
};

export default NeuralAssistant;