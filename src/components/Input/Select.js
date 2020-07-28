import React from "react";
import styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Controller } from "react-hook-form";

const StyledSelectField = styled(Select)`
    /* && .MuiInputBase-input {
      color: '#fff', // Text color
    } */

    width: 100%;
    &:before {
        border-bottom: 2px solid ${(props) => props.theme.colors.gray40} !important;
    }
    &:hover:before {
        border-bottom: 2px solid ${(props) => props.theme.colors.purple} !important;
    }
    &:after {
        border-bottom: 2px solid ${(props) => props.theme.colors.purple} !important;
    }
`;

const CustomSelect = ({
    control,
    name,
    className,
    id,
    placeholder,
    datas,
    ...props
}) => {
    return (
        <Controller
            as={
                <StyledSelectField
                    key={datas[0]["key"]}
                    defaultValue={datas[0]["value"]}
                    id={id}
                    className={className}
                    {...props}
                >
                    {datas.map((data) => (
                        <MenuItem key={data.value} value={data.value}>
                            {data.key}
                        </MenuItem>
                    ))}
                </StyledSelectField>
            }
            name="phone_front"
            rules={{ required: "this is required" }}
            control={control}
            defaultValue=""
        />
    );
};
export default CustomSelect;
