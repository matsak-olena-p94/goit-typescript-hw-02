import React from 'react';
import css from './ImageCard.module.css';

interface Image {
    urls: {
        small: string;
    };
    description?: string;
}

interface ImageCardProps {
    img: Image;
}

const ImageCard: React.FC<ImageCardProps> = ({ img }) => {
    return (
        <div className={css.img}>
            <img src={img.urls.small} alt={img.description || 'Image'} />
        </div>
    );
}

export default ImageCard;