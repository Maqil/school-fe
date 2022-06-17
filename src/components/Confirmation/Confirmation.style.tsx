import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ConfirmationBox = styled((props: any) => <Box {...props} />)(
  ({ theme }) => ({
    marginTop: "8rem",
    marginLeft: theme.spacer_n,
    marginRight: theme.spacer_n,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      margin: 0
    }
  })
);

export const ConfirmationHeader = styled((props: any) => (
  <Typography {...props} />
))(({ theme }) => ({
  fontSize: "7rem",
  fontWeight: "bold",
  letterSpacing: "normal",
  lineHeight: "7.8rem",
  marginBottom: theme.spacer_m,
  [theme.breakpoints.down("sm")]: {
    marginBottom: "2rem",
    fontSize: "5rem",
    lineHeight: "5rem"
  }
}));


export const HomeButton = styled((props: any) => <Button {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.fuchsiaAccessible.main,
    borderRadius: "27.5px",
    marginTop: "3rem",
    fontSize: "1.6rem",
    "&:hover": {
      backgroundColor: theme.palette.fuchsiaAccessible.main
    }
  })
);
