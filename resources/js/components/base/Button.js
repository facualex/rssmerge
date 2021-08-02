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
} from "styled-system";
import Icon from "./Icon";
import Typography from "./Typography";
import Box from "./Box";

const Button = styled.div`
    ${color}
    ${background}
    ${space}
    ${layout}
    ${flexbox}
    ${border}
    ${shadow}
    ${system({
        cursor: true,
    })}
`;

function ButtonWrapper({ children, isLoading, onClick, ...props }) {
    return (
        <Button onClick={isLoading ? null : () => onClick()} {...props} cursor={isLoading ? "not-allowed" : "pointer"}>
            {isLoading ? (
                <>
                    <Icon type="loader" spin={true} size="30" color="primary" />
                    <Typography marginLeft="1" marginTop="1">Loading...</Typography>
                </>
            ) : (
                children
            )}
        </Button>
    );
}

ButtonWrapper.defaultProps = {
    display: "flex",
    cursor: "pointer",
    backgroundColor: "grey",
    border: "1px solid",
    borderColor: "primary",
    color: "primary",
    paddingX: 6,
    paddingY: 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
};

export default ButtonWrapper;
