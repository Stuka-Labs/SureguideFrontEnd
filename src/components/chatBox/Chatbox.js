
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
            doc: false,
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
            doc: false,
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
                    owner: 'John',
                    sender: 'John',
                    senderAvatar: 'https://i.pravatar.cc/150?img=56',
                    message: newMessage,
                    isOnline: true,
                },
            },
        ]);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "prompt": newMessage
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/generate-response", requestOptions)
            .then(response => response.text())
            .then(result => 
         
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    doc: false,
                    staticData: {
                        owner: 'Jane', 
                        sender: 'Jane',
                        senderAvatar: 'https://i.pravatar.cc/150?img=57',
                        message: JSON.parse(result).response,
                        isOnline: true,
                    },
                },
            ])
            )
            .catch(error => console.log('error', error))

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
            <div className='border-t border-gray-400 h-[calc(100vh-(35px+48px))] overflow-auto flex flex-col justify-between'>

                <div ref={messagesContainerRef} className='2xl:max-h-[93%] xl:max-h-[85%] lg:max-h-[82%] max-h-[75%]  overflow-y-scroll'>
                    {messages.map((message, index) => (
                        <MessageItem key={index} doc={message.doc} staticData={message.staticData} />
                    ))}
                </div>



                <div className="px-4 pb-2 rounded-xl">
                    <InputMessage onSubmit={handleMessageSubmit} />
                </div>
            </div>

        </>
    );
}
