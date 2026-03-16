import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Zap, Activity, ShieldAlert, Cpu, 
  BarChart3, Radio, Database, ShieldCheck, 
  Fingerprint, Terminal, Info, Globe
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Radar as RadarArea, ResponsiveContainer } from 'recharts';

import NeuralCanvas from './components/NeuralCanvas';
import NeuralAssistant from './components/NeuralAssistant';

function App() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booting, setBooting] = useState(true);
  const [verified, setVerified] = useState(false);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    // Stage 1: System Boot Sequence
    setTimeout(() => setBooting(false), 3000);

    // Stage 2: Handshake with Backend
    axios.get('http://localhost:5000/api/insights')
      .then(res => { 
        setInsights(res.data); 
        setLoading(false); 
      })
      .catch(() => {
        console.error("Neural Core link failed");
        setLoading(false);
      });

    const interval = setInterval(() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 250);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // --- BOOT SCREEN COMPONENT (FIXED > ERRORS) ---
  if (booting) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center font-mono p-10">
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-indigo-500 text-xs w-full max-w-md space-y-1">
            <p>&gt; INITIALIZING SPIRIT_OS_v4.0...</p>
            <p>&gt; LOADING NEURAL_CORE... [OK]</p>
            <p>&gt; CONNECTING TO SCRAPER_SATELLITE... [OK]</p>
            <p>&gt; ENCRYPTING DATA STREAMS (AES-256)... [OK]</p>
            <p>&gt; ESTABLISHING BRAIN-COMPUTER INTERFACE...</p>
            <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: "100%" }} 
                transition={{ duration: 2.5 }} 
                className="h-1 bg-indigo-500 shadow-[0_0_15px_#6366f1] mt-4" 
            />
        </motion.div>
    </div>
  );

  // --- BIOMETRIC LOGIN SIMULATION ---
  if (!verified) return (
    <div className="h-screen bg-[#020617] flex items-center justify-center relative overflow-hidden">
        <NeuralCanvas />
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="z-50 bg-slate-900/80 border-2 border-indigo-500/50 p-12 rounded-[3rem] backdrop-blur-3xl text-center shadow-[0_0_50px_rgba(99,102,241,0.2)]"
        >
            <div className="mb-8 relative inline-block">
                <Fingerprint size={80} className="text-indigo-500 animate-pulse" />
                <div className="absolute inset-0 border-2 border-indigo-400 rounded-full scale-150 opacity-20 animate-ping" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-widest mb-2 font-mono italic">Identity Required</h1>
            <p className="text-indigo-400 text-[10px] mb-8 uppercase font-bold tracking-[0.3em] font-mono">Spirit Node 01 | Node Verification</p>
            <button 
                onClick={() => setVerified(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 px-10 rounded-2xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 uppercase tracking-widest text-xs"
            >
                START NEURAL SCAN
            </button>
        </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-mono overflow-hidden flex relative">
      <NeuralCanvas />
      <div className="scan-bar" />
      
      {/* SIDEBAR HUD */}
      <aside className="w-72 border-r border-indigo-500/20 bg-slate-950/80 backdrop-blur-2xl p-6 hidden lg:flex flex-col z-20">
        <div className="flex items-center gap-3 mb-10 group">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-[0_0_25px_#6366f1]">
            <Cpu className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">Sentinel_AI</h1>
            <div className="h-1 w-full bg-indigo-900 rounded-full mt-1 overflow-hidden">
                <motion.div animate={{ x: [-100, 200] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1/2 h-full bg-indigo-400 shadow-[0_0_10px_#6366f1]" />
            </div>
          </div>
        </div>
        
        <div className="space-y-8 flex-1">
          <Section label="Operational Status">
            <StatusItem label="Neural Link" status="LOCKED" color="text-green-400" />
            <StatusItem label="Intelligence" status="98.4%" color="text-indigo-400" />
            <StatusItem label="Network" status="ENCRYPTED" color="text-slate-400" />
          </Section>

          <Section label="Explainable AI Core">
             <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-3 shadow-inner">
                <div className="flex items-center gap-2 text-[9px] text-indigo-400 font-bold uppercase tracking-widest">
                    <Terminal size={10}/> Heuristic Analysis
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                    Sentiment vectors mapped using Cosine Similarity against BERT pre-trained nodes.
                </p>
             </div>
          </Section>
        </div>

        <div className="mt-auto p-4 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black border-2 border-indigo-400">SP</div>
             <div>
                <p className="text-xs font-black text-white uppercase tracking-tighter">Spirit_User</p>
                <div className="flex items-center gap-1 text-[8px] text-green-500 font-bold uppercase animate-pulse">
                  <Radio size={8}/> Authenticated
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar p-6 lg:p-12 relative z-10">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="space-y-2">
            <h2 className="text-sm font-black text-indigo-500 tracking-[0.4em] uppercase flex items-center gap-2">
               <ShieldAlert size={16} className="animate-pulse"/> Command Override Enabled
            </h2>
            <p className={`text-4xl font-black text-white uppercase italic tracking-tighter transition-all duration-300 ${glitch ? 'text-red-500 skew-x-12 opacity-50' : 'drop-shadow-lg'}`}>
                Neural Intelligence HUD
            </p>
          </div>
          <div className="flex gap-4">
             <HeaderCard icon={<Globe size={16}/>} label="Satellite" value="Linked" />
             <HeaderCard icon={<Activity size={16}/>} label="Sync" value="1:1" />
          </div>
        </header>

        {loading ? (
            <div className="h-[50vh] flex items-center justify-center flex-col gap-6">
                <div className="w-16 h-16 border-t-4 border-indigo-500 rounded-full animate-spin shadow-[0_0_20px_#6366f1]" />
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400 animate-pulse">Decompiling Data Packets...</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-20">
            {insights.map((item, index) => (
                <motion.div 
                    whileHover={{ scale: 1.02, translateY: -5 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={index}
                    className="bg-slate-950/60 border border-slate-800 hover:border-indigo-500/50 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-md relative overflow-hidden group transition-all"
                >
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent h-20 w-full animate-scanline opacity-30" />

                    <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-full text-[10px] font-black uppercase flex items-center gap-2 tracking-widest">
                            {item.tag || "Insight"}
                            <div className="relative group/info">
                                <Info size={12} className="text-indigo-600 cursor-help" />
                                <div className="absolute left-0 top-6 w-48 bg-slate-800 p-3 rounded-xl text-[9px] opacity-0 group-hover/info:opacity-100 transition-opacity z-50 shadow-2xl border border-indigo-500/30 font-bold leading-relaxed">
                                    XAI Result: Probability {item.score}/10 based on research node match.
                                </div>
                            </div>
                        </div>
                        
                        <div className="w-32 h-32 bg-slate-900/50 rounded-full p-2 border border-slate-800 shadow-inner group-hover:scale-110 transition-transform duration-500">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart data={[
                                    { subject: 'Focus', A: item.focus || 80 },
                                    { subject: 'Memory', A: item.score * 10 },
                                    { subject: 'Logic', A: 75 },
                                    { subject: 'Growth', A: 90 },
                                ]}>
                                    <PolarGrid stroke="#312e81" />
                                    <PolarAngleAxis dataKey="subject" tick={{fontSize: 6, fill: '#6366f1'}} />
                                    <RadarArea dataKey="A" stroke="#818cf8" fill="#6366f1" fillOpacity={0.6} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-black text-white mb-4 leading-tight group-hover:text-indigo-300 transition-colors relative z-10">
                        {item.title}
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed mb-8 font-medium relative z-10 italic">
                        {item.summary}
                    </p>
                    
                    <div className="flex justify-between items-center relative z-10">
                        <div className="space-y-3 flex-1 max-w-[240px]">
                           <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                             <span>Cognitive Density</span>
                             <span className="text-indigo-400">{item.focus}%</span>
                           </div>
                           <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                             <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: `${item.focus}%` }} 
                                transition={{ duration: 1.5, ease: "easeOut" }} 
                                className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-cyan-400 shadow-[0_0_15px_#6366f1]" 
                             />
                           </div>
                        </div>
                        <button className="ml-6 p-4 bg-indigo-600/10 text-indigo-400 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all border border-indigo-500/20 shadow-lg">
                          <Activity size={22}/>
                        </button>
                    </div>
                </motion.div>
            ))}
            </div>
        )}

        <NeuralAssistant />

        <footer className="fixed bottom-0 left-0 lg:left-72 right-0 bg-slate-950/90 backdrop-blur-md border-t border-slate-800/50 p-2.5 text-[9px] text-slate-500 z-30 font-bold uppercase tracking-widest">
          <div className="flex gap-12 whitespace-nowrap animate-marquee italic">
            <span>&gt; SYS_ENCRYPTION: 256-bit AES LAYER ACTIVE</span>
            <span>&gt; LOG_HANDSHAKE: NEURAL LINK VERIFIED</span>
            <span>&gt; AI_SENTIMENT: TOKENIZATION CONFIDENCE 99.1%</span>
            <span>&gt; NODE_STATUS: SPIRIT_USER ONLINE</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

// Helpers
function Section({ label, children }) {
    return <div className="space-y-4"><h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] pl-1 border-l-2 border-indigo-600 italic">{label}</h3><div className="space-y-3">{children}</div></div>
}
function StatusItem({ label, status, color }) {
    return <div className="flex justify-between items-center text-[11px] font-bold bg-slate-900/40 p-4 rounded-2xl border border-slate-800/50 hover:bg-slate-900 transition-colors cursor-default"><span className="text-slate-500 uppercase tracking-tighter">{label}</span><span className={`${color} tracking-widest`}>{status}</span></div>
}
function HeaderCard({ icon, label, value }) {
    return <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-[1.5rem] min-w-[160px] backdrop-blur-sm hover:border-indigo-500/30 transition-all text-center"><div className="flex items-center justify-center gap-2 text-indigo-400 mb-2">{icon} <span className="text-[9px] font-black uppercase tracking-[0.2em]">{label}</span></div><p className="text-xl font-black text-white uppercase tracking-tighter italic">{value}</p></div>
}

export default App;