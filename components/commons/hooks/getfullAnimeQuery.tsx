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
  episodes: number;
  members: number;
  genres: {
    id: number;
    name: string;
  }[];
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  synopsis: string;
  rating: string;
  score: number;
  url: string;
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
  };
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

export interface Streaming {
  name: string;
  url: string;
}

interface StreamingResponse {
  data: Streaming[];
}

const getStreamingQuery = async (id: number): Promise<StreamingResponse> => {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/streaming`);
    return response.data;
}

export const useGetStreaming = (id: number) => {
    return useQuery({
        queryKey: ['streaming', id],
        queryFn: () => getStreamingQuery(id),
        staleTime: 1000 * 60 * 60, // 1 hour
    });
}
