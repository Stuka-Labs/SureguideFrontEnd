import React, { useState, useRef, useEffect } from 'react';
const Burger = ({ open, setOpen }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
      setIsOpen((prevOpen) => !prevOpen);
    };
    return (
        <button
            className="absolute top-2 left-2 flex flex-col justify-around w-8 h-8 bg-transparent border-none cursor-pointer p-0 z-[100] focus:outline-none"
            onClick={() => setOpen(!open)}
        >
            <div id="nav-icon3" className={`burger-icon ${open ? 'open' : ''}`}   onClick={() => setOpen(!open)}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </button>
    );
};

export default Burger;