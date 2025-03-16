import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  const handleClic = ()=>{

    navigate('/login')
  }
  return (
    <div className=' flex flex-col justify-center h-screen w '>
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-7xl font-bold'><span className='text-emerald-950'>Bharat</span>Rent</h1>
            <p className='text-md underline mt-2'>Your True Rental Companion </p>
            <button className='text-sm bg-zinc-900 text-white p-4 mt-4 rounded-full w-fit' onClick={handleClic}>Get Started</button>
        </div>
    </div>
  )
}

export default Home