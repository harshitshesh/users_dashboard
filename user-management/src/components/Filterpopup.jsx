import React from 'react'
import { useState, useEffect } from 'react';

const INITIAL_FIL = {
  firstName: "",
  lastName: "",
  email: "",
  department: ""
}


const Filterpopup = ({ onApply, onClear, activeFilterCount, Filters }) => {

  const [isopen, setisopen] = useState(false)

  const [localfilter, setlocalfilter] = useState(INITIAL_FIL);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setlocafilter((prv) => ({
      ...prv,
      [name]: value
    }))
  }

  const handleApply = () => {
    onApply(localfilter)
    setisopen(false)
  }

  const handleClear = () => {
    setlocalfilter(INITIAL_FIL)
    onClear()
    setisopen(false)
  }

  useeffect(() => {
    setlocalfilter(Filters)
  }, [Filters])

  return (
    <div className="relative">
      <button onClick={() => setisopen((prv) => !prv)}
        className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 text-sm hover:bg-gray-100">Filters {activeFilterCount > 0 && (
          <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">{activeFilterCount}</span>)}</button>

      {isopen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setisopen(false)} />

          <div className="absolute right-0 mt-2w-72 bg-white border border-gray-200 rounded-lg z-20 p-4">

            <h3 className="font-semibold text-gray-700 mb-3">Filter Users</h3>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">First Name</label>

                <input name="firstName" value={localfilter.firstName} onChange={handleChange} placeholder="First Name" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />


              </div>

              <div>

                <label className="text-xs text-gray-500 mb-1 block">Last Name</label>

                <input name="lastName" value={localfilter.lastName} onChange={handleChange} placeholder="Last Name" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>


              <div>

                <label className="text-xs text-gray-500 mb-1 block">Email</label>
                <input name="email" value={localfilter.email} onChange={handleChange} placeholder="Email" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">Department</label>
                <input
                  name="department"
                  value={localfilter.department}
                  onChange={handleChange}
                  placeholder="e.g. Engineering"
                  className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
                />
              </div>

            </div>



            <div className="flex gap-2 mt-4">

              <button onClick={handleClear} className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm hover:bg-gray-100">Clear All</button>

              <button onClick={handleApply} className="flex-1 bg-blue-500 text-white rounded px-3 py-2 text-sm hover:bg-blue-600">Apply</button>
            </div>


          </div>


        </>
      )}


    </div>
  )
}

export default Filterpopup
