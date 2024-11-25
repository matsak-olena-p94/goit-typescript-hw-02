// Тип для зображення
export interface Image {
  id: string;
  url: string;
  title: string;
}

// Функція для запиту до API
export const fetchArticles = async (
  query: string,
  page: number
): Promise<{ results: Image[] }> => {
  const API_URL = `https://api.example.com/search?query=${query}&page=${page}`;
  
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  return await response.json();
};
