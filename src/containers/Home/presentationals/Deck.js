import React, { useState, useRef, useEffect } from "react";
import { useSprings, animated, interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";
import { useDrag } from "react-use-gesture";
import { CardB, CardA } from "/containers/Home/presentationals";
import { useLocalStorage } from "/hooks";
import { transform } from "typescript";
// These two are just helpers, they curate spring data, values that are later being interpolated into css
const height = 2000;
const maxLength = 200;
const UP = -1;
const DOWN = 1;
const range = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
    );
const trans = (r, s) => `perspective(1500px) scale(${s})`;

const Deck = ({ datas }) => {
    const [name, setName] = useLocalStorage("name", "Bob");

    const [upperList] = useState(() => new Set()); // The set flags all the cards that are flicked out
    const [underList] = useState(() => new Set(range(1, datas.length, 1))); // The set flags all the cards that are flicked out

    const [innitialHeight, setHeight] = useState(0);
    const ref = useRef(null);
    const from = (i) => ({ x: 0, y: 0, heightIndex: i, scale: 1 });
    const to = (i) => ({
        x: 0,
        y: 0,
        heightIndex: i,
        scale: 1,
        delay: i * 100,
    });
    useEffect(() => {
        setHeight(ref.current.clientHeight);
    }, []);
    const [cardIndex, setCardIndex] = useState(0);
    const onClickLink = (url) => {
        window.location.href = url;
    };
    useEffect(() => {
        set((i) => {
            if (underList.has(i)) {
                if (Math.min(...Array.from(underList.values())) === i) {
                    const y = 0;
                    const heightIndex = i - cardIndex;
                    const scale = 1;
                    const opacity = 1;
                    return { y, scale, opacity, heightIndex };
                } else {
                    const y = 0;
                    const heightIndex = i - cardIndex;
                    const scale = 1;
                    const opacity = 1;
                    return { y, scale, opacity, heightIndex };
                }
            } else if (upperList.has(i)) {
                const heightIndex = 0;
                const scale = 0.7;
                const opacity = 0;
                const y = 0;
                return { scale, opacity, heightIndex, y };
            } else {
                const scale = 1;
                const opacity = 1;
                const y = 0;
                const heightIndex = i - cardIndex;
                return { scale, y, opacity, heightIndex };
            }
        });
    }, [cardIndex, set, underList, upperList]);
    const [props, set] = useSprings(datas.length, (i) => ({
        ...to(i),
        from: from(i),
    })); // Create a bunch of springs using the helpers above
    // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
    const bind = useDrag(({ down, movement: [, my], velocity }) => {
        const dir = my < 0 ? -1 : 1; // Direction should either point up or down
        const upper = (velocity > 0.2 && dir === -1) || my < -200; // If you flick hard enough it should trigger the card to fly out
        const under = (velocity > 0.2 && dir === 1) || my > 200;
        const customMy =
            my > innitialHeight
                ? innitialHeight
                : my < -innitialHeight
                ? -innitialHeight
                : my;
        // const upper = my < -100; // If you flick hard enough it should trigger the card to fly out
        // const under = my > 100;

        if (!down && under && cardIndex !== 0) {
            underList.add(cardIndex); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
            upperList.delete(cardIndex - 1);
            setCardIndex(cardIndex - 1);
        }
        if (!down && upper && cardIndex !== datas.length - 1) {
            underList.delete(cardIndex + 1); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
            upperList.add(cardIndex);
            setCardIndex(cardIndex + 1);
        }

        set((i) => {
            // if (index !== i) return; // We're only interested in changing spring-data for the current spring
            if (down) {
                if (dir === UP && cardIndex !== datas.length - 1) {
                    if (i === cardIndex) {
                        const opacity = 1 + customMy / height;
                        const scale = 1 + customMy / height;
                        // const y = cardIndex - i;
                        return { opacity, scale };
                    } else if (i >= cardIndex + 1) {
                        // const y = `calc(${100 * (i - cardIndex)}% + ${my}px)`;
                        // const y = `${height * (i - cardIndex) + my}px`;
                        const y = customMy;
                        return { y };
                    } else {
                        const opacity = 0;
                        const y = 0;
                        const scale = 1 + customMy / height;
                        // const y = cardIndex - i;
                        return { opacity, scale };
                    }
                } else if (dir === DOWN && cardIndex !== 0) {
                    if (i >= cardIndex) {
                        const y = customMy;
                        return { y };
                    } else if (i === cardIndex - 1) {
                        const opacity = (1 + customMy / height) / 3;
                        const scale = (1 + customMy / height) / 1.5;
                        return { opacity, scale };
                    } else {
                        const opacity = 0;
                        const scale = 0.7;
                        return { opacity, scale };
                    }
                }
            }
            if (underList.has(i)) {
                if (Math.min(...Array.from(underList.values())) === i) {
                    const y = 0;
                    const heightIndex = i - cardIndex;
                    const scale = 1;
                    const opacity = 1;
                    return { y, scale, opacity, heightIndex };
                }
            } else if (upperList.has(i)) {
                // const heightIndex = 0;
                // const scale = 0.7;
                // const opacity = 0;
                // const y = 0;
                // return { scale, opacity, heightIndex, y };
            } else {
                const scale = 1;
                const opacity = 1;
                const y = 0;
                return { scale, opacity, y };
            }
        });
    });
    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    return props.map(({ x, y, heightIndex = 0, scale, opacity, zIndex }, i) => {
        return (
            <animated.div
                key={i}
                ref={ref}
                style={{
                    zIndex: i,
                    scale,
                    transform: interpolate(
                        [x, y, heightIndex],
                        (x, y, heightIndex) =>
                            `translate3d(${x},${
                                y + heightIndex * innitialHeight < 0
                                    ? 0
                                    : y + heightIndex * innitialHeight
                            }px,0)`
                    ),
                    opacity,
                    width: "100%",
                    paddingTop: "164%",
                    position: "absolute",
                    willChange: transform,
                }}
            >
                {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
                <animated.div
                    {...bind(i)}
                    style={{
                        transform: interpolate([heightIndex, scale], trans),
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        marginBottom: "20px",
                    }}
                >
                    {datas[i].type === "A" && (
                        <CardA
                            data={{
                                id: datas[i].id,
                                category: datas[i].category.category_name_kr,
                                title: datas[i].title,
                                description: datas[i].description,
                                original_article_url:
                                    datas[i].original_article_url,
                                image_url: datas[i].vertical_image_url,
                            }}
                            filter={"brightness(50%)"}
                            onClickLink={onClickLink}
                            boxShadow="0 12px 24px 0 rgba(0, 0, 0, 0.32)"
                        />
                    )}
                    {datas[i].type === "B" && (
                        <CardB
                            data={{
                                id: datas[i].id,
                                category: datas[i].category,
                                title: datas[i].title,
                                description: datas[i].description,
                                original_article_url:
                                    datas[i].original_article_url,
                                image_url: datas[i].square_image_url,
                            }}
                            onClickLink={onClickLink}
                            filter={"brightness(50%)"}
                            boxShadow="0 12px 24px 0 rgba(0, 0, 0, 0.32)"
                            backgroundColor="white"
                        />
                    )}
                </animated.div>
            </animated.div>
        );
    });
};

export default Deck;
