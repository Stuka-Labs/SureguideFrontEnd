// InputMessage.js
'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import smile from '../../../public/smile.png';
import attach from '../../../public/attachment.png';
import mic from '../../../public/mic.png';
import send from '../../../public/send2.png';
import videocall from '../../../public/videocall.png';
import './Inutbox.css'

const InputMessage = ({ onSubmit, isFetching }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFetching && message.trim() !== '') {
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
        <form onSubmit={handleSubmit} className=" flex flex-grow items-center">
          <textarea rows={3}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="p-2 px-5 rounded-xl w-full outline-none text-gray-400 font-normal text-[10px] lg:text-[12px] xl:text-[15px] 2xl:text-[18px] resize-none"
            style={{ whiteSpace: 'pre-wrap' }}
            disabled={isFetching} // Disable textarea if isFetching is true
          />
          {isFetching ? <div className="loader"></div> : <Image alt='Send Message'
            className={`mr-5 cursor-pointer ${isFetching ? 'opacity-50' : ''} `}
            height={25}
            width={25}
            src={send}
            onClick={handleSubmit}
            disabled={isFetching} // Disable send button if isFetching is true
          />}
        </form>
      </div>

    </div>
  );
};

export default InputMessage;
