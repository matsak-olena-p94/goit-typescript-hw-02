
interface AppImage {
  id: string;
  url: string;
  title: string;
}

export const fetchArticles = async (
  query: string,
  page: number
): Promise<{ results: AppImage[] }> => {
  const response = await fetch(
    `https://api.example.com/search?query=${query}&page=${page}`
  );
  
  const data = await response.json();

  // Перетворіть дані, якщо вони мають інший формат
  return {
    results: data.results.map((item: any) => ({
      id: item.id,
      urls: item.urls, // Передбачаємо, що API повертає ці дані
      description: item.description || '',
    })),
  };
};

export default AppImage;

