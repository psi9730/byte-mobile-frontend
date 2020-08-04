export const makeImageSrcSet = (path, rootDir = "/images/") => {
    const [filename, fileExtension] = path.split(".");
    return [
        rootDir + path,
        `${rootDir + path} 1x, ${
            rootDir + filename + "@2x." + fileExtension
        } 2x, ${rootDir + filename + "@3x." + fileExtension} 3x`,
    ];
};

export function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const isStyleShare = () => {
    var UserAgent = navigator.userAgent;
    return UserAgent.includes("styleshare");
};

export const isMobile = () => {
    var UserAgent = navigator.userAgent;

    if (
        UserAgent.match(
            /iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i
        ) != null ||
        UserAgent.match(/LG|SAMSUNG|Samsung/) != null
    ) {
        return true;
    } else {
        return false;
    }
};

export const windowLocation = (url) => {
    var X = setTimeout(function () {
        window.location.href = url;
        return true;
    }, 300);
    if (isMobile()) {
        window.location.href = url;
    } else {
        clearTimeout(X);
        window.open(url, "_blank");
    }
    return false;
};
