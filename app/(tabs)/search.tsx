import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/app/queryClient';
import MyComponent from './ss';

export default function Search() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyComponent />
    </QueryClientProvider>
  );
}


