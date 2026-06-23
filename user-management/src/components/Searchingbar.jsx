import React from 'react'
import { useState, useEffect } from 'react';

const Searchingbar = ({onSearch}) => {

  const [searchval,setsearchval]=  useState("")

  useEffect(()=>{
    const timer = setTimeout(()=>{
      onSearch(searchval)
    },500);
    return  ()=> clearTimeout(timer)
  },[searchval])

  return (
   <input type="text" value={searchval} onChange={(e)=> setsearchval(e.target.value)}
   placeholder = "Search here..." className="border border-gray-300 rounded px-3 py-2 w-full"/>
  )
}

export default Searchingbar
