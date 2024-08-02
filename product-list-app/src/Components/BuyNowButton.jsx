import React from 'react';

function BuyNowButton({ backgroundColor, textColor, borderColor, content,outline }) {
    return (
        <button
            className={`
                px-6 py-3 rounded-full font-semibold
                transition-colors duration-300 ease-in-out
                text-2xl 
                hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2
            `}
            style={{
                backgroundColor: backgroundColor || '#1B04A5',
                color: textColor || 'white',
                outline:outline || null,
                borderColor: borderColor || 'transparent',
                borderWidth: '2px',
                borderStyle: 'solid'
            }}
        >
            {content || 'Buy Now'}
        </button>
    );
}

export default BuyNowButton;