/* eslint-disable react/display-name */
import React, { useState } from "react"
import styled from "styled-components"
import { ScrollBar } from "/components/Carousel"
import Slider from "react-slick"

const SlideContainer = styled.div`
  display: flex !important;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.innerWidth ? props.innerWidth : "100%")};
`

const CustomCarousel = ({
  settings,
  onClick,
  datas,
  width = "100%",
  innerWidth = "100%",
  scollBar,
  ChildComponent,
  ...props
}) => {
  const [active, setActive] = useState(0)
  const [slider, setSlider] = useState()

  const beforeChange = (current, next) => setActive(next)
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
            <SlideContainer style={{ width: innerWidth }} key={data.id}>
              <ChildComponent data={data} onClick={onClick} />
            </SlideContainer>
          )
        })}
      </Slider>
      {scollBar && <ScrollBar list={datas} index={active} onClick={slider && slider.slickGoTo} />}
    </div>
  )
}
const StyledCustomCarousel = styled(CustomCarousel)`
  width: 100%;
`
export default StyledCustomCarousel
