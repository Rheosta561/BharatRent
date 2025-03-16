import React from 'react'

function ProblemCard(props) {
  return (
    <div className='mx-4 text-center mt-4'>
        <div className='text-4xl '>{props.title}</div>
        <div className='h-60 w-60 mx-auto mt-2 '>
            <img src={props.img} className='h-full w-full object-cover' alt="" />

        </div>
        <div className='text-xs mt-4 text-center mb-4'>{props.desc}</div>
        <a href="" className='mt-4 mb-2 underline text-green-900'>Learn More</a>

     
       
    </div>
  )
}

export default ProblemCard