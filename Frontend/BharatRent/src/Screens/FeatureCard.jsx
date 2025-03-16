import React from 'react'

function FeatureCard(props) {
  return (
    <div className='min-h-60 h-fit p-4 rounded-lg bg-white relative overflow-hidden'>

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
          
          <button className='w-fit p-2 mb-8  bg-emerald-900 rounded-lg '>Get Started</button>
        </div>
    </div>
  )
}

export default FeatureCard
