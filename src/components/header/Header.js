import React,{useState,useEffect} from 'react'

function Header()
{
    const [mobview, setMobview] = useState(false)

    useEffect(() => {
        if (window.innerWidth < 768) {
            setMobview(true)
        } else {
            setMobview(false)
        }


        const setDisplay = () => {
            if (window.innerWidth < 768) {
                setMobview(true)
            } else {
                setMobview(false)
            }
        }

        window.addEventListener('resize', setDisplay);
        return () => window.removeEventListener('resize', setDisplay);


    }, []);

    return (
      <>
      {mobview?   <div className=' h-12 flex'>
          
            <div className='flex items-center justify-center w-full h-full bg-[#0073cf]'>
                {/* <input className='w-4/5 h-3/5 rounded-2xl'></input> */}
            </div>

        </div>:
        <div className=' h-12 flex'>
        <div className='w-[17.45%] flex items-center justify-center border-r-[.1px] border-gray-400 bg-[#0073cf] h-full text-white text-[14px] lg:text-[16px] xl:text-[19px] 2xl:text-[22px] font-medium font-sofia text-center'></div>
        <div className='flex items-center justify-center w-[87%] h-full bg-[#0073cf]'>
            <div className='text-white text-[14px] lg:text-[16px] xl:text-[19px] 2xl:text-[22px] font-medium font-sofia text-center'>Sure Guide</div>
            {/* <input className='w-4/5 h-3/5 rounded-2xl'></input> */}
        </div>

    </div>
      }
      </>
    )
}

export default Header