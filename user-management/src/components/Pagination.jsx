import React from 'react'


const Pagination = ({totalitems,currentpage,limit,onPageChange,onLimitChange}) => {
  const totalpages = Math.ceil(totalitems/limit)

  const handleLimitChange = (newlimit)=>{
    const newtotalpages = Math.ceil(totalitems/newlimit)

    if(currentpage > newtotalpages){
      onPageChange(newtotalpages)
    }

    onLimitChange(newlimit)
  }

const getPageNumbers = ()=>{
  const pages = [];

  if(totalpages <= 5){
    for(let i = 1;i<=totalpages;i++) pages.push(i)

      return pages
  }

  pages.push(1)

  if(currentpage > 3){
    pages.push("...")
  }


  const start = Math.max(2,currentpage - 1);
  const end = Math.min(totalpages - 1,currentpage +1)

  for(let i = start;i<=end;i++) pages.push(i)

    if(currentpage < totalpages - 2){
      pages.push("...")
    }

    pages.push(totalpages);

    return pages
}

if(totalitems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">

      <div className = "flex items-center gap-2">
        <span className = "text-sm text-gray-600">Rows per page:</span>

        <select value={limit} onChange={(e)=> handleLimitChange(e.target.value)}
        className = "border border-gray-300 rounded px-2 py-1 text-sm">
          {[10,25,50,100].map((size)=>(
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <span className="text-sm text-gray-600">
        Page {currentpage} of {totalpages} - {totalitems} total users
      </span>

      <div className="flex items-center gap-1">
        <button onClick={()=> onPageChange(currentpage -1)}
        disabled= {currentpage === 1 }
        className="px-3 py-1 rounded border text-sm disabled:opacity-50 disabled:cursor-not-allowded hover:bg-gray-100">prev</button>


        <div className="hidden sm:flex items-center gap-1">
          {getPageNumbers().map((page,index)=>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          ):(
            <button key={page} onClick={()=> onPageChange(page)}
            className={`px-3 py-1 rounded border text-sm ${currentpage === page ? "bg-blue-500 text-white border-blue-500" : "hover:bg-gray-100"}`}>
              {page}
            </button>
          )
          )}
        </div>

<button onClick={()=> onPageChange(currentpage +1)} disabled={currentpage === totalpages} 
className = "px-3 py-1 rounded border text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100">next</button>

      </div>
      
    </div>
  )

}

export default Pagination
