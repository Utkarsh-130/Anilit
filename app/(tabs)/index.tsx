import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import  HomeScreen  from './home';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeScreen />
    </QueryClientProvider>
  );
}

