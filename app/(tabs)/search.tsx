import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/app/queryClient';
import MyComponent from './ss';
import { useGetAllAnime } from '@/components/commons/hooks/getfullAnimeQuery';
export default function Search() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyComponent />
    </QueryClientProvider>
  );
}


