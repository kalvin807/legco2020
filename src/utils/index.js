import { seatColorMapping } from '@/config';

export function openInNewTab(url) {
  const win = window.open(url, '_blank');
  win.focus();
}

export function calculateSeatBox(e) {
  const expectedWinDemo = Number(e.expected_win_demo) || 0;
  const unresolvedSeats = Number(e.unresolved_seats) || 0;
  const expectedWinBeijing = Number(e.expected_win_beijing) || 0;

  return [
    ...[...Array(expectedWinDemo).keys()].map(() => ({
      color: seatColorMapping.FC_EXPECTED_WIN_DEMO,
    })),
    ...[...Array(unresolvedSeats).keys()].map(() => ({
      color: seatColorMapping.UNRESOLVED,
    })),
    ...[...Array(expectedWinBeijing).keys()].map(() => ({
      color: seatColorMapping.FC_EXPECTED_WIN_BEIJING,
    })),
  ];
}

export function calculateSeatBoxForPrimary(e) {
  const baseRow = [...Array(Number(e.seats)).keys()].map(() => ({
    color: seatColorMapping.UNRESOLVED,
  }));

  if (!e.target) {
    return baseRow;
  }

  return baseRow.map((row, i) => {
    const newRow = row;
    if (i < Number(e.target)) {
      newRow.color = seatColorMapping.FC_EXPECTED_WIN_DEMO;
    }
    return newRow;
  });
}

export const saveToLocalStorage = (key, value) => {
  if (typeof Storage !== 'undefined') {
    window.localStorage.setItem(key, value);
  }
};

export const get = (obj, path, defaultValue = undefined) => {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

export const handleVideoUrl = ({ assetId, type, thumbnailUrl }) => {
  let videoUrl;
  let imgUrl;
  switch (type) {
    case 'facebook':
      videoUrl = `https://www.facebook.com/watch/?v=${assetId}`;
      imgUrl = thumbnailUrl;
      break;
    case 'youtube':
    default:
      videoUrl = `https://www.youtube.com/watch?v=${assetId}`;
      imgUrl = `https://i.ytimg.com/vi/${assetId}/hqdefault.jpg`;
      break;
  }
  return {
    videoUrl,
    imgUrl,
  };
};
