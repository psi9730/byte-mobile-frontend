import amplitude from 'amplitude-js';

export const makeImageSrcSet = (path, rootDir = '/images/') => {
  return [
    rootDir + path,
    `${rootDir + path} 1x, ${rootDir +
      path.slice(0, -4) +
      '@2x' +
      path.slice(-4)} 2x, ${rootDir +
      path.slice(0, -4) +
      '@3x' +
      path.slice(-4)} 3x`,
  ];
};

export const logEvent = (name, properties) => {
  const concatProperties =
    typeof properties === 'object' && properties !== null
      ? '&' +
        Object.entries(properties)
          .map(
            entry =>
              `${encodeURIComponent(entry[0])}=${encodeURIComponent(entry[1])}`,
          )
          .join('&')
      : '';
  const deeplink = `stsh://analytics?event=${encodeURIComponent(
    name,
  )}${concatProperties}`;

  if (navigator.userAgent.toLowerCase().indexOf('styleshare') !== -1) {
    setTimeout(() => {
      window.location.href = deeplink;
    });
  } else {
    amplitude.getInstance().logEvent(name, properties);
  }
};

export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const isStyleShare = () => {
  var UserAgent = navigator.userAgent;
  return UserAgent.includes('styleshare');
};

export const isMobile = () => {
  var UserAgent = navigator.userAgent;

  if (
    UserAgent.match(
      /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i,
    ) != null ||
    UserAgent.match(/LG|SAMSUNG|Samsung/) != null
  ) {
    return true;
  } else {
    return false;
  }
};

export const windowLocation = url => {
  var X = setTimeout(function() {
    window.location.href = url;
    return true;
  }, 300);
  if (isMobile()) {
    window.location.href = url;
  } else {
    clearTimeout(X);
    window.open(url, '_blank');
  }
  return false;
};
