import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

// import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MainLayout } from './components/layout';
import { PageContextProvider } from './store/page-context';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <PageContextProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <MainLayout />
        </QueryClientProvider>
      </PageContextProvider>
    </>
  );
}

export default App;
