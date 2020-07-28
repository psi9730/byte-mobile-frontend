import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

const StyledTextField = styled(TextField)`
    /* && .MuiInputBase-input {
      color: '#fff', // Text color
    } */
    width: 100%;
    & .MuiInput-underline:before {
        border-bottom: 2px solid ${(props) => props.theme.colors.gray40} !important;
    }
    & .MuiInput-underline:hover:before {
        border-bottom: 2px solid ${(props) => props.theme.colors.purple} !important;
    }
    & .MuiInput-underline:after {
        border-bottom: 2px solid ${(props) => props.theme.colors.purple} !important;
    }
`;

export default function TextFields({
    inputRef,
    name,
    className,
    id,
    placeholder,
    ...props
}) {
    return (
        <StyledTextField
            {...props}
            inputRef={inputRef}
            name={name}
            className={className}
            id={id}
            placeholder={placeholder}
        />
    );
}
