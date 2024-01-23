// MessageItem.js
'use client'
import React from 'react';
import docImage from "../../../public/docImage.png";
import cloudImage from "../../../public/cloud.png";
import Image from 'next/image';
import "./Messageitem.css"

const MessageItem = ({ doc, staticData }) => {
  const messagePosition = (staticData.owner === staticData.sender) ? 'chatApp__convMessageItem--right' : 'chatApp__convMessageItem--left';

  return (
    <div className={`chatApp__convMessageItem ${messagePosition}`}>
      <div className='h-8 w-8 relative'>
        <img src={staticData.senderAvatar} alt={staticData.sender} className="chatApp__convMessageAvatar" />
        {staticData.isOnline && <div className='online-badge'></div>}
      </div>
      <div className='w-full'>
        <div className='flex gap-1'>
          <p className='text-black font-semibold text-[10px]'>{staticData.sender}</p>
          <p className='text-gray-400 font-normal text-[10px]'>3:00 PM</p>
        </div>
        <div className="chatApp__convMessageValue text-gray-400" style={{ whiteSpace: 'pre-wrap' }}>
          {staticData.message}
        </div>
        {doc && (
          <div className='uploaded max-w-[11rem] rounded-2xl shadow-[1px_2px_5px_1px_#00000024] h-10 mt-2'>
            <div className='flex items-center '>
              <Image height={40} width={40} src={docImage} />
              <div>
                <p className='text-gray-500 w-[90px] font-medium text-[9px]'>Q3 Keynote Version </p>
                <div className='text-gray-400 font-normal text-[10px] flex gap-4 '><span>11:20</span> <span>32MB</span></div>
              </div>
              <Image className='ml-4' height={15} width={15} src={cloudImage} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
