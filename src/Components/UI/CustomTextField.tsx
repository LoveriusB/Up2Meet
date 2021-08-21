import { makeStyles, TextField } from "@material-ui/core";
import { useFormikContext } from "formik";
import { isNil } from "lodash";
import React from "react";
import { getSafeValueInObject } from "src/Utils";

interface CustomTextFieldProps {
  inputProps?: {};
  disabled?: boolean;
  style?: React.CSSProperties;
  name: string;
  value?: string;
  error?: boolean;
  type?: string;
}

const useLocalStyles = makeStyles({
  textField: {
    backgroundColor: "#F2F2F2",
    minHeight: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "90%",
    display: "flex",
    justifyContent: "center",
    "& .Mui-disabled": {
      textAlign: "center",
    },
    "& .MuiInput-input": {
      minHeight: 50,
      padding: 0,
      paddingLeft: "5%",
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      color: "#000000",
    },
  },
  textFieldError: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
  },
});

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  inputProps /*= { disableUnderline: true }*/,
  disabled = false,
  style,
  name,
  value,
  error,
  type = "text",
}) => {
  const localClasses = useLocalStyles();
  const { values, setFieldValue } = useFormikContext();

  return (
    <TextField
      error={error}
      name={name}
      style={style}
      className={`${localClasses.textField} ${
        !error ? "" : localClasses.textFieldError
      }`}
      disabled={disabled}
      InputProps={inputProps}
      value={isNil(value) ? getSafeValueInObject(values, name) : ""}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setFieldValue(`${name}`, e.target.value)
      }
      type={type}
    />
  );
};

export default CustomTextField;
