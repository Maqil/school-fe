import { Box, Button, FormHelperText, Typography } from "@mui/material";
import { TextField } from "mui-rff";
import { styled } from "@mui/material/styles";

export const LoginBox = styled((props: any) => <Box {...props} />)(({ theme }) => ({
  marginLeft: theme.spacer_n,
  marginRight: theme.spacer_n,
  [theme.breakpoints.up("sm")]: {
    marginLeft: 0,
    marginRight: 0
  },
  "& .signin-img": {
    display: "inline-block",
    border: 'none',
    borderRadius: "2.75rem",
    width: "32rem"
  }
}));

export const LoginHeader = styled((props: any) => <Typography {...props} />)(
  ({ theme }) => ({
    marginBottom: theme.spacer_m
  })
);

export const LoginButton = styled((props: any) => <Button {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.fuchsiaAccessible.main,
    borderRadius: "27.5px",
    fontSize: "1em",
    "&:hover": {
      backgroundColor: theme.palette.fuchsiaAccessible.main
    }
    
  })
);

export const LoginTextField = styled((props: any) => <TextField {...props} />)(
  ({ theme }) => ({
    "input::-ms-reveal,input::-ms-clear": {
      display: "none"
    },
    "& .MuiInputLabel-root": {
      paddingLeft: "17px"
    },
    "& .MuiFilledInput-root": {
      overflow: "hidden",
      borderRadius: "27.5px",
      backgroundColor: theme.palette.white.main,
      marginBottom: "1em",
      "& input.MuiFilledInput-input": {
        padding: "25px 24px  8px",
        backgroundColor: `${theme.palette.white.main} !important`
      },
      "&.Mui-error input.MuiFilledInput-input": {
        color: theme.palette.error.main
      },
      "&:hover": {
        backgroundColor: theme.palette.white.main
      },
      "& .MuiIconButton-root": {
        padding: "23px",
        color: theme.palette.fuchsiaAccessible.main,
        "&:focus": {
          backgroundColor: "rgba(0, 0, 0, 0.04)"
        },
        "&:hover": {
          backgroundColor: "unset"
        },
        "& .MuiSvgIcon-root": {
          fontSize: "20px"
        }
      }
    },
    "& .MuiFormHelperText-root.Mui-error": {
      padding: "12px",
      fontSize: "1.3rem",
      borderRadius: "8px",
      color: theme.palette.white.main,
      backgroundColor: theme.palette.fuchsiaAccessible.main,
      marginBottom: "1em",
      position: "relative",
      span: {
        display: "block"
      },
      "&:before": {
        content: '""',
        width: 0,
        height: 0,
        position: "absolute",
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        borderBottom: `10px solid ${theme.palette.fuchsiaAccessible.main}`,
        top: "-10px",
        marginLeft: "40px"
      }
    }
  })
);

export const LoginLink = styled((props: any) => <Typography {...props} />)(
  () => ({
    fontWeight: "bold",
    textDecoration: "none"
  })
);

export const LoginErrorHelperText = styled((props: any) => (
  <FormHelperText {...props} />
))(({ theme }) => ({
  padding: "12px",
  fontSize: "1.3rem",
  borderRadius: "8px",
  color: theme.palette.common.white,
  backgroundColor: theme.palette.fuchsiaAccessible.main,
  marginBottom: "1em",
  position: "relative",
  span: {
    display: "block"
  },
  "&:before": {
    content: '""',
    width: 0,
    height: 0,
    position: "absolute",
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderTop: `10px solid ${theme.palette.fuchsiaAccessible.main}`,
    bottom: "-10px",
    marginLeft: "40px"
  }
}));

export const CheckBoxWrapper = styled((props: any) => <Box {...props} />)(
  ({ theme }) => ({
    "& .MuiFormControlLabel-root": {
      alignItems: "start",
      marginBottom: theme.spacer_m,
      "& .MuiFormControlLabel-label": {
        lineHeight: "3.3rem"
      }
    },
    "& input": {
      backgroundColor: "white"
    }
  })
);
export const FormFieldsWrapperdiv = styled("div")(({ theme }) => ({
  flex: "0 0 100%",
  flexFlow: "row wrap",
  "& .btn-cancel": {
    float: "right"
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiButton-root": {
      width: "100%",
      marginTop: "1.2em"
    }
  }
}));
export const FormWrapperdiv = styled("div")(({ theme }) => ({
  flex: "0 0 100%",
  flexFlow: "row wrap",

  [theme.breakpoints.down("sm")]: {
    "& .MuiButton-root": {
      width: "100%",
      marginBottom: "1.2em"
    },
    "& .btn-back-login": {
      marginLeft:"1rem"
    }
  }
}));
