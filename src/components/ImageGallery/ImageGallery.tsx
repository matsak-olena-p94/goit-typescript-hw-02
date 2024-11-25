import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

interface AppImage {
    id: string;
    url: string;
    title: string;
  }

interface ImageGalleryProps {
    images: AppImage[];
    onImageClick: (url: string) => void;
  }
  
  const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
    return (
      <ul>
        {images.map((img) => (
          <li key={img.id} onClick={() => onImageClick(img.url)}>
            <img src={img.url} alt={img.title} />
          </li>
        ))}
      </ul>
    );
  };
  
  export default ImageGallery;