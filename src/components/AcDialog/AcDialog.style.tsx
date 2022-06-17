import { styled } from "@mui/material/styles";
import { Dialog } from "@mui/material";

export const DialogStyle = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    padding: "1.6rem",
    backgroundColor: theme.palette.white.main,
    textAlign: "center"
  },
  "& .MuiSvgIcon-root": {
    fontSize: "6rem",
    marginBottom: theme.spacer_m
  },
  "& .dialog-title": {
    marginBottom: theme.spacer_m
  },
  "& .dialog-text": {
    marginBottom: theme.spacer_m
  }
}));
