import React from 'react'

function Header() {
  return (
    <div className=' h-12 flex'>
        <div className='w-[13%] flex items-center justify-center border-r-[.1px] border-gray-400 bg-[#0073cf] h-full text-white text-sm font-medium text-center'> AllstateAI</div>
        <div className='flex items-center justify-center w-[87%] h-full bg-[#0073cf]'>
  <input className='w-4/5 h-3/5 rounded-2xl'></input>
</div>

    </div>
  )
}

export default Header