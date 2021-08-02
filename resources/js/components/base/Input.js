import styled from "styled-components";
import Typography from "./Typography";
import Box from "./Box";
import {
    color,
    background,
    space,
    layout,
    border,
    shadow,
} from "styled-system";

const Input = styled.input`
    ${color}
    ${background}
  ${space}
  ${layout}
  ${border}
  ${shadow}
`;

function InputWrapper({
    type,
    placeholder = "Type here...",
    label,
    labelColor = "black",
    labelFontSize,
    ...props
}) {
    return (
        <Box flexDirection="column">
            {label ? (
                <Typography
                    fontSize={labelFontSize}
                    color={labelColor}
                    marginBottom="1"
                >
                    {label}
                </Typography>
            ) : null}
            <Input placeholder={placeholder} {...props} />
        </Box>
    );
}

export default InputWrapper;
