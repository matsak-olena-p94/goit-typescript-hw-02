import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import { fetchArticles } from './services/api';

// Тип даних для зображення
interface Image {
  id: string;
  url: string;
  description: string;
}

function App() {
  const [images, setImages] = useState<Image[]>([]); // Тип для масиву зображень
  const [isLoading, setIsLoading] = useState<boolean>(false); // Булевий тип для стану завантаження
  const [isError, setIsError] = useState<boolean>(false); // Булевий тип для стану помилки
  const [page, setPage] = useState<number>(1); // Номер сторінки
  const [query, setQuery] = useState<string>(''); // Пошуковий запит
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // URL вибраного зображення
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Стан модального вікна

  useEffect(() => {
    const fetchImages = async () => {
      if (!query) {
        setImages([]);
        return;
      }

      try {
        setIsError(false);
        setIsLoading(true);

        const response = await fetchArticles(query, page);

        // Оновлення стану з уникненням дублікатів
        setImages((prevImages) => {
          const newImages = page === 1 ? response.results : [...prevImages, ...response.results];
          return [...new Map(newImages.map((img) => [img.id, img])).values()];
        });
      } catch (error) {
        console.error('Error fetching images:', (error as Error).message); // Виправлення типу "unknown" для помилки
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery: string) => { // Тип для `newQuery`
    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageUrl: string) => { // Тип для `imageUrl`
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && <ImageGallery images={images} onImageClick={openModal} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {images.length > 0 && !isLoading && !isError && (
        <LoadMoreBtn handleClick={handleLoadMore} />
      )}

      {isModalOpen && selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageUrl={selectedImage}
        />
      )}
    </>
  );
}

export default App;
