'use client'
import React, { useState, useRef, useEffect } from 'react';
import MessageItem from '../msgItem/Messageitem';
import InputMessage from '../inputBox/Inputbox';
import Image from 'next/image';
import videoCall from '../../../public/videocall.png'
import voiceCall from '../../../public/call.png'
import bot from '../../../public/bot.png'
import "./Chatbox.css"

export default function ChatBox()
{
    const [isFetching, setIsFetching] = useState(false);
    const [messages, setMessages] = useState([

    ]);

    const messagesContainerRef = useRef(null);

    const scrollToBottom = () =>
    {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    };

    useEffect(() =>
    {
        scrollToBottom();
    }, [messages]);


    const handleMessageSubmit = (newMessage) =>
    {
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

        fetch("http://127.0.0.1:8000/generate-response", requestOptions)
            .then(response => response.text())
            .then(result =>
            {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        doc: false,
                        staticData: {
                            owner: 'Jane',
                            sender: 'Jane',
                            senderAvatar: bot,
                            message: JSON.parse(result).response,
                            isOnline: true,
                        },
                    },
                ]);
                setIsFetching(false); // Set isFetching to false after fetching is done
            })
            .catch(error =>
            {
                console.log('error', error);
                setIsFetching(false); // Set isFetching to false in case of an error
            });
    };

    return (
        <>
            <div className='h-[35px] flex justify-between items-center px-3 '>
                <div className='text-[14px] lg:text-[16px] xl:text-[19px] 2xl:text-[22px]'> Sure Guide</div>
                <div className='flex   gap-2'>
                    <Image height={15} width={15} src={videoCall} />
                    <Image height={15} width={15} src={voiceCall} />
                </div>
            </div>

            <div className='border-t border-gray-400 h-[calc(100vh-(35px+48px))] flex flex-col justify-between'>
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
