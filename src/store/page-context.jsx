import React, { useState, useCallback } from 'react';

export const PageContext = React.createContext({
  currentPage: 1,
  nextPageHandler: () => {},
  previousPageHandler: () => {},
  animeType: 1,
  setAnimeType: () => {},
  setCurrentVideoUrl: () => {},
});

export const PageContextProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [animeType, setAnimeType] = useState(1);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);

  const previousPageHandler = useCallback(() => {
    // Logic for previous page navigation
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  }, [currentPage]);

  const nextPageHandler = useCallback(() => {
    // Logic for next page navigation
    setCurrentPage((prevPage) => prevPage + 1);
  }, []);

  return (
    <PageContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        nextPageHandler,
        previousPageHandler,
        animeType,
        setAnimeType,
        currentVideoUrl,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
