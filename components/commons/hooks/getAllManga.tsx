import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
const getallMangaUrl = "https://api.jikan.moe/v4/manga"


export interface Manga {
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

interface MangaResponse {
  data: Manga[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
}

const getAllAnimeQuery = async (query: string): Promise<MangaResponse> => {
    const response = await axios.get(`${getallMangaUrl}?${query}`);
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
export interface External {
  name: string;
  url: string;
}

interface ExternalResponse {
  data: External[];
}

const getMangaExternalQuery = async (id: number): Promise<ExternalResponse> => {
    const response = await axios.get(`https://api.jikan.moe/v4/manga/${id}/external`);
    return response.data;
}

export const useGetMangaExternal = (id: number) => {
    return useQuery({
        queryKey: ['mangaExternal', id],
        queryFn: () => getMangaExternalQuery(id),
        staleTime: 1000 * 60 * 60, // 1 hour
    });
}
