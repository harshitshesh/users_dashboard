import React, { useEffect, useRef } from 'react'
import { X, AlertTriangle } from 'lucide-react'
import gsap from 'gsap'

const DeletePopup = ({ user, onConfirm, onCancel }) => {
  const overlayRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" })
    gsap.fromTo(modalRef.current, 
      { opacity: 0, scale: 0.95, y: 10 }, 
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.5)" }
    )
  }, [])

  const handleClose = () => {
    // Exit animation
    gsap.to(modalRef.current, { opacity: 0, scale: 0.95, y: 10, duration: 0.15, ease: "power2.in" })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.15, ease: "power2.in", onComplete: onCancel })
  }

  const handleConfirm = () => {
    // Small shake/pulse before closing
    gsap.to(modalRef.current, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => {
        onConfirm(user.id);
    }});
  }

  return (
    <div ref={overlayRef} className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-slate-800 rounded-2xl shadow-2xl shadow-black/50 border border-slate-700/50 w-full max-w-sm overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex flex-col items-center text-center gap-4">
          <div className="bg-red-500/10 text-red-500 p-4 rounded-full border border-red-500/20">
            <AlertTriangle size={32} />
          </div>
          
          <div>
            <h2 className="text-lg font-bold text-slate-200 mb-2">Delete User?</h2>
            <p className="text-slate-400 text-sm">
              Are you sure you want to delete <span className="font-semibold text-slate-200">{user?.firstName} {user?.lastName}</span>? This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-800/80 flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 bg-slate-700 border border-slate-600 text-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-red-500 text-white rounded-xl px-4 py-2.5 text-sm font-bold hover:bg-red-600 transition-colors shadow-md shadow-red-500/20"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletePopup
