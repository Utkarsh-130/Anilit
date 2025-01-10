import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
const allAnimeUrl = "https://api.jikan.moe/v4/anime"
const getAllAnimeQuery = async () => {
    const response = await axios.get(allAnimeUrl)
    return response.data
}

export const useGetAllAnime = () => {
    const {isLoading, data} = useQuery({
        queryKey: ['allAnime'],
        queryFn: getAllAnimeQuery
    })
    return {data,isLoading};
}
 