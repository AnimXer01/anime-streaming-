export const extractAnimeName = (currentAnimeType, availableAnimeArr = []) => {
  return availableAnimeArr?.filter(
    (el) => Number(el?.id) === currentAnimeType
  )?.[0]?.name;
};

export const processEpisodeList = (allEpList = [], demoUrl = '') => {
  if (allEpList?.length === 0) return [];
  allEpList.sort((a, b) => parseInt(a.episodeStart) - parseInt(b.episodeStart));

  let episodes = [];
  allEpList.forEach((range) => {
    for (
      let i = parseInt(range.episodeStart);
      i <= parseInt(range.episodeEnd);
      i++
    ) {
      if (i === 0) continue; // Skip i = 0
      let episodeUrl = demoUrl.replace(/\d+$/, i);
      episodes.push({
        label: i,
        value: episodeUrl,
      });
    }
  });

  return episodes;
};

export const processAnimeName = (url) => {
  if (!url) return '';
  return url.split('-episode')[0];
};
