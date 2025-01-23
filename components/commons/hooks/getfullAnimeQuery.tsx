import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

// Update base URL to include search parameter only when query exists
const getAllAnimeUrl = (query: string) => 
  query ? `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&nsfw` 
  : 'https://api.jikan.moe/v4/anime?sfw';

export interface Anime {
  id: number;
  title: string;
  title_japanese: string;
  type: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  synopsis: string;
  rating: string;
  score: number;
}

interface AnimeResponse {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
}

const getAllAnimeQuery = async (query: string): Promise<AnimeResponse> => {
    const response = await axios.get(getAllAnimeUrl(query));
    return response.data;
}

export const useGetAllAnime = (query: string = '') => {
    const { isLoading, data } = useQuery({
        queryKey: ['allAnime', query],
        queryFn: () => getAllAnimeQuery(query),
        enabled: true,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
    return { data, isLoading };
}
