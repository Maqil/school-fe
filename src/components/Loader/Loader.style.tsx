import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

export const LoaderContent = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  "& img": {
    width: "50%",
    animation: `${rotation} 2s infinite linear`
  }
});
