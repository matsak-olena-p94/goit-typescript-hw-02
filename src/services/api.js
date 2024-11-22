import axios from 'axios'

export const fetchArticles = async (query, page = 1) => {
    const { data } = await axios.get('https://api.unsplash.com/search/photos/', {
        params: {
            client_id: 'C3E1RDHG0LT50bAiHpYJXVTg2GJSJZK7AB4hmpwDPWk',
            query: query,
            page: page,
            per_page: 12, 
          },
        });
        return data;
        }
