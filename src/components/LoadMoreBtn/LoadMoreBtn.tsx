import React from 'react';

interface LoadMoreBtnProps {
    handleClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ handleClick }) => {
    return (
        <button onClick={handleClick}>
            load more
        </button>
    );
}

export default LoadMoreBtn;