import React from 'react';

function ColorSelection({ color, isSelected, onClick }) {
    return (
        <div
            className={`
                w-6 h-6 rounded-full cursor-pointer
                ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
            `}
            style={{ backgroundColor: color }}
            onClick={onClick}
        ></div>
    );
}

export default ColorSelection;