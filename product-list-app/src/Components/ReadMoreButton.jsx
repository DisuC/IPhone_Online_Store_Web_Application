import React from 'react';

function ReadMoreButton({ onClick }) {
    return (
        <div
            className="inline-block cursor-pointer bg-blue-950 transition-colors duration-300 px-6 py-2 shadow-md mt-5"
            id="read-more-button"
            onClick={onClick}
        >
            <p className="text-white font-regular text-2xl">Read More</p>
        </div>
    );
}

export default ReadMoreButton;