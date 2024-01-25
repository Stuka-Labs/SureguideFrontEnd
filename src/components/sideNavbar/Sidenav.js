import React, { useState } from 'react';
import upImage from '../../../public/up.png';
import pencil from '../../../public/pencil.png';
import Image from 'next/image';

const SideNav = ({ navs }) => {
  const [activeTab, setActiveTab] = useState({ navIndex: 0, tabIndex: 0 });
  const [collapsedTabs, setCollapsedTabs] = useState(Array(navs.length).fill(false));
  const [upImageRotations, setUpImageRotations] = useState(Array(navs.length).fill(0));

  const handleTabClick = (navIndex, tabIndex) => {
    setActiveTab({ navIndex, tabIndex });
  };

  const handleToggleCollapse = (navIndex) => {
    const updatedCollapsedTabs = [...collapsedTabs];
    updatedCollapsedTabs[navIndex] = !updatedCollapsedTabs[navIndex];
    setCollapsedTabs(updatedCollapsedTabs);

    // Update rotation angle based on the collapse state for the specific tab
    const rotationAngle = updatedCollapsedTabs[navIndex] ? 180 : 0;
    const updatedRotations = [...upImageRotations];
    updatedRotations[navIndex] = rotationAngle;
    setUpImageRotations(updatedRotations);
  };

  return (
    <div className="flex w-full h-[calc(100%-48px)] ">

      <div className="flex flex-col w-[20%] justify-between bg-gray-200 overflow-auto  ">
        <div className='w-full'>
          <div className='text-[12px] lg:text-[14px] xl:text-[17px] 2xl:text-[20px] text-gray-600 font-normal  m-1 pl-2'>Welcome to AllstateAI</div>
          <div className='bg-gray-300 h-[.5px] mb-2'></div>

          {navs.map((nav, navIndex) => (
            <div key={navIndex} className="">
              <div
                className="cursor-pointer mb-2 flex items-center justify-between px-5"
                onClick={() => handleToggleCollapse(navIndex)}
              >
                <p className="font-semibold  text-[10px] lg:text-[12px] xl:text-[15px] 2xl:text-[18px]  ">
                  {nav.heading}
                </p>
                <Image
                  src={upImage}
                  height={8}
                  width={8}
                  alt="Up"
                  className={`transform origin-center transition-transform duration-300 ${collapsedTabs[navIndex] ? 'rotate-180' : ''
                    }`}
                  style={{ transform: `rotate(${upImageRotations[navIndex]}deg)` }}
                />
              </div>
              <div className='bg-gray-300 h-[.5px] mb-2 '></div>
              {collapsedTabs[navIndex] ? null : (
                <div className=''>
                  {nav.components.map((Component, tabIndex) => (
                    <div
                      key={tabIndex}
                      className={`px-[2px] my-[2px] font-normal text-[10px] lg:text-[12px] xl:text-[15px] 2xl:text-[18px] cursor-pointer `}
                      onClick={() => handleTabClick(navIndex, tabIndex)}
                    >
                      <p
                        className={`p-1 rounded-2xl pl-4  ${navIndex === activeTab.navIndex && tabIndex === activeTab.tabIndex
                          ? 'bg-[#0073cf] text-white'
                          : 'bg-gray-200 text-gray-500'
                          }`}
                      >
                        {Object.keys(Component)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className='bg-gray-300 h-[.5px] mb-2'></div>

            </div>


          ))}
        </div>
        <div className=''>
          <div className='bg-gray-300 h-[1px] my-2'></div>
          <div className='flex justify-center gap-1 my-3 '>
            <Image height={15} width={15} src={pencil}/>
            <p className='text-[9px] lg:text-[11px] xl:text-[13px] 2xl:text-[15px] text-gray-500'>New Messaage</p>
          </div>

        </div>



      </div>

      <div className="w-full  ">
        <div className="">
          {React.createElement(Object.values(navs[activeTab.navIndex].components[activeTab.tabIndex])[0])}

        </div>
      </div>

    </div>
  );
};

export default SideNav;
