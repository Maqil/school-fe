import { styled } from "@mui/material/styles";
export const ActionItem = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "row wrap",
  alignItems: "flex-start",
  "& .action-details-item": {
    "& a": {
      color: "#e10993",
      fontSize: "1.3rem",
      fontWeight: "700"
    },
    "& .shipment-action-icon": {
      paddingLeft: "0.5rem",

      "& i": {
        fontSize: "1.8rem",
        padding: "0.4rem"
      }
    },

    display: "flex",
    flex: "0 0 100%",
    color: theme.palette.fuchsiaAccessible.main
  }
}));
