
'use client'
import React, { useState, useRef, useEffect } from 'react';
import MessageItem from '../msgItem/Messageitem';
import InputMessage from '../inputBox/Inputbox';
import Image from 'next/image';
import videoCall from '../../../public/videocall.png'
import voiceCall from '../../../public/call.png'

export default function ChatBox() {
    const [messages, setMessages] = useState([
        {
            doc: false,
            staticData: {
                owner: 'John',
                sender: 'John',
                senderAvatar: 'https://i.pravatar.cc/150?img=56',
                message: 'Hello, this is a sample message!Hello, this is a sample message',
                isOnline: true
            }
        },
        {
            doc: true,
            staticData: {
                owner: 'Jane',
                sender: 'Jane',
                senderAvatar: 'https://i.pravatar.cc/150?img=57',
                message: 'Hi, how are you?',
                isOnline: false
            }
        },
        {
            doc: false,
            staticData: {
                owner: 'John',
                sender: 'John',
                senderAvatar: 'https://i.pravatar.cc/150?img=56',
                message: 'I am doing well thank you',
                isOnline: true
            }
        },
        {
            doc: false,
            staticData: {
                owner: 'Jane',
                sender: 'Jane',
                senderAvatar: 'https://i.pravatar.cc/150?img=57',
                message: 'Thats great to hear',
                isOnline: false
            }
        },
        {
            doc: true,
            staticData: {
                owner: 'John',
                sender: 'John',
                senderAvatar: 'https://i.pravatar.cc/150?img=56',
                message: 'Here is a document for you.',
                isOnline: true
            }
        },
        {
            doc: false,
            staticData: {
                owner: 'Jane',
                sender: 'Jane',
                senderAvatar: 'https://i.pravatar.cc/150?img=57',
                message: 'Thank you! I will check it',
                isOnline: false
            }
        },
    ]);

    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    const handleMessageSubmit = (newMessage) => {
        console.log("newmessage", newMessage);
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                doc: false,
                staticData: {
                    owner: 'John', // You may want to dynamically set the owner based on the user
                    sender: 'John',
                    senderAvatar: 'https://i.pravatar.cc/150?img=56',
                    message: newMessage,
                    isOnline: true,
                },
            },
        ]);
    };

    return (
        <>
            <div className='h-[35px] flex justify-between items-center px-3 '>
                <div className='text-sm'> AllstateAI</div>
                <div className='flex   gap-2'>

                    <Image height={15} width={15} src={videoCall} />
                    <Image height={15} width={15} src={voiceCall} />
                </div>
            </div>
            {/* <div className='bg-gray-200 h-[1px] my-2'></div> */}
            <div className='border-t border-gray-400 h-[calc(100vh-(35px+48px))] overflow-auto'>

                <div ref={messagesContainerRef} className=''>
                    {messages.map((message, index) => (
                        <MessageItem key={index} doc={message.doc} staticData={message.staticData} />
                    ))}
                </div>

 

                <div
                    className="px-4 pb-2 rounded-xl h-1/5 w-full"
                    style={{ position: 'sticky', bottom: 0, left: 0, right: 0 }}
                >
                    <InputMessage onSubmit={handleMessageSubmit} />
                </div>
            </div>

        </>
    );
}
