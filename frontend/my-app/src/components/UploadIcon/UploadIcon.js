import React from 'react';
const UploadIcon = ({ width, height, color = "#000000", className}) => {
    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="currentColor"
            width={width || "auto"}
            height={height || "auto"}
            className={className}
        >
            <g>
                <path
                    fill="#E1E5E5"
                    d="M28,13h-1c0-3.314-2.686-6-6-6h-0.587C19.226,4.069,16.357,2,13,2c-4.418,0-8,3.582-8,8v1 
                    c-2.209,0-4,1.791-4,4c0,2.209,1.791,4,4,4h23c1.657,0,3-1.343,3-3S29.657,13,28,13z"
                />
                <polygon fill="#C4CCCC" points="14,9 24,19 11,19 11,17 8,17 " />
                <polygon fill="#FDFFFF" points="8,17 14,9 20,17 17,17 17,30 11,30 11,17 " />
            </g>
        </svg>
    );
};

export default UploadIcon;
