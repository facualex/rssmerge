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
    flexbox
} from "styled-system";

const Input = styled.input`
    ${color}
    ${background}
  ${space}
  ${layout}
  ${border}
  ${shadow}

  &:focus {
      outline-style: none;
      outline-color: ${({outlineFocusColor, theme}) => outlineFocusColor ? `${theme.colors[outlineFocusColor]} !important;`: null}
  }
`;

function InputWrapper({
    type,
    placeholder = "Type here...",
    label,
    labelColor = "white",
    labelFontSize,
    onChange,
    value,
    name,
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    width,
    outlineFocusColor = "primary",
    ...props
}) {
    return (
        <Box
            flexDirection="column"
            width={width}
            margin={margin}
            marginBottom={marginBottom}
            marginRight={marginRight}
            marginLeft={marginLeft}
            marginTop={marginTop}
        >
            {label ? (
                <Typography
                    fontSize={labelFontSize}
                    color={labelColor}
                    marginBottom="1"
                >
                    {label}
                </Typography>
            ) : null}
            <Input
                type={type}
                value={value}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                width="100%"
                {...props}
            />
        </Box>
    );
}

InputWrapper.defaultProps = {
    paddingX: 4,
    paddingY: 3,
    border: "1px solid",
    borderColor: "primary",
    backgroundColor: "darkGrey",
    color: "white",
    borderRadius: 3,
};

export default InputWrapper;
