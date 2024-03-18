export const PaginationLayout = [
  {
    type: 'recentRelease',
    position: 'left',
  },

  {
    type: 'pagination',
    label: 'Pages',
    position: 'right',
  },
];

export const currentAnimeType = [
  {
    id: '1',
    type: 'sub',
    name: 'Recently Released',
  },
  {
    id: '2',
    type: 'dub',
    name: 'Recently Dubbed',
  },
  {
    id: '3',
    type: 'chi',
    name: 'CHINESE',
  },
];

export const AnimeTypeHeaders = [
  { id: '1', type: 'sub', label: 'HOME', value: 1 },
  { id: '3', type: 'dub', label: 'DUB', value: 2 },
  { id: '4', type: 'chi', label: 'CHINESE', value: 3 },
];

export const navHeaders = [
  {
    type: 'logo',
    name: 'webLogo',
    content: 'Nitro-ui',
    position: 'left',
  },

  {
    type: 'heading',
    name: 'webName',
    content: 'Nitro-ui',
    position: 'left',
  },

  {
    type: 'icon',
    name: 'userAvatar',
    content: 'username',
    position: 'right',
  },
];
