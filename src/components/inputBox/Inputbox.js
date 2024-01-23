// InputMessage.js
'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import smile from '../../../public/smile.png';
import attach from '../../../public/attachment.png';
import mic from '../../../public/mic.png';
import send from '../../../public/send.png';
import videocall from '../../../public/videocall.png';

const InputMessage = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      onSubmit(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    // Check if the Enter key is pressed without the Shift key
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default behavior (submitting the form)
      handleSubmit(e); // Submit the message
    }
  };
  

  return (
    <div className="rounded-xl shadow-[1px_2px_5px_1px_#00000024]">
      <div className="relative">
        <form onSubmit={handleSubmit} className="flex-grow">
          <textarea
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="p-2 rounded-xl w-full outline-none text-gray-400 font-normal text-[11px] resize-none"
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </form>
      </div>
      <hr className="" />
      <div className="flex items-center justify-between p-2">
        <div className="flex gap-2 pl-2">
          <Image className='cursor-pointer' height={15} width={15} src={smile} />
          <Image className='cursor-pointer' height={15} width={15} src={attach} />
          <Image className='cursor-pointer' height={15} width={15} src={mic} />
          <Image className='cursor-pointer' height={15} width={15} src={videocall} />
        </div>
        <div>
          <Image className='cursor-pointer' height={15} width={15} src={send} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default InputMessage;
