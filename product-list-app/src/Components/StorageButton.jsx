import React from 'react';

function StorageButton({ storageAmount, isSelected, onClick }) {
    return (
        <button
            className={`
                px-4 py-2 bg-white text-blue-500 rounded border-2  transition-colors
                ${isSelected ? 'border-blue-500' : 'border-gray-300'}
            `}
            onClick={onClick}
        >
            {storageAmount} GB
        </button>
    );
}

export default StorageButton;