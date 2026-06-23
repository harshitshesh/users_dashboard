import React, { useState, useEffect, useRef } from 'react'
import { X, UserPlus, Check } from 'lucide-react'
import gsap from 'gsap'

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  department: ""
}

const isvalidemail = (email) => {
  const emailvalid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  return emailvalid
}

const validdate = (formdata) => {
  const errors = {}

  if (!formdata.firstName.trim()) {
    errors.firstName = "First Name is required"
  }

  if (!formdata.lastName.trim()) {
    errors.lastName = "Last Name is required"
  }

  if (!formdata.email.trim()) {
    errors.email = "Email is required"
  } else if (!isvalidemail(formdata.email)) {
    errors.email = "Email is invalid"
  }
  if (!formdata.department.trim()) {
    errors.department = "Department is required"
  }
  return errors
}

const Userform = ({ onSubmit, onClose, editUser }) => {
  const [formdata, setformdata] = useState(INITIAL_FORM)
  const [errors, seterrors] = useState({})
  const overlayRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    if (editUser) {
      setformdata({
        firstName: editUser.firstName || "",
        lastName: editUser.lastName || "",
        email: editUser.email || "",
        department: editUser.department || ""
      })
    } else {
      setformdata(INITIAL_FORM);
    }
  }, [editUser])

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
    gsap.fromTo(modalRef.current, 
      { opacity: 0, scale: 0.95, y: 20 }, 
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.2)", delay: 0.05 }
    )
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prv) => ({ ...prv, [name]: value }))
    if (errors[name]) {
      seterrors((prv) => ({ ...prv, [name]: "" }))
    }
  }

  const handleClose = () => {
    // Exit animation
    gsap.to(modalRef.current, { opacity: 0, scale: 0.95, y: 10, duration: 0.2, ease: "power2.in" })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: "power2.in", delay: 0.1, onComplete: onClose })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validdate(formdata);

    if (Object.keys(validationErrors).length > 0) {
      seterrors(validationErrors)
      // Shake animation on error
      gsap.fromTo(modalRef.current, 
        { x: -5 }, 
        { x: 5, duration: 0.05, yoyo: true, repeat: 5, clearProps: "x" }
      );
      return;
    }

    onSubmit({
      firstName: formdata.firstName,
      lastName: formdata.lastName,
      email: formdata.email,
      department: formdata.department
    })

    setformdata(INITIAL_FORM)
    seterrors({});
    // Modal will be unmounted by App.jsx immediately on submit, but we let App handle it.
  }

  return (
    <div ref={overlayRef} className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-slate-800 rounded-2xl shadow-2xl shadow-black/50 border border-slate-700/50 w-full max-w-md overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="bg-sky-500/10 text-sky-400 p-2 rounded-xl border border-sky-500/20">
              {editUser ? <Pencil size={20} /> : <UserPlus size={20} />}
            </div>
            <h2 className="text-xl font-bold text-slate-200">
              {editUser ? "Edit Team Member" : "Add New Member"}
            </h2>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1.5 block uppercase tracking-wider">First Name</label>
              <input
                name="firstName"
                value={formdata.firstName}
                onChange={handleChange}
                placeholder="e.g. Rahul"
                className={`w-full bg-slate-900/50 border text-slate-200 focus:bg-slate-900 rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 placeholder-slate-500
                  ${errors.firstName ? "border-red-400/50 focus:ring-red-500/20 focus:border-red-400" : "border-slate-700 focus:ring-sky-500/30 focus:border-sky-500"}`}
              />
              {errors.firstName && <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.firstName}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1.5 block uppercase tracking-wider">Last Name</label>
              <input
                name="lastName"
                value={formdata.lastName}
                onChange={handleChange}
                placeholder="e.g. Sharma"
                className={`w-full bg-slate-900/50 border text-slate-200 focus:bg-slate-900 rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 placeholder-slate-500
                  ${errors.lastName ? "border-red-400/50 focus:ring-red-500/20 focus:border-red-400" : "border-slate-700 focus:ring-sky-500/30 focus:border-sky-500"}`}
              />
              {errors.lastName && <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1.5 block uppercase tracking-wider">Email Address</label>
            <input
              name="email"
              value={formdata.email}
              onChange={handleChange}
              placeholder="e.g. rahul@example.com"
              className={`w-full bg-slate-900/50 border text-slate-200 focus:bg-slate-900 rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 placeholder-slate-500
                ${errors.email ? "border-red-400/50 focus:ring-red-500/20 focus:border-red-400" : "border-slate-700 focus:ring-sky-500/30 focus:border-sky-500"}`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.email}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1.5 block uppercase tracking-wider">Department</label>
            <input
              name="department"
              value={formdata.department}
              onChange={handleChange}
              placeholder="e.g. Engineering"
              className={`w-full bg-slate-900/50 border text-slate-200 focus:bg-slate-900 rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 placeholder-slate-500
                ${errors.department ? "border-red-400/50 focus:ring-red-500/20 focus:border-red-400" : "border-slate-700 focus:ring-sky-500/30 focus:border-sky-500"}`}
            />
            {errors.department && <p className="text-red-400 text-xs mt-1.5 font-medium">{errors.department}</p>}
          </div>
        </div>

        <div className="px-6 py-5 border-t border-slate-700/50 bg-slate-800/80 flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 bg-slate-700 border border-slate-600 text-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-sky-500 text-slate-900 rounded-xl px-4 py-2.5 text-sm font-bold hover:bg-sky-400 transition-colors shadow-md flex items-center justify-center gap-2"
          >
            {editUser ? <><Check size={16} /> Save Changes</> : <><UserPlus size={16} /> Add User</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Userform
