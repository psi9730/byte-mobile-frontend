import React, { useState } from "react";
import styled from "styled-components";
import { Image } from "/components/Img";
import { ScrollBar } from "/components/Carousel";
import Slider from "react-slick";

const SlideContainer = styled.div`
    display: flex !important;
    justify-content: center;
    align-items: center;
`;

const CustomCarousel = ({
    settings,
    onClick,
    datas,
    width,
    innerWidth,
    scollBar,
    ...props
}) => {
    const [active, setActive] = useState(0);
    const [slider, setSlider] = useState();

    const beforeChange = (current, next) => setActive(next);
    return (
        <div style={{ width: width }}>
            <Slider
                ref={(slider) => setSlider(slider)}
                beforeChange={beforeChange}
                {...settings}
                {...props}
            >
                {datas.map((data) => {
                    return (
                        <SlideContainer
                            key={data.picturePath}
                            width={innerWidth}
                            onClick={() => onClick(data)}
                        >
                            <Image
                                src={data.picturePath}
                                alt={data.name}
                                imageHeight={100}
                                imageWidth={100}
                                lazy={false}
                            />
                        </SlideContainer>
                    );
                })}
            </Slider>
            {scollBar && (
                <ScrollBar
                    list={datas}
                    index={active}
                    onClick={slider && slider.slickGoTo}
                />
            )}
        </div>
    );
};
export default CustomCarousel;
