import { createMuiTheme, Theme, ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { ReactNode, useState } from "react";

interface CustomThemeProviderProps {
  children: ReactNode;
}

interface ThemeContext {
  displayedTheme: Theme;
  setDisplayedTheme: (value: Theme) => void;
}

const localContext = React.createContext<ThemeContext | null>(null);

const lightTheme = createMuiTheme({
  palette: {
    background: {
      paper: "#ffffff",
      default: "#F6F6F6",
    },
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: "10px",
      },
    },
    MuiDrawer: {
      paper: {
        boxShadow: "5px 125px 20px rgba(0, 0, 0, 0.25)",
        backgroundColor: "#01324A",
      },
    },
    MuiListItem: {
      button: {
        "&:hover": {
          backgroundColor: "#012130",
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiTooltip: {
      tooltipArrow: {
        backgroundColor: "#01324A",
      },
    },
    MuiInput: {
      input: {
        "&::placeholder": {
          color: "#AEAEAE",
          opacity: 1,
        },
        color: "#AEAEAE",
      },
    },
    MuiTypography: {
      h3: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: 21,
      },
      h6: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 300,
      },
      body1: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 100,
        fontSize: 28,
      },
      body2: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 16,
        color: "#AEAEAE",
      },
    },
    MuiButton: {
      root: {
        borderRadius: 17,
      },
    },
    MuiMenu: {
      paper: {
        borderRadius: 0,
      },
    },
    MuiMenuItem: {
      root: {
        "&:hover": {
          backgroundColor: "rgba(2,49,74,.1)",
        },
      },
    },
    MuiList: {
      padding: {
        padding: 0,
      },
    },
  },
});

const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
  children,
}) => {
  const [displayedTheme, setDisplayedTheme] = useState<Theme>(lightTheme);

  const values = {
    displayedTheme,
    setDisplayedTheme,
  };

  return (
    <localContext.Provider value={values}>
      <ThemeProvider theme={displayedTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </localContext.Provider>
  );
};

export default CustomThemeProvider;
