import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import gsap from 'gsap'

const Errormsg = ({msg, onDismiss}) => {
  const errorRef = useRef(null);

  useEffect(() => {
    if (msg && errorRef.current) {
      gsap.fromTo(
        errorRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)" }
      );
    }
  }, [msg]);

  if (!msg) return null;

  return (
    <div ref={errorRef} className="bg-slate-800/80 backdrop-blur-md border border-red-900/50 rounded-2xl shadow-lg shadow-red-900/20 p-6 mb-8 relative flex flex-col sm:flex-row items-center gap-6 max-w-2xl overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
      
      <img 
        src="https://illustrations.popsy.co/red/crashed-error.svg" 
        alt="Error Illustration" 
        className="w-24 h-24 object-contain shrink-0 drop-shadow-md brightness-90"
      />
      
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg font-bold text-slate-200 mb-1">Oops! Something went wrong.</h3>
        <p className="text-slate-400 text-sm">{msg}</p>
      </div>

      <button 
        onClick={onDismiss} 
        className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-900/30 rounded-full transition-colors"
        aria-label="Dismiss Error"
      >
        <X size={20} strokeWidth={2.5} />
      </button>
    </div>
  )
}

export default Errormsg
