import React from 'react'
import { useState, useEffect } from 'react'

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  department: ""

}

const isvalidemail = (email) => {
  const emailvalid = /^[^/s@]+@[^/s@]+.[^/s@]+$/.test(email)
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

  useEffect(() => {
    if (editUser) {
      setformdata({
        firstName: editUser.firstName || "",
        lastName: editUser.lastName || "",
        email: editUser.email || "",
        department: editUser.department || ""
      })
    }
    else {
      setformdata(INITIAL_FORM);
    }
  }, [editUser])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prv) => ({ ...prv, [name]: value }))
    if (errors[name]) {
      seterrors((prv) => ({ ...prv, [name]: "" }))
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validdate(formdata);

    if (Object.keys(validationErrors).length > 0) {
      seterrors(validationErrors)
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
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-30 flex items-center justify-center">
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {editUser ? "Edit User" : "Add New User"}
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">First Name</label>
            <input
              name="firstName"
              value={formdata.firstName}
              onChange={handleChange}
              placeholder="e.g. Rahul"
              className={`border rounded px-3 py-2 text-sm w-full
                ${errors.firstName ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}

          </div>


          <div>
            <label className="text-xs text-gray-500 mb-1 block">Last Name</label>
            <input
              name="lastName"
              value={formdata.lastName}
              onChange={handleChange}
              placeholder="e.g. Sharma"
              className={`border rounded px-3 py-2 text-sm w-full
                ${errors.lastName ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>


          <div>
            <label className="text-xs text-gray-500 mb-1 block">Email</label>
            <input
              name="email"
              value={formdata.email}
              onChange={handleChange}
              placeholder="e.g. rahul@gmail.com"
              className={`border rounded px-3 py-2 text-sm w-full
                ${errors.email ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Department</label>
            <input
              name="department"
              value={formdata.department}
              onChange={handleChange}
              placeholder="e.g. Engineering"
              className={`border rounded px-3 py-2 text-sm w-full
                ${errors.department ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.department && (
              <p className="text-red-500 text-xs mt-1">{errors.department}</p>
            )}
          </div>

        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-500 text-white rounded px-3 py-2 text-sm hover:bg-blue-600"
          >
            {editUser ? "Update" : "Add User"}
          </button>
        </div>

      </div>

    </div>
  )
}

export default Userform
