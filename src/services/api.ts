import axios from 'axios';

interface Image {
    id: string;
    urls: {
        small: string;
        regular: string;
    };
    description?: string;
}

interface FetchArticlesResponse {
    results: Image[];
    total: number;
    total_pages: number;
}

export const fetchArticles = async (query: string, page: number = 1): Promise<FetchArticlesResponse> => {
    const { data } = await axios.get<FetchArticlesResponse>('https://api.unsplash.com/search/photos/', {
      params: {
        client_id: 'FZK5K8CibqNmzzFrZMI9trJWic4JElwNhSKQb-6L8Jk',
        query: query,
        page: page,
        per_page: 12, 
      },
    });
    return data;
}