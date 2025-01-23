import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
const allAnimeUrl = "https://api.jikan.moe/v4/manga"

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

const getAllAnimeQuery = async (): Promise<AnimeResponse> => {
    const response = await axios.get(allAnimeUrl);
    return response.data;
}

const useGetAllAnime = () => {
    const {isLoading, data} = useQuery({
        queryKey: ['allAnime'],
        queryFn: getAllAnimeQuery
    });
    return {data, isLoading};
}

export { useGetAllAnime };
export type { Anime as MangaType, AnimeResponse as MangaResponse };
