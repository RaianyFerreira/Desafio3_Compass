import React from 'react';

type BtnProps = {
    children: React.ReactNode;
    onClick?: () => void;
    width?: number;
    height?: number;
}

const Button = ({
    children,
    onClick,
    width = 222,
    height = 74
}: BtnProps ) => {
    return (
        <button
            onClick={onClick}
            style={{ width: `${width}px`, height: `${height}px` }}
            className="bg-[#B88E2F] text-white text-base font-bold border-none cursor-pointer transition-colors duration-400 hover:bg-white hover:text-[#B88E2F] hover:border-[#B88E2F] hover:rounded-md sm:max-w-[150px] sm:h-[50px]">
            {children}
        </button>
    );
}

export default Button;
