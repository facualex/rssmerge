import styled, { keyframes, useTheme } from "styled-components";
import { FiLoader } from "react-icons/fi";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

function Rotatable(Element) {
    return styled(Element)`
        animation: ${rotate} 2.8s linear infinite;
    `
}

const availableIcons = {
    loader: FiLoader,
}

function Icon({ type, spin = false, color, ...props }) {
    const theme = useTheme();

    const Selected = availableIcons[type] ?? null;
    const RotatableSelectedIcon = Rotatable(Selected); 

    return spin ? <RotatableSelectedIcon color={color ? theme.colors[color] : 'black'} {...props} /> : <Selected {...props} />
}

export default Icon;