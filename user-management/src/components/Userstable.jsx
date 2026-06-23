import React, { useState, useEffect, useRef } from 'react'
import { ArrowUp, ArrowDown, ArrowUpDown, Users, Pencil, Trash2, Loader2 } from 'lucide-react'
import gsap from 'gsap'

const Userstable = ({users, loading, onEdit, onDelete}) => {
  const [sortconfig, setsortconfig] = useState({
    key: null,
    direction: "asc"
  })

  const [deletecofirmid, setdeletecofirmid] = useState(null)
  
  const tbodyRef = useRef(null)

  useEffect(() => {
    if (!loading && users.length > 0 && tbodyRef.current) {
      const rows = tbodyRef.current.children;
      gsap.fromTo(
        rows,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, [users, loading, sortconfig]);

  const handleSort = (key) => {
    setsortconfig((prv) => ({
      key,
      direction: prv.key === key && prv.direction === "asc" ? "desc" : "asc"
    }))
  }

  const sortedusers = [...users].sort((a, b) => {
    if (!sortconfig.key) return 0;
    const aval = a[sortconfig.key]?.toLowerCase() ?? "";
    const bval = b[sortconfig.key]?.toLowerCase?.() ?? "";
    if (aval < bval) return sortconfig.direction === "asc" ? -1 : 1;
    if (aval > bval) return sortconfig.direction === "asc" ? 1 : -1;
    return 0;
  })

  const SortArrow = ({ colKey }) => {
    if (sortconfig.key !== colKey)
      return <ArrowUpDown size={14} className="text-slate-600 ml-1.5 opacity-50 group-hover:opacity-100 transition-opacity" />;
    return sortconfig.direction === "asc" ? 
      <ArrowUp size={14} className="text-sky-400 ml-1.5" /> : 
      <ArrowDown size={14} className="text-sky-400 ml-1.5" />;
  };

  const triggerShake = (e) => {
    gsap.fromTo(e.currentTarget.closest('tr'), 
      { x: -5 }, 
      { x: 5, duration: 0.05, yoyo: true, repeat: 5, clearProps: "x" }
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-32 bg-slate-900 rounded-t-xl w-full">
        <Loader2 size={40} className="text-sky-400 animate-spin mb-4" />
        <p className="text-slate-400 font-medium">Loading users...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-32 bg-slate-900 rounded-t-xl text-center px-4 w-full">
        <div className="bg-slate-800 p-4 rounded-full mb-4">
          <Users size={48} className="text-slate-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-200 mb-2">No users found</h3>
        <p className="text-slate-400 text-sm max-w-sm">We couldn't find any users matching your criteria. Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-slate-900 rounded-t-[calc(1rem-3px)] w-full">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-slate-800/80 text-slate-400 uppercase text-xs tracking-wider border-b border-slate-700">
          <tr>
            <th className="px-6 py-4 font-semibold">ID</th>
            {[
              { label: "First Name", key: "firstName" },
              { label: "Last Name", key: "lastName" },
              { label: "Email", key: "email" },
              { label: "Department", key: "department" },
            ].map(({ label, key }) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="px-6 py-4 font-semibold cursor-pointer hover:bg-slate-800 transition-colors group select-none"
              >
                <div className="flex items-center">
                  {label}
                  <SortArrow colKey={key} />
                </div>
              </th>
            ))}
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>

        <tbody ref={tbodyRef} className="divide-y divide-slate-800/60">
          {sortedusers.map((user) => (
            <tr key={user.id} className="hover:bg-slate-800/50 transition-colors group">
              <td className="px-6 py-4 text-slate-500 font-mono text-xs">{user.id.toString().substring(0, 8)}</td>
              <td className="px-6 py-4 font-medium text-slate-200">{user.firstName}</td>
              <td className="px-6 py-4 font-medium text-slate-200">{user.lastName}</td>
              <td className="px-6 py-4 text-slate-400">{user.email}</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-sky-900/40 text-sky-400 border border-sky-800/50">
                  {user.department}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 rounded-lg text-slate-500 hover:text-sky-400 hover:bg-sky-900/30 transition-colors border border-transparent hover:border-sky-800/50"
                    title="Edit User"
                  >
                    <Pencil size={16} />
                  </button>  

                  {deletecofirmid === user.id ? (
                    <div className="flex items-center gap-1 bg-red-900/20 p-1 rounded-lg border border-red-900/50">
                      <button
                        onClick={() => {
                          onDelete(user.id);
                          setdeletecofirmid(null);
                        }}
                        className="text-xs px-2.5 py-1.5 rounded-md bg-red-500/90 text-white font-medium hover:bg-red-500 transition-colors flex items-center gap-1"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setdeletecofirmid(null)}
                        className="text-xs px-2.5 py-1.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-medium hover:bg-slate-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        setdeletecofirmid(user.id);
                        triggerShake(e);
                      }}
                      className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-900/20 transition-colors border border-transparent hover:border-red-900/50"
                      title="Delete User"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>       
  )
}

export default Userstable
