import { makeStyles, MenuItem, Select } from "@material-ui/core";
import React, { ReactElement, ReactNode, useState } from "react";

interface CustomSelectProps {
  children: ReactNode;
}

const useLocalStyles = makeStyles({
  select: {
    backgroundColor: "#F2F2F2",
    minHeight: 50,

    "& .MuiSelect-select:focus": {
      backgroundColor: "#F2F2F2",
    },

    "& .MuiSelect-select": {
      minHeight: 50,
      padding: 0,
      paddingLeft: "5%",
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      color: "#000000",
    },
  },
  menuItem: {
    height: 50,
    borderBottom: "1px solid #E6E6E6",
  },
});

const CustomSelect: React.FC<CustomSelectProps> = ({ children }) => {
  const [state, setstate] = useState<string>("");
  const localClasses = useLocalStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setstate(event.target.value as string);
  };

  return (
    <Select
      style={{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: "95%",
      }}
      className={localClasses.select}
      MenuProps={{
        MenuListProps: {
          style: {
            padding: 0,
          },
        },
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        getContentAnchorEl: null,
      }}
      disableUnderline
      value={state}
      onChange={handleChange}
    >
      {React.Children.map(children, (child) => {
        return (
          <MenuItem
            className={localClasses.menuItem}
            value={(child as ReactElement).props.children}
          >
            {child}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default CustomSelect;
