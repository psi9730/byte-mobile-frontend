import React from "react";
import styled from "styled-components";
import { Rate } from "antd";
import "antd/dist/antd.css";
const StyledRate = styled(Rate)`
    width: 100%;
    font-size: 30px;
`;
const Rank = React.forwardRef(({ label, register, onChange }, ref) => (
    <>
        <label>{label}</label>
        <StyledRate
            name={label}
            ref={ref}
            onChange={onChange}
            listItemHeight={40}
            listHeight={250}
        />
    </>
));

export default Rank;
