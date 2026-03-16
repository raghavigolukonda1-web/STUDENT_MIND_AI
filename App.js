import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Brain, Flame, Share2, MessageCircle } from 'lucide-react';

const App = () => {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/insights')
      .then(res => setInsights(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b p-4 flex justify-between items-center z-50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          StudentMind
        </h1>
        <div className="flex gap-4">
          <Brain className="text-blue-500" />
          <Flame className="text-orange-500" />
        </div>
      </nav>

      {/* Content Feed */}
      <main className="max-w-lg mx-auto p-4 space-y-6">
        {insights.map((item, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={index}
            className="bg-white rounded-2xl shadow-sm border p-5 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-400 to-indigo-600 rounded-full" />
              <div>
                <h3 className="font-bold text-sm">AI Mindset Lab</h3>
                <p className="text-xs text-gray-500">Mindset Score: {item.mindsetScore}/10</p>
              </div>
            </div>
            <h2 className="text-lg font-semibold leading-tight">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.summary}</p>
            
            <div className="flex justify-between items-center pt-2 border-t">
              <div className="flex gap-4">
                <MessageCircle size={20} className="hover:text-blue-600 cursor-pointer" />
                <Share2 size={20} className="hover:text-blue-600 cursor-pointer" />
              </div>
              <button className="text-blue-600 text-sm font-bold">Deep Analysis</button>
            </div>
          </motion.div>
        ))}
      </main>
    </div>
  );
}

export default App;