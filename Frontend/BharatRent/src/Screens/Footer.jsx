import React from 'react'
import team from '../team.png'

function Footer() {
  return (
    <div className=' bottom-0 bg-zinc-100 p-2 w-full'>
        <div className='text-center text-gray-800'>© 2025 BharatRent. All rights reserved.</div>
        <div className='text-center text-zinc-700 text-sm'>Developed and Tested Under</div>
        <div className='h-20 w-28 mx-auto -mt-4 '>
            <img src={team} className='h-full w-full' alt="" />

        </div>
    </div>
  )
}

export default Footer