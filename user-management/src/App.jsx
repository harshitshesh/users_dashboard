
import { useState, useMemo } from "react";
import useUsers from "./hooks/useUsers";
import Errormsg from "./components/Errormsg";
import Searchingbar from "./components/Searchingbar";
import Filterpopup from "./components/Filterpopup";
import Userstable from "./components/Userstable";
import Pagination from "./components/Pagination";
import Userform from "./components/Userform";


const INITIAL_FILTERS = {
  firstName: "",
  lastName: "",
  email: "",
  department: "",
};


const App = () => {

  const { users, loading,
    error, setError,
    handleAdduser,
    handleUpdateuser,
    handleDeleteuser } = useUsers()

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);


  const filteredusers = useMemo(()=>{
    return users.filter((user)=>{
      const query = searchQuery.toLowerCase()
      const matchsearch = !query || user.firstName.toLowerCase().includes(query) || user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.department.toLowerCase().includes(query)

const matchfilter = user.firstName.toLowerCase().includes(filters.firstName.toLocaleLowerCase()) && 
 user.lastName.toLowerCase().includes(filters.lastName.toLowerCase()) &&
        user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        user.department.toLowerCase().includes(filters.department.toLowerCase());

      return matchsearch && matchfilter;
    });
  }, [users, searchQuery, filters])

   const totalItems = filteredusers.length;
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * limit;
    return filteredusers.slice(start, start + limit);
  }, [filteredusers, currentPage, limit]);



 
  const activeFilterCount = Object.values(filters).filter(Boolean).length;


  const handleSearch = (query)=>{
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleFilterApply = (newFilters)=>{
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleFilterClear = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditUser(null);
  };

  const handleFormSubmit = async (formData) => {
    if (editUser) {
      await handleUpdateuser(editUser.id, formData);
    } else {
      await handleAdduser(formData);
    }
    handleFormClose();
  };


  return (
     <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">

 <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            User Management Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {totalItems} users found
          </p>
        </div>

        <Errormsg msg={error} onDismiss={()=>setError(null)}/>

             <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex-1">
                <Searchingbar onSearch={handleSearch} />
              </div>

             <div className="flex gap-2">
              <Filterpopup Filters={filters} onApply={handleFilterApply} onClear={handleFilterClear} activeFilterCount={activeFilterCount} />

              <button onClick={()=> setIsFormOpen(true)}   className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
            >+ Add User</button> 
              </div> 
             </div>


             <Userstable users={paginatedUsers} loading={loading} onEdit={handleEdit} onDelete={handleDeleteuser} />

             <Pagination totalitems={totalItems} currentpage={currentPage} limit={limit} onPageChange={setCurrentPage} onLimitChange={(newlimit)=>{
              setLimit(newlimit);
              setCurrentPage(1)
             }}/>

          {isFormOpen && (
            <Userform editUser={editUser} onSubmit={handleFormSubmit} onClose={handleFormClose}/>
          )}   

</div>
    </div>
  )
}

export default App
