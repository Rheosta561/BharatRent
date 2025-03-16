import React from 'react'

function ContractCard(props) {
  return (
    <div className='h-44 p-2 rounded-lg bg-white flex gap-2 '>
        <div className='bg-zinc-900 w-36 h-36 rounded-lg'>
            <img src="https://img.freepik.com/free-vector/document-vector-colorful-design_341269-1262.jpg?uid=R156956613&ga=GA1.1.1904776371.1723148990&semt=ais_hybrid" className='h-full w-full' alt="" />
        </div>
        <div className='w-full border rounded-lg bg-gray-100 p-2'>
            <div className='bg-white text-2xl rounded-lg p-2 font-semibold text-emerald-950'>{props.title}</div>
            <div className=' text-sm text-zinc-950 bg-white mt-2 p-2 rounded-lg'>
                <a href={props.link} className='text-emerald-900 underline'>View Document </a>
                <div>Date Uploaded: <span>{props.date}</span></div>
            </div>
        </div>

    </div>
  )
}

export default ContractCard