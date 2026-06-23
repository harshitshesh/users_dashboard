import React, { useState } from 'react'


const Userstable = ({users,loading,onEdit,onDelete}) => {

  const [sortconfig,setsortconfig] =  useState({
    key:null,
    direction:"asc"
  })

  const [deletecofirmid,setdeletecofirmid] = useState(null)

  const handleSort = (key)=>{
    setsortconfig((prv)=>({
      key,
      direction : prv.key === key && prv.direction === "asc" ?  "desc":"asc"
    }))
  }


  const sortedusers = [...users].sort((a,b)=>{
    if(!sortconfig.key) return 0;
    const aval = a[sortconfig.key]?.toLowerCase() ?? "";
    const bval = b[sortconfig.key]?.toLowerCase?.() ?? "";
    if(aval < bval) return sortconfig.direction === "asc" ? -1:1;
    if(aval > bval) return sortconfig.direction === "asc" ? 1: -1;
    return 0;
  })

 const SortArrow = ({ colKey }) => {
    if (sortconfig.key !== colKey)
      return <span className="text-gray-300 ml-1">↕</span>;
    return (
      <span className="text-blue-500 ml-1">
        {sortconfig.direction === "asc" ? "↑" : "↓"}
      </span>
    );
  };


    if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-4xl mb-2">👤</p>
        <p className="text-lg font-medium">No users found</p>
        <p className="text-sm">Try adjusting your search or filters</p>
      </div>
    );
  }


  return (
   <>

  <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
 <th className="px-4 py-3 text-left">ID</th>

   {[
                { label: "First Name", key: "firstName" },
                { label: "Last Name", key: "lastName" },
                { label: "Email", key: "email" },
                { label: "Department", key: "department" },
              ].map(({ label, key }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100 select-none"
                >
                  {label}
                  <SortArrow colKey={key} />
                </th>
              ))}

               <th className="px-4 py-3 text-left">Actions</th>



            </tr>
            </thead>


        <tbody className="divide-y divide-gray-100">
            {sortedusers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-400">{user.id}</td>
                <td className="px-4 py-3">{user.firstName}</td>
                <td className="px-4 py-3">{user.lastName}</td>
                <td className="px-4 py-3 text-gray-500">{user.email}</td>
                <td className="px-4 py-3">
                  <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">
                    {user.department}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">

                      <button
                      onClick={() => onEdit(user)}
                      className="text-xs px-3 py-1 rounded border border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      Edit
                    </button>  

                    {deletecofirmid === user.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            onDelete(user.id);
                            setdeletecofirmid(null);
                          }}
                          className="text-xs px-3 py-1 rounded border border-red-400 text-red-600 hover:bg-red-50"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setdeletecofirmid(null)}
                          className="text-xs px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setdeletecofirmid(user.id)}
                        className="text-xs px-3 py-1 rounded border border-red-300 text-red-500 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>       
   
   
   </>
  )
}

export default Userstable
