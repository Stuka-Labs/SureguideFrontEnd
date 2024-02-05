
'use client'
import React, { useState, useRef, useEffect } from 'react';
import ChatBox from '@/components/chatBox/Chatbox';
import SideNav from '@/components/sideNavbar/Sidenav';
import Header from '@/components/header/Header';

export default function Home()
{

    const TabComponent1 = () => <ChatBox id={1} />;
    const TabComponent2 = () => <ChatBox id={2} />;
    const TabComponent3 = () => <ChatBox id={3} />;

    const components = [TabComponent1, TabComponent2, TabComponent3];


    const navs = [
        {
            heading: 'Frequently Asked',
            components: [
                { 'Coverage and Policies': TabComponent1 }, { 'Claims and Detuctibles': TabComponent2 }, { 'Insurance Claim Process': TabComponent3 }],
        }
        // Add more navs as needed
    ];

    return (
        <div className="100vh">
            <Header />
            <SideNav navs={navs} />
        </div>
    );


}
