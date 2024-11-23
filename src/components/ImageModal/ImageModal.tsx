import React, { useEffect } from 'react';
import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root'); 

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose} 
      contentLabel="Selected Image"
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button onClick={onClose}>Закрити</button>
      <img src={imageUrl} alt="Selected" className={css.img} />
    </Modal>
  );
};

export default ImageModal;