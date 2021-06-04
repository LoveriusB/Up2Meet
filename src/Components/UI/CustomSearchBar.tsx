import React from "react";
import {
  FormControl,
  Grid,
  Input,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import { ReactComponent as SearchIcon } from "../Icons/search.svg";
import { useIntl } from "react-intl";
import LanguageSelector from "./LanguageSelector";

const useLocalStyles = makeStyles({
  customSearchBar: {
    width: "100%",
    height: 120,
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  customInput: {
    border: "none",
    height: 40,
    fontSize: 26,
    width: "100%",
    outline: "none",
    color: "#AEAEAE",
    fontFamily: "Roboto, sans-serif",
    fontStyle: "normal",
    fontWeight: 200,
  },
  customInputAndIcon: {
    border: "1px solid #C4C4C4",
    display: "flex",
    alignItems: "center",
    padding: "10px 27px",
    width: "60%",
    borderRadius: 16,
  },
});

interface CustomSearchBarProps {
  barStyles?: React.CSSProperties;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({ barStyles }) => {
  const localClasses = useLocalStyles();
  const { formatMessage } = useIntl();

  return (
    <Grid className={localClasses.customSearchBar} style={barStyles} container>
      <Grid item xs={4} style={{ paddingLeft: "5%" }}>
        <LanguageSelector />
      </Grid>
      <Grid item xs={8}>
        <Grid className={localClasses.container}>
          <Grid className={localClasses.customInputAndIcon}>
            <FormControl style={{ width: "100%" }}>
              <Input
                id="input-with-icon-adornment"
                disableUnderline
                className={localClasses.customInput}
                style={{ width: "100%" }}
                placeholder={formatMessage({ id: "appBar.searchHere" })}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon style={{ marginRight: "5%" }} />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CustomSearchBar;
