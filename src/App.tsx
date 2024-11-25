import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { useEffect, useState } from 'react';
import { fetchArticles } from './services/api';
import ImageModal from './components/ImageModal/ImageModal';


interface Image {
  id: string;
  url: string;
  title: string;
}

function App() {
  const [images, setImages] = useState<Image[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false); 
  const [page, setPage] = useState<number>(1); 
  const [query, setQuery] = useState<string>(''); 
  const [selectedImage, setSelectedImage] = useState<string | null>(null); 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

  useEffect(() => {
    const fetchImages = async () => {
      if (query === '') return;
      try {
        setIsError(false);
        setIsLoading(true);

        const response = await fetchArticles(query, page);

        if (page === 1) {
          setImages(response.results);
        } else {
          setImages((prevImages) => [...prevImages, ...response.results]);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageUrl: string) => {
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

      {selectedImage && (
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
