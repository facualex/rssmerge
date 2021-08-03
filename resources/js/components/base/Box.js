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
    ${system({
        cursor: true,
    })}
`;

function BoxWrapper({ children, isLoading, ...props }) {
    return (
        <Box {...props}>
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
