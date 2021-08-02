import styled from "styled-components";
import { color, space, layout, typography } from "styled-system";

const Typography = styled.div`
    ${typography}
    ${color}
  ${space}
  ${layout}
`;

const H1 = styled(Typography)`
    font-size: ${({ theme, fontSize }) =>
        fontSize ?? `${theme.fontSizes[5]}px`};
`;

const H2 = styled(Typography)`
    font-size: ${({ theme, fontSize }) =>
        fontSize ?? `${theme.fontSizes[4]}px`};
`;

const H3 = styled(Typography)`
    font-size: ${({ theme, fontSize }) =>
        fontSize ?? `${theme.fontSizes[3]}px`};
`;

const H4 = styled(Typography)`
    font-size: ${({ theme, fontSize }) =>
        fontSize ?? `${theme.fontSizes[2]}px`};
`;

const H5 = styled(Typography)`
    font-size: ${({ theme, fontSize }) =>
        fontSize ?? `${theme.fontSizes[1]}px`};
`;

const Text = styled(Typography)`
    font-size: ${({ theme, fontSize }) =>
        fontSize ?? `${theme.fontSizes[0]}px`};
`;

const AvailableTypography = {
    H1,
    H2,
    H3,
    H4,
    H5,
    text: Text,
};

function TypographyWrapper({ type = "text", children, ...props }) {
    const ChosenTypography =
        AvailableTypography[type] ?? AvailableTypography["text"];

    return <ChosenTypography {...props}>{children}</ChosenTypography>;
}

export default TypographyWrapper;
