'use client'
import React, { useState, useRef, useEffect } from 'react';
import MessageItem from '../msgItem/Messageitem';
import InputMessage from '../inputBox/Inputbox';
import Image from 'next/image';
import videoCall from '../../../public/videocall.png'
import voiceCall from '../../../public/call.png'
import bot from '../../../public/bot.png'
import "./Chatbox.css"
import UserImg from "../../../public/user.png"

const FetchUrl="http://34.204.8.155:8000/generate-response"
import  secureLocalStorage  from  "react-secure-storage";

export default function ChatBox({id})
{
    const [isFetching, setIsFetching] = useState(false);
    const [messages, setMessages] = useState(() => {
        const storedMessages = secureLocalStorage.getItem(`chatMessages_${id}`);
        return storedMessages ? JSON.parse(storedMessages) : [];
    });
  


    const messagesContainerRef = useRef(null);

    const scrollToBottom = () =>
    {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    };

    useEffect(() =>
    {
        secureLocalStorage.setItem(`chatMessages_${id}`, JSON.stringify(messages));
        scrollToBottom();
    }, [messages]);


    const handleMessageSubmit = (newMessage) =>
    {
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                doc: false,
                staticData: {
                    owner: 'User',
                    sender: 'User',
                    senderAvatar: UserImg,
                    message: newMessage,
                    isOnline: true,
                },
            },
        ]);
        setIsFetching(true);

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

        fetch(FetchUrl, requestOptions)
            .then(response => response.text())
            .then(result =>
            {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        doc: false,
                        staticData: {
                            owner: 'Zaid',
                            sender: 'Zaid',
                            senderAvatar: bot,
                            message: JSON.parse(result).response,
                            isOnline: true,
                        },
                    },
                ]);
                setIsFetching(false); 
            })
            .catch(error =>
            {
                console.log('error', error);
                setIsFetching(false); 
            });
    };

    return (
        <>
            <div className='h-[40px] flex justify-between items-center px-3 '>
                <div className='text-[14px] lg:text-[16px] xl:text-[19px] 2xl:text-[22px] text-[#000000d4]'> Welcome to Sure Guide</div>
                {/* <div className='flex   gap-2'>
                    <Image height={15} width={15} src={videoCall} />
                    <Image height={15} width={15} src={voiceCall} />
                </div> */}
            </div>

            <div className='border-t border-gray-400 h-[calc(100vh-(40px+48px))] flex flex-col justify-between shadow-[inset_0px_2px_5px_0px_#00000040]'>
                <div ref={messagesContainerRef} className='h-[calc(100%-(93px))] overflow-y-auto relative' >
                    {messages.map((message, index) => (
                        <MessageItem key={index} doc={message.doc} staticData={message.staticData} />
                    ))}


                </div>
                {isFetching && (
                    <div className="loading  ">
                        <span className="loading__dot"></span>
                        <span className="loading__dot"></span>
                        <span className="loading__dot"></span>
                    </div>
                )}
                <div className="px-4 pb-2 rounded-xl ">
                    <InputMessage onSubmit={handleMessageSubmit} isFetching={isFetching} />
                </div>
            </div>
        </>
    );
}
