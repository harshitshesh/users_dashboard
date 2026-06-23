import React, { useState, useEffect, useRef } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import gsap from 'gsap';

const INITIAL_FIL = {
  firstName: "",
  lastName: "",
  email: "",
  department: ""
}

const Filterpopup = ({ onApply, onClear, activeFilterCount, Filters }) => {
  const [isopen, setisopen] = useState(false)
  const [localfilter, setlocalfilter] = useState(INITIAL_FIL);
  const popupRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlocalfilter((prv) => ({
      ...prv,
      [name]: value
    }))
  }

  const handleApply = () => {
    onApply(localfilter)
    closePopup()
  }

  const handleClear = () => {
    setlocalfilter(INITIAL_FIL)
    onClear()
    closePopup()
  }

  useEffect(() => {
    setlocalfilter(Filters)
  }, [Filters])

  const openPopup = () => {
    setisopen(true);
    // Slight delay so DOM is mounted before animating
    setTimeout(() => {
      if (popupRef.current) {
        gsap.fromTo(
          popupRef.current,
          { opacity: 0, y: -10, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" }
        );
      }
    }, 0);
  };

  const closePopup = () => {
    if (popupRef.current) {
      gsap.to(popupRef.current, {
        opacity: 0, y: -10, scale: 0.98, duration: 0.15, ease: "power2.in",
        onComplete: () => setisopen(false)
      });
    } else {
      setisopen(false);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => isopen ? closePopup() : openPopup()}
        className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 text-sm font-medium transition-all shadow-sm
          ${isopen ? 'bg-slate-800 border-slate-600 text-slate-200' : 'bg-slate-800/50 backdrop-blur-sm border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:border-slate-600'}`}
      >
        <SlidersHorizontal size={16} className={activeFilterCount > 0 ? "text-sky-400" : "text-slate-400"} />
        Filters 
        {activeFilterCount > 0 && (
          <span className="bg-sky-500 text-slate-900 text-[10px] leading-none rounded-full px-1.5 py-0.5 ml-1 flex items-center justify-center min-w-[18px] min-h-[18px] font-bold">
            {activeFilterCount}
          </span>
        )}
      </button>

      {isopen && (
        <>
          <div className="fixed inset-0 z-20" onClick={closePopup} />

          <div 
            ref={popupRef}
            className="absolute right-0 mt-2 w-80 bg-slate-800/95 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/50 z-30 p-5 transform origin-top-right"
          >
            <h3 className="font-bold text-slate-200 mb-4 text-sm flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-slate-400" />
              Filter Users
            </h3>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 mb-1.5 block uppercase tracking-wider">First Name</label>
                <input name="firstName" value={localfilter.firstName} onChange={handleChange} placeholder="e.g. Rahul" className="w-full bg-slate-900/50 text-slate-200 border border-slate-700 focus:bg-slate-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all placeholder-slate-500" />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 mb-1.5 block uppercase tracking-wider">Last Name</label>
                <input name="lastName" value={localfilter.lastName} onChange={handleChange} placeholder="e.g. Sharma" className="w-full bg-slate-900/50 text-slate-200 border border-slate-700 focus:bg-slate-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all placeholder-slate-500" />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 mb-1.5 block uppercase tracking-wider">Email</label>
                <input name="email" value={localfilter.email} onChange={handleChange} placeholder="e.g. email@example.com" className="w-full bg-slate-900/50 text-slate-200 border border-slate-700 focus:bg-slate-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all placeholder-slate-500" />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 mb-1.5 block uppercase tracking-wider">Department</label>
                <input name="department" value={localfilter.department} onChange={handleChange} placeholder="e.g. Engineering" className="w-full bg-slate-900/50 text-slate-200 border border-slate-700 focus:bg-slate-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all placeholder-slate-500" />
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-slate-700/50">
              <button onClick={handleClear} className="flex-1 bg-slate-700/50 border border-slate-600 text-slate-300 rounded-xl px-4 py-2 text-sm font-medium hover:bg-slate-700 transition-colors">Clear All</button>
              <button onClick={handleApply} className="flex-1 bg-sky-500 text-slate-900 rounded-xl px-4 py-2 text-sm font-bold hover:bg-sky-400 transition-colors shadow-md">Apply Filters</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Filterpopup
