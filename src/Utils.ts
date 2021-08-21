import { isEmpty, isNil, toNumber } from "lodash";
import { ErrorState, LoginFormValues, OpenState } from "./Utils/api";
import validator from "validator";

export const getSafeValueInObject: any = (object: any, field: string) => {
  if (isNil(object) || isEmpty(object) || isNil(field) || isEmpty(field))
    return "";

  if (field.indexOf(".") === -1) {
    if (field.endsWith("]")) {
      const tableIndex = field.indexOf("[");
      const fieldName = field.substring(0, tableIndex);
      const indexToSearch = field.substring(tableIndex + 1, field.length - 1);
      if (isNil(object[fieldName])) return "";
      return object[fieldName][toNumber(indexToSearch)];
    }
    return isNil(object[field]) ? "" : object[field];
  }
  const fields = field.split(".");
  if (fields[0].endsWith("]")) {
    const tableIndex = fields[0].indexOf("[");
    const field = fields[0].substring(0, tableIndex);
    const indexToSearch = fields[0].substring(
      tableIndex + 1,
      fields[0].length - 1
    );
    if (isNil(object[field])) return "";
    return getSafeValueInObject(
      object[field][toNumber(indexToSearch)],
      fields.slice(1).join(".")
    );
  }
  return getSafeValueInObject(object[fields[0]], fields.slice(1).join("."));
};

export const checkCredentials = (
  values: LoginFormValues,
  setOpen: (value: OpenState) => void,
  setError: (value: ErrorState) => void
) => {
  let errorMessage = [];
  let error = { password: false, email: false };
  if (values.email === "" || isNil(values.email)) {
    errorMessage.push(`login.errors.noEmail`);
    error.email = true;
  }

  if (
    values.email !== "" &&
    !isNil(values.email) &&
    !validator.isEmail(values.email)
  ) {
    //Checks email validity
    errorMessage.push(`login.errors.invalidEmail`);
    error.email = true;
  }

  if (values.password === "" || isNil(values.password)) {
    //Checks password validity
    errorMessage.push(`login.errors.noPassword`);
    error.password = true;
  }

  if (error.email || error.password) {
    setOpen({
      isOpen: true,
      message: errorMessage,
      type: "error",
    });
    setError({
      email: error.email,
      password: error.password,
    });
    return true;
  }
  return false;
};
