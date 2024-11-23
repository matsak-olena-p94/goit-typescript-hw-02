import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

interface Image {
    id: string;
    urls: {
        regular: string;
        small: string;
    };
    description?: string;
}

interface ImageGalleryProps {
    images: Image[];
    onImageClick: (url: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
    return (
        <ul className={css.list}>
          {images.map((img) => (            
            <li key={img.id} onClick={() => onImageClick(img.urls.regular)}>
                <ImageCard img={img} />
            </li>
          ))}
        </ul>
    );
}

export default ImageGallery;