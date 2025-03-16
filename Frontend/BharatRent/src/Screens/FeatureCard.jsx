import React from 'react'
import { useNavigate } from 'react-router-dom';

function FeatureCard(props) {
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate(props.link)

  }
  return (
    <div className='min-h-60 h-72 p-4 rounded-lg bg-white relative overflow-hidden'>

        <img 
          src={props.img}
          className='h-full w-full rounded-lg brightness-50 object-cover absolute top-0 left-0'
          alt=""
        />
        
        <div className='absolute flex flex-col justify-between h-full text-white'>
            <div>
            <div className='text-3xl font-semibold md:text-2xl '>{props.title}</div>
            <div className='text-sm w-3/4 mt-2 text-zinc-200 md:text-xs'>{props.desc}</div>

            </div>
          
          <button className='w-fit p-2 mb-8  bg-emerald-900 rounded-lg transition-all' onClick={handleClick}>Get Started</button>
        </div>
    </div>
  )
}

export default FeatureCard
