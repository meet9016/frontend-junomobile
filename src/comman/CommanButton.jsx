import React from "react";

const CommanButton = ({
    label,
    onClick,
    type = "button",
    disabled = false,
    className = "",
    bgColor = "bg-[#251c4b]",
    textColor = "text-white",
    opacity = "",
    gap = "2",
    borDer = "border",
    shaDow = "shadow-5xl"

}) => {
    const defaultClass = `
    px-4 py-2 
    rounded-lg 
    
    transition-all 
    duration-300 
    cursor-pointer 
    disabled:opacity-50 disabled:cursor-not-allowed
    items-center
    
    border-gray-300
    flex
    flex-1
    justify-center
  `;
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${defaultClass} ${bgColor} ${className} ${opacity} ${textColor} ${gap} ${borDer} ${shaDow} `}
        >
            {label}
        </button>
    );
};

export default CommanButton;
