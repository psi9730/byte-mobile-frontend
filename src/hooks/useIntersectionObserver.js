import { useState, useEffect, useCallback } from "react";

const baseOption = {
    root: null,
    threshold: 0.5,
    rootMargin: "0px",
};
const useIntersect = (onIntersect, id, loadMore, option = baseOption) => {
    const [ref, setRef] = useState(null);
    const checkIntersect = useCallback(
        ([entry], observer) => {
            if (entry.isIntersecting) {
                onIntersect(entry, observer, id, loadMore);
            }
        },
        [id, loadMore]
    );
    useEffect(() => {
        let observer;
        if (ref) {
            observer = new IntersectionObserver(checkIntersect, {
                ...option,
            });
            observer.observe(ref);
        }
        return () => {
            observer && observer.disconnect();
        };
    }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);
    return [ref, setRef];
};

export default useIntersect;

// export default ({
//     root,
//     target,
//     onIntersect,
//     threshold = 1.0,
//     rootMargin = "0px",
// }) => {
//     useEffect(() => {
//         if (!root) {
//             return;
//         }

//         const observer = new IntersectionObserver(onIntersect, {
//             root,
//             rootMargin,
//             threshold,
//         });

//         if (!target) {
//             return;
//         }

//         observer.observe(target);

//         // Let's clean up after ourselves.
//         return () => {
//             console.log("href unobserve");
//             observer.unobserve(target);
//         };
//     }, [target, root, rootMargin, onIntersect, threshold]);
// };
