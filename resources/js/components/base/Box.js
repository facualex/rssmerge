import styled from "styled-components";
import {
    color,
    background,
    space,
    layout,
    flexbox,
    border,
    shadow,
    system,
    grid,
    position,
} from "styled-system";
import Icon from "./Icon";
import Typography from "./Typography";

const Box = styled.div`
    ${color}
    ${background}
    ${space}
    ${layout}
    ${flexbox}
    ${border}
    ${shadow}
    ${grid}
    ${position}
    ${system({
        cursor: true,
        visibility: true,
    })}

    transition: all 0.3s;

     &:hover {
        background-color: ${({ hoverProps, theme }) =>
            hoverProps?.backgroundColor
                ? theme.colors[hoverProps.backgroundColor]
                : null};
    }
`;

function BoxWrapper({ children, isLoading, hoverProps, innerRef, ...props }) {
    return (
        <Box hoverProps={hoverProps} ref={innerRef} {...props}>
            {isLoading ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    height="100%"
                    cursor="not-allowed"
                >
                    <Icon type="loader" spin={true} size="30" color="white" />
                    <Typography marginTop="1">Loading...</Typography>
                </Box>
            ) : (
                children
            )}
        </Box>
    );
}

BoxWrapper.defaultProps = {
    display: "flex",
    width: "100%",
};

export default BoxWrapper;
