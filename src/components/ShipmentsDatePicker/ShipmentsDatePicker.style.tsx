import { styled, alpha } from "@mui/material/styles";

export const DatePickerStyle = styled("div")(({ theme }) => ({
  flex: "0 0 100%",
  position: "relative",
  [theme.breakpoints.up("sm")]: {
    flex: "0 0 calc(100% * 2/3 - 2rem * 2/3)"
  },
  [theme.breakpoints.up("md")]: {
    flex: "0 0 34.5rem",
    maxWidth: "34.5rem"
  },
  "& .date-range-mobile": {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  "& .date-range-desktop": {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block"
    }
  },
  "& .MuiFormControl-root": {
    "&:first-of-type": {
      marginRight: "1rem"
    }
  },
  "& .date-range-label": {
    fontWeight: 400,
    fontSize: "1.6rem",
    color: theme.palette.black.main,
    position: "absolute",
    left: "5px",
    top: "-5px",
    zIndex: 10,
    pointerEvents: "none"
  },
  "& .date-range-custom": {
    width: "100%",
    "& .rs-picker-toggle": {
      "&.rs-picker-toggle-active": {
        boxShadow: `0 0 5px ${theme.palette.blue.main}`
      },
      "& .rs-picker.rs-picker-focused": {
        boxShadow: `0 0 5px ${theme.palette.fuchsia.main}`
      }
    },
    "&.rs-picker-date": {
      "& .rs-picker-toggle": {
        "&.rs-btn-lg": {
          borderBottom: `2px solid ${theme.palette.fuchsiaAccessible.main}`,
          borderRadius: "0",
          padding: "2.1rem 4.2rem 0.3rem 0.5rem"
        }
      }
    },
    "&.rs-picker-daterange": {
      "& .rs-picker-toggle": {
        "&.rs-btn-lg": {
          borderBottom: `2px solid ${theme.palette.fuchsiaAccessible.main}`,
          borderRadius: "0",
          padding: "2.1rem 4.2rem 0.3rem 0.5rem",
          "& .rs-picker-toggle-caret": {
            right: "8px",
            top: "18px",
            width: "auto",
            height: "22px",
            lineHeight: "2.3rem",
            color: theme.palette.fuchsiaAccessible.main
          },
          "& .rs-picker-toggle-textbox": {
            padding: "2rem 4.2rem 0.3rem 0.4rem",
            background: theme.palette.blueLight.main,
            fontWeight: 700,
            fontSize: "1.6rem",
            lineHeight: "2.3rem",
            color: theme.palette.black.main
            //border: "0",
            //outline: "0"
          }
        }
      }
    },
    "&.rs-picker-has-value": {
      "& .rs-btn": {
        "& .rs-picker-toggle-value": {
          color: theme.palette.black.main,
          fontWeight: 700,
          fontSize: "1.6rem",
          lineHeight: "2.3rem"
        }
      },
      "& .rs-picker-toggle": {
        color: theme.palette.black.main,
        fontWeight: 700,
        fontSize: "1.6rem",
        lineHeight: "2.3rem"
      }
    }
  },
  "& .calendar-container": {
    position: "relative",
    color: theme.palette.black.main,
    "& .rs-picker-daterange-menu": {
      width: "100%",
      maxWidth: "34.5rem",
      "& .rs-calendar": {
        height: "313px"
      },
      "& .rs-calendar-month-dropdown-list": {
        width: "265px"
      },
      "& .rs-picker-daterange-panel-show-one-calendar": {
        "& .rs-picker-toolbar": {
          maxWidth: "100%",
          display: "flex",
          justifyContent: "space-between"
        },
        ".rs-picker-toolbar-ranges": {
          width: "185px",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-between",
          flex: "0 0 185px",
          "&:before": {
            fontSize: "1.4rem",
            color: theme.palette.black.main,
            width: "100%",
            display: "inline-block",
            height: "20px",
            flex: "0 0 100%"
          }
        },
        "& .rs-picker-toolbar-right": {
          flex: "1 1 auto",
          textAlign: "right"
        }
      }
    },
    "& .rs-btn-icon.rs-btn-xs": {
      padding: "2px 4px",
      "& >.rs-icon": {
        fontSize: "22px",
        color: theme.palette.black.main
      }
    },
    "& .rs-calendar-header-title": {
      fontSize: "1.4rem",
      color: theme.palette.black.main,
      textIndent: "-25px",
      textTransform: "capitalize"
    },
    "& .rs-picker-menu": {
      "& .rs-calendar": {
        "& .rs-calendar-month-dropdown-scroll": {
          height: "265px"
        },
        "& .rs-calendar-table-cell": {
          "&:hover": {
            "& .rs-calendar-table-cell-content": {
              backgroundColor: theme.palette.fuchsiaAccessible.main,
              color: theme.palette.white.main
            }
          }
        },
        "& .rs-calendar-table-header-row": {
          "& .rs-calendar-table-cell": {
            "& .rs-calendar-table-cell-content": {
              color: alpha(theme.palette.black.main, 0.9),
              fontWeight: 400
            },
            "&:hover": {
              "& .rs-calendar-table-cell-content": {
                backgroundColor: "transparent"
              }
            }
          }
        },
        "& .rs-calendar-month-dropdown-cell-content": {
          width: "100%",
          height: "35px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        "& .rs-calendar-table-cell-content": {
          width: "100%",
          height: "35px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700
        },
        "& .rs-calendar-table-cell-selected": {
          "& .rs-calendar-table-cell-content": {
            backgroundColor: theme.palette.fuchsiaAccessible.main,
            borderRadius: "0.5rem",
            "&:before": {
              backgroundColor: theme.palette.fuchsiaLight.main,
              height: "36px",
              marginTop: "1px"
            }
          }
        },
        "& .rs-calendar-table-cell-in-range": {
          "&:before": {
            backgroundColor: theme.palette.fuchsiaLight.main,
            height: "36px",
            marginTop: "1px"
          }
        },
        "& .rs-calendar-table-cell-is-today": {
          "& .rs-calendar-table-cell-content": {
            boxShadow: "none"
          }
        },
        "& .rs-calendar-table-cell-disabled": {
          "& .rs-calendar-table-cell-content": {
            color: alpha(theme.palette.black.main, 0.7),
            backgroundColor: alpha(theme.palette.disabled.main, 0.4),
            textDecoration: "none",
            borderRadius: 0
          },
          "&:hover": {
            "& .rs-calendar-table-cell-content": {
              color: alpha(theme.palette.black.main, 0.7),
              backgroundColor: alpha(theme.palette.disabled.main, 0.4),
              textDecoration: "none"
            }
          }
        },
        "& .rs-calendar-table-cell-un-same-month": {
          "& .rs-calendar-table-cell-content": {
            color: alpha(theme.palette.black.main, 0.7),
            borderRadius: 0,
            fontWeight: 400,
            visibility: "hidden"
          },
          "&:hover": {
            "& .rs-calendar-table-cell-content": {
              borderRadius: "0.5rem",
              color: theme.palette.white.main
            }
          }
        }
      }
    },
    "& .rs-picker-toolbar": {
      "& .rs-btn": {
        fontSize: "1.4rem",
        fontWeight: 400,
        color: theme.palette.fuchsiaAccessible.main,
        padding: "5px",
        flex: "0 0 calc(1/3)",
        textAlign: "center",
        "&:first-of-type": {
          marginLeft: "-4px"
        }
      },
      "& .rs-btn-primary": {
        fontSize: "1.6rem",
        fontWeight: 700,
        color: theme.palette.fuchsiaAccessible.main,
        backgroundColor: theme.palette.white.main,
        border: `0.1rem solid ${theme.palette.fuchsiaAccessible.main}`,
        borderRadius: "2.75rem",
        padding: "11px 23px 12px",
        "&.rs-btn-disabled": {
          opacity: "1",
          backgroundColor: theme.palette.disabled.main,
          color: theme.palette.white.main,
          borderColor: theme.palette.disabled.main
        }
      }
    }
  },
  ".rs-picker-toolbar-ranges": {
    "&:before": {
      content: "'Within the last'"
    }
  },
  "&[data-lang='fr']": {
    ".rs-picker-toolbar-ranges": {
      "&:before": {
        content: "'Derniers...'"
      }
    }
  }
}));
