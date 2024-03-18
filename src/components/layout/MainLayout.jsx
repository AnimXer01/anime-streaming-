import {
  RecentRelease,
  AnimeCarousel,
  Pagination,
  TopNavigation,
} from './index';
const MainLayout = () => {
  return (
    <>
      <TopNavigation />
      <AnimeCarousel />
      <Pagination />
      <RecentRelease />
    </>
  );
};

export default MainLayout;
