import { useState, useMemo, useEffect, useRef } from "react";
import useUsers from "./hooks/useUsers";
import Errormsg from "./components/Errormsg";
import Searchingbar from "./components/Searchingbar";
import Filterpopup from "./components/Filterpopup";
import Userstable from "./components/Userstable";
import Pagination from "./components/Pagination";
import Userform from "./components/Userform";
import { Toaster, toast } from "react-hot-toast";
import { UserPlus } from "lucide-react";
import gsap from "gsap";
import * as THREE from "three";

// --- Three.js Background Component ---
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    
    // Scene setup
    const scene = new THREE.Scene();
    // Deep dark background for eye comfort
    scene.background = new THREE.Color('#0f172a'); 
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create subtle particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const material = new THREE.PointsMaterial({
      size: 0.006,
      color: 0x38bdf8, // sky-400
      transparent: true,
      opacity: 0.6
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);
    
    camera.position.z = 2;

    // Animation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.0008;
      particlesMesh.rotation.x += 0.0004;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      mountRef.current?.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};


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
  
  const [pendingAction, setPendingAction] = useState(null);

  const headerRef = useRef(null);
  const toolsRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    // Page load animations
    gsap.fromTo(
      headerRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );
    gsap.fromTo(
      toolsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 }
    );
    gsap.fromTo(
      tableRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.4 }
    );
  }, []);

  // Toast Handling logic to accurately reflect success/error from useUsers
  useEffect(() => {
    if (!loading && pendingAction) {
      if (error) {
        toast.error(`Failed to ${pendingAction} user. Please try again.`);
      } else {
        let actionStr = pendingAction === 'add' ? 'added' : pendingAction === 'update' ? 'updated' : 'deleted';
        toast.success(`User ${actionStr} successfully!`);
      }
      setPendingAction(null);
    }
  }, [loading, error, pendingAction]);

  // Filter Logic
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

  // Wrapper mutators mapping to pending actions
  const handleAddUserWrapper = async (formData) => {
    setPendingAction('add');
    await handleAdduser(formData);
  };

  const handleUpdateUserWrapper = async (id, formData) => {
    setPendingAction('update');
    await handleUpdateuser(id, formData);
  };

  const handleDeleteUserWrapper = async (id) => {
    setPendingAction('delete');
    await handleDeleteuser(id);
  };

  const handleFormSubmit = async (formData) => {
    if (editUser) {
      await handleUpdateUserWrapper(editUser.id, formData);
    } else {
      await handleAddUserWrapper(formData);
    }
    handleFormClose();
  };

  // Pulse animation on Add button hover
  const onAddBtnEnter = (e) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2, ease: "power2.out", boxShadow: "0 10px 15px -3px rgba(56, 189, 248, 0.4)" });
  };
  const onAddBtnLeave = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.out", boxShadow: "none" });
  };


  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-200 overflow-hidden font-sans selection:bg-sky-500/30">
      <ThreeBackground />
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'shadow-2xl border border-slate-700/50 bg-slate-800 rounded-xl font-medium text-slate-200 text-sm backdrop-blur-md',
          success: { iconTheme: { primary: '#38bdf8', secondary: '#0f172a' } },
          error: { iconTheme: { primary: '#f87171', secondary: '#0f172a' } },
        }} 
      />
      
      {/* Main Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div ref={headerRef} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            User Management <span className="text-sky-400">Dashboard</span>
          </h1>
          <p className="text-base text-slate-400 mt-2 font-medium">
            Manage your team members and their roles. ({totalItems} total)
          </p>
        </div>

        <Errormsg msg={error} onDismiss={()=>setError(null)}/>

        {/* relative z-50 fixes the popup going behind the table wrapper */}
        <div ref={toolsRef} className="relative z-50 flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Searchingbar onSearch={handleSearch} />
          </div>

          <div className="flex gap-3">
            <Filterpopup Filters={filters} onApply={handleFilterApply} onClear={handleFilterClear} activeFilterCount={activeFilterCount} />

            <button 
              onMouseEnter={onAddBtnEnter}
              onMouseLeave={onAddBtnLeave}
              onClick={()=> setIsFormOpen(true)}   
              className="flex items-center gap-2 bg-sky-500 text-slate-900 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-sky-400 transition-colors shadow-sm"
            >
              <UserPlus size={18} />
              Add User
            </button> 
          </div> 
        </div>

        <div ref={tableRef} className="google-border-wrapper shadow-2xl shadow-sky-900/20">
          {/* We set bg-slate-900 on the content wrapper to keep the dark mode inside the border */}
          <div className="google-border-content !bg-slate-900 p-[1px]">
             <Userstable users={paginatedUsers} loading={loading} onEdit={handleEdit} onDelete={handleDeleteUserWrapper} />
             <div className="px-6 pb-4 bg-slate-900 rounded-b-[calc(1rem-3px)]">
                <Pagination totalitems={totalItems} currentpage={currentPage} limit={limit} onPageChange={setCurrentPage} onLimitChange={(newlimit)=>{
                  setLimit(newlimit);
                  setCurrentPage(1)
                }}/>
             </div>
          </div>
        </div>

        {isFormOpen && (
          <Userform editUser={editUser} onSubmit={handleFormSubmit} onClose={handleFormClose}/>
        )}   

      </div>
    </div>
  )
}

export default App
