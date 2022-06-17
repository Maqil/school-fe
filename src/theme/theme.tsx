import { createTheme, alpha } from "@mui/material/styles";
import { ExpandMore } from "@mui/icons-material";

const breakpoints = {
  values: {
    xs: 0,
    sm: 768,
    md: 1025,
    lg: 1230,
    xl: 1920
  }
};

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    display1: true;
    display2: true;
    display3: true;
    sectionTitle: true;
    lead: true;
  }
}

declare module "@mui/material/styles/createTheme" {
  interface Theme {
    spacer_xs: string;
    spacer_s: string;
    spacer_n: string;
    spacer_m: string;
    spacer_l: string;
    spacer_xxl: string;
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    spacer_xs?: string;
    spacer_s?: string;
    spacer_n?: string;
    spacer_m?: string;
    spacer_l?: string;
    spacer_xxl?: string;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    fuchsia: Palette["primary"];
    fuchsiaAccessible: Palette["primary"];
    fuchsiaLight: Palette["primary"];
    blue: Palette["primary"];
    blueLight: Palette["primary"];
    violet: Palette["primary"];
    violetLight: Palette["primary"];
    purple: Palette["primary"];
    white: Palette["primary"];
    black: Palette["primary"];
    ochre: Palette["primary"];
    eggShell: Palette["primary"];
    disabled: Palette["primary"];
    backdrop: Palette["primary"];
    sideBackdrop: Palette["primary"];
  }
  interface PaletteOptions {
    fuchsia: Palette["primary"];
    fuchsiaAccessible: Palette["primary"];
    fuchsiaLight: Palette["primary"];
    blue: Palette["primary"];
    blueLight: Palette["primary"];
    violet: Palette["primary"];
    violetLight: Palette["primary"];
    purple: Palette["primary"];
    white: Palette["primary"];
    black: Palette["primary"];
    ochre: Palette["primary"];
    eggShell: Palette["primary"];
    disabled: Palette["primary"];
    backdrop: Palette["primary"];
    sideBackdrop: Palette["primary"];
  }
}

let baseTheme = createTheme({ breakpoints });
let { palette } = createTheme();

let theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: "62.5%",
          height: "100%"
        },
        body: {
          height: "100%"
        }
      }
    }
  },
  spacer_xs: "0.2rem",
  spacer_s: "0.8rem",
  spacer_n: "1.6rem",
  spacer_m: "2.4rem",
  spacer_l: "4rem",
  spacer_xxl: "10.4rem",
  breakpoints,
  typography: {
    fontFamily: ["OpenSans", "Arial"].join(","),
    display1: {
      fontSize: "4.4em",
      fontWeight: "bold",
      letterSpacing: "normal",
      lineHeight: 1.1,
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "7.2rem",
        letterSpacing: "-1px"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "10em",
        letterSpacing: "-2px"
      }
    },
    display2: {
      fontSize: "2.4em",
      fontWeight: "bold",
      letterSpacing: "normal",
      lineHeight: 1.1,
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "4.5rem"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "5rem"
      }
    },
    display3: {
      fontSize: "3.2em",
      fontWeight: "bold",
      letterSpacing: "normal",
      lineHeight: 1.1,
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "3.6rem"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "4em"
      }
    },
    h1: {
      fontSize: "4rem",
      fontWeight: "bold",
      letterSpacing: "normal",
      lineHeight: 1.1,
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "6rem",
        letterSpacing: "-1px"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "8rem",
        letterSpacing: "-2px"
      }
    },
    h2: {
      fontSize: "2.4rem",
      fontWeight: "bold",
      letterSpacing: "normal",
      lineHeight: 1.2,
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "2.8rem"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "3.2rem"
      }
    },
    h3: {
      fontSize: "2rem",
      fontWeight: "bold",
      letterSpacing: "normal",
      lineHeight: 1.2,
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "2.3rem"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "2.6rem"
      }
    },
    h4: {
      fontSize: "1.6rem",
      fontWeight: "bold",
      letterSpacing: "normal",
      lineHeight: 1.2,
      [baseTheme.breakpoints.up("sm")]: {
        fontSize: "1.8rem"
      },
      [baseTheme.breakpoints.up("md")]: {
        fontSize: "2rem"
      }
    },
    subtitle1: {
      fontSize: "1.4rem"
    },
    lead: {
      fontSize: "2rem",
      fontWeight: "normal",
      letterSpacing: "normal",
      lineHeight: 1.7
    },
    sectionTitle: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      letterSpacing: "normal",
      lineHeight: "2.3rem"
    },
    body1: {
      fontSize: "1.6rem",
      fontWeight: "normal",
      letterSpacing: "normal",
      lineHeight: 1.7
    },
    caption: {
      fontSize: "1.2rem",
      fontWeight: "normal",
      letterSpacing: "normal",
      lineHeight: 1.7
    }
  } as any,
  palette: {
    primary: {
      main: "#e10993"
    },
    secondary: {
      main: "#3241BE"
    },
    background: {
      paper: "#f7f7fc",
      default: "#f7f7fc"
    },
    text: {
      primary: "#1D1C1D"
    },
    success: {
      main: "#25b830"
    },
    error: {
      main: "#E90C43"
    },
    action: {
      disabled: "#FFFFFF",
      disabledBackground: "#C2C4D6"
    },
    fuchsia: palette.augmentColor({
      color: {
        main: "#f50aa0"
      }
    }),
    fuchsiaAccessible: palette.augmentColor({
      color: {
        main: "#e10993"
      }
    }),
    fuchsiaLight: palette.augmentColor({
      color: {
        main: "#fef0f9"
      }
    }),
    blue: palette.augmentColor({
      color: {
        main: "#3241BE"
      }
    }),
    blueLight: palette.augmentColor({
      color: {
        main: "#f0f1ff"
      }
    }),
    violet: palette.augmentColor({
      color: {
        main: "#7d32ad"
      }
    }),
    violetLight: palette.augmentColor({
      color: {
        main: "#f9f0ff"
      }
    }),
    purple: palette.augmentColor({
      color: {
        main: "#c823be"
      }
    }),
    white: palette.augmentColor({
      color: {
        main: "#FFFFFF"
      }
    }),
    black: palette.augmentColor({
      color: {
        main: "#1d1c1d"
      }
    }),
    ochre: palette.augmentColor({
      color: {
        main: "#ffca6a"
      }
    }),
    eggShell: palette.augmentColor({
      color: {
        main: "#fffaf0"
      }
    }),
    disabled: palette.augmentColor({
      color: {
        main: "#c2c4d6"
      }
    }),
    backdrop: palette.augmentColor({
      color: {
        main: "rgba(39, 0, 64, 0.8)"
      }
    }),
    sideBackdrop: palette.augmentColor({
      color: {
        main: "#f0f3ff"
      }
    })
  } as any
});

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    section: true;
  }
}

theme = createTheme(theme, {
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          "& .PrivatePickersToolbar-root": {
            "& .MuiTypography-overline": {
              color: theme.palette.black.main,
              textTransform: "none",
              fontSize: "1.4rem"
            },
            "& .PrivatePickersToolbar-dateTitleContainer": {
              "& .MuiTypography-root": {
                textTransform: "capitalize",
                color: theme.palette.black.main,
                fontSize: "1.4rem",
                "&.Mui-selected": {
                  color: theme.palette.fuchsiaAccessible.main,
                  backgroundColor: theme.palette.fuchsiaLight.main
                }
              }
            }
          }
        }
      },
      variants: [
        {
          props: { variant: "section" },
          style: {
            backgroundColor: theme.palette.white.main,
            borderRadius: "0.8rem",
            padding: "1.8rem 1.6rem",
            marginBottom: theme.spacer_m,
            boxShadow: `0px 2px 4px 0px ${alpha(theme.palette.blue.main, 0.1)}`
          }
        }
      ]
    },
    MuiAccordion: {
      defaultProps: {
        elevation: 0
      }
    },
    MuiDateRangePickerDay: {
      styleOverrides: {
        root: {
          "&.MuiDateRangePickerDay-rangeIntervalDayHighlight": {
            backgroundColor: alpha(theme.palette.fuchsiaAccessible.main, 0.1)
          },
          "& .MuiDateRangePickerDay-dayInsideRangeInterval": {
            color: theme.palette.black.main,
            fontWeight: 500
          }
        }
      }
    },
    MuiInputLabel: {
      variants: [
        {
          props: { variant: "standard" },
          style: {
            color: theme.palette.black.main,
            fontSize: "1.6rem",
            fontWeight: "700",
            "&.Mui-focused:not(.Mui-error)": {
              color: theme.palette.black.main
            },
            "&.MuiInputLabel-shrink": {
              fontWeight: 400,
              fontSize: "2.13rem"
            },
            "&[data-shrink=false]+.MuiInputBase-formControl .MuiInputBase-input-MuiInput-input":
              {
                "&:before": {
                  borderBottom: `0.6rem solid red`
                },
                "&:after": {
                  borderBottom: `0.6rem solid green`
                }
              },
            "&.MuiInputLabel-shrink + .MuiInput-root": {
              "&:before": {
                borderBottom: `0.2rem solid ${theme.palette.fuchsiaAccessible.main}`
              }
            }
          }
        }
      ]
    },
    MuiTextField: {
      defaultProps: {
        variant: "standard",
        fullWidth: true
      },
      variants: [
        {
          props: { variant: "standard" },
          style: {
            "& .MuiInput-root": {
              color: theme.palette.black.main,
              fontSize: "1.6rem",
              fontWeight: "700",
              "&:before": {
                borderBottom: `0.2rem solid ${theme.palette.black.main}`
              },
              "&.Mui-disabled": {
                "&:before": {
                  borderBottom: `0.2rem solid ${theme.palette.disabled.main}`
                }
              },
              "&.Mui-focusVisible, &.Mui-active": {
                "&:after": {
                  borderBottom: `0.2rem solid ${theme.palette.blue.main}`
                }
              },
              "& .MuiSelect-select": {
                "&:focus": {
                  backgroundColor: "transparent"
                }
              }
            }
          }
        }
      ]
    },
    MuiSelect: {
      defaultProps: {
        variant: "standard",
        IconComponent: ExpandMore
      }
    },
    MuiButton: {
      defaultProps: {
        disableFocusRipple: true,
        disableElevation: true
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            backgroundColor: theme.palette.white.main,
            textTransform: "none",
            fontSize: "1.6rem",
            fontWeight: "700",
            color: theme.palette.fuchsiaAccessible.main,
            border: `0.1rem solid ${theme.palette.fuchsiaAccessible.main}`,
            borderRadius: "2.75rem",
            lineHeight: "2.3rem",
            padding: "1.5rem 4rem",
            "&.Mui-disabled": {
              color: theme.palette.disabled.main
            },
            "&:hover": {
              backgroundColor: theme.palette.white.main,
              boxShadow: `0 0 0.5rem ${theme.palette.fuchsia.main}`,
              border: `0.1rem solid ${theme.palette.fuchsiaAccessible.main}`
            },
            "&.Mui-focusVisible, &.Mui-active": {
              boxShadow: `0 0 0.5rem ${theme.palette.white.main}`,
              outlineOffset: "0.2rem",
              outline: `0.2rem solid ${theme.palette.blue.main}`
            },
            "& .MuiTouchRipple-child": {
              backgroundColor: theme.palette.fuchsia.main
            }
          }
        },
        {
          props: { variant: "outlined", size: "small" },
          style: {
            lineHeight: "2.2rem",
            padding: "0.7rem 4rem"
          }
        },
        {
          props: { variant: "contained" },
          style: {
            backgroundColor: theme.palette.fuchsiaAccessible.main,
            textTransform: "none",
            fontSize: "1.6rem",
            fontWeight: "700",
            color: theme.palette.white.main,
            border: `0.1rem solid ${theme.palette.fuchsiaAccessible.main}`,
            borderRadius: "2.75rem",
            lineHeight: "2.3rem",
            padding: "1.5rem 4rem",
            "&.Mui-disabled": {
              border: `0.1rem solid ${theme.palette.disabled.main}`
            },
            "&:hover": {
              backgroundColor: theme.palette.fuchsiaAccessible.main,
              boxShadow: `0 0 0.5rem ${theme.palette.white.main}`,
              border: `0.1rem solid ${theme.palette.fuchsiaAccessible.main}`
            },
            "&.Mui-focusVisible, &.Mui-active": {
              boxShadow: `0 0 0.5rem ${theme.palette.fuchsia.main}`,
              outlineOffset: "0.2rem",
              outline: `0.2rem solid ${theme.palette.blue.main}`
            }
          }
        }
      ]
    },
    MuiTab: {
      defaultProps: {
        disableFocusRipple: true
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          fontSize: "1.6rem",
          marginBottom: theme.spacer_m
        }
      }
    }
  }
});

export default theme;
