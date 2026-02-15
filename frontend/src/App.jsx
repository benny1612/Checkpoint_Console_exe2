import React from 'react'
import axios from "axios"
import { useState,useEffect } from 'react'
export default function App() {
  const [array,setArray]=useState([])
  const fatchData= async ()=>{
    const response = await axios.get("http://localhost:3000")
    setArray(response)
  }
  useEffect(()=>{
    fatchData()
  },[])
  return (
    <div>App</div>
  )
}
