import styled, { keyframes } from "styled-components";
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

function Icon({ type, spin=false, ...props }) {
    const Selected = availableIcons[type] ?? null;
    const SelectedIcon = spin ? Rotatable(Selected) : Selected;

    return <SelectedIcon {...props} />
}

export default Icon;