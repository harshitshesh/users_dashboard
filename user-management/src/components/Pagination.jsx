import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({totalitems, currentpage, limit, onPageChange, onLimitChange}) => {
  const totalpages = Math.ceil(totalitems / limit)

  const handleLimitChange = (newlimit)=>{
    const newtotalpages = Math.ceil(totalitems / newlimit)
    if(currentpage > newtotalpages){
      onPageChange(newtotalpages)
    }
    onLimitChange(newlimit)
  }

  const getPageNumbers = ()=>{
    const pages = [];
    if(totalpages <= 5){
      for(let i = 1; i <= totalpages; i++) pages.push(i)
      return pages
    }

    pages.push(1)

    if(currentpage > 3){
      pages.push("...")
    }

    const start = Math.max(2, currentpage - 1);
    const end = Math.min(totalpages - 1, currentpage + 1)

    for(let i = start; i <= end; i++) pages.push(i)

    if(currentpage < totalpages - 2){
      pages.push("...")
    }

    pages.push(totalpages);
    return pages
  }

  if(totalitems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 mt-2 border-t border-slate-800/60">
      
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-400">Rows per page:</span>
        <div className="relative">
          <select 
            value={limit} 
            onChange={(e)=> handleLimitChange(Number(e.target.value))}
            className="appearance-none bg-slate-800 border border-slate-700 text-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 cursor-pointer"
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-sm font-medium text-slate-500 hidden md:block">
          Showing <span className="text-slate-300 font-semibold">{((currentpage - 1) * limit) + 1}</span> to <span className="text-slate-300 font-semibold">{Math.min(currentpage * limit, totalitems)}</span> of <span className="text-slate-300 font-semibold">{totalitems}</span> users
        </span>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={()=> onPageChange(currentpage - 1)}
            disabled={currentpage === 1}
            className="p-1.5 rounded-full border border-slate-700 text-slate-400 disabled:opacity-40 disabled:bg-slate-800 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
            aria-label="Previous Page"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="hidden sm:flex items-center gap-1">
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className="px-2 text-slate-500 font-medium">
                  ...
                </span>
              ) : (
                <button 
                  key={page} 
                  onClick={()=> onPageChange(page)}
                  className={`min-w-[32px] h-[32px] flex items-center justify-center rounded-full text-sm font-semibold transition-colors
                    ${currentpage === page 
                      ? "bg-sky-500 text-slate-900 shadow-md" 
                      : "text-slate-400 hover:bg-slate-700 hover:text-slate-200"}`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          <button 
            onClick={()=> onPageChange(currentpage + 1)} 
            disabled={currentpage === totalpages} 
            className="p-1.5 rounded-full border border-slate-700 text-slate-400 disabled:opacity-40 disabled:bg-slate-800 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
            aria-label="Next Page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default Pagination
