
'use client'
import React, { useState, useRef,useEffect } from 'react';
import MessageItem from "../components/msgItem/Messageitem";
import InputMessage from "../components/inputBox/Inputbox";

export default function Home() {
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
    console.log("newmessage",newMessage);
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
      <div className="p-4 bg-white w-10/12 m-auto relative">
        <div   ref={messagesContainerRef} style={{ height: '400px', overflowY: 'auto' }}>
          {messages.map((message, index) => (
            <MessageItem key={index} doc={message.doc} staticData={message.staticData} />
          ))}
        </div>

        <div
          className="px-4 pb-2 rounded-xl"
          style={{ position: 'sticky', bottom: 0, left: 0, right: 0 }}
        >
          <InputMessage onSubmit={handleMessageSubmit} />
        </div>
      </div>
    </>
  );
}
