import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const Searchingbar = ({onSearch}) => {
  const [searchval, setsearchval] = useState("");

  useEffect(()=>{
    const timer = setTimeout(()=>{
      onSearch(searchval)
    }, 500);
    return () => clearTimeout(timer)
  }, [searchval])

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-sky-400 transition-colors">
        <Search size={18} />
      </div>
      <input 
        type="text" 
        value={searchval} 
        onChange={(e)=> setsearchval(e.target.value)}
        placeholder="Search users by name, email, or department..." 
        className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl text-sm placeholder-slate-500 text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
      />
    </div>
  )
}

export default Searchingbar
