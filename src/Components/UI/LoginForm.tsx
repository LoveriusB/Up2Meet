import {
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Formik, Form, FormikHelpers } from "formik";
import React, { useEffect } from "react";
import { useUser } from "src/Contexts/UserContext";
import { loginRequest } from "src/Utils/Requests";
import CustomTextField from "./CustomTextField";
import LoaderButton from "./LoaderButton";
import { isNil } from "lodash";
import CustomSnackBar from "./CustomSnackBar";
import { ErrorState, LoginFormValues, OpenState } from "src/Utils/api";
import { checkCredentials } from "src/Utils";
import { useIntl } from "react-intl";

const useLocalStyles = makeStyles({
  parentGrid: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  paper: {
    width: "30%",
    minHeight: "1%",
  },
  paperTitle: {
    margin: "6% 0 6% 6%",
  },
});

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const localClasses = useLocalStyles();
  const { setUser, user, userAlreadySet, setUserAlreadySet } = useUser();
  const { formatMessage } = useIntl();
  const [error, setError] = React.useState<ErrorState>({
    email: false,
    password: false,
  });
  const [open, setOpen] = React.useState<OpenState>({
    isOpen: false,
    type: undefined,
    message: undefined,
    messageOptions: undefined,
  });

  useEffect(() => {
    if (!isNil(user) && !userAlreadySet) {
      //Is executed on refresh for user changes value.
      //Need to check if user is present.
      setOpen({
        isOpen: true,
        type: "success",
        message: [`login.success`],
        messageOptions: { userName: user.firstName }, //`Welcome back ${user?.firstName}`,
      });
      setUserAlreadySet(true);
    }
  }, [user, setOpen, userAlreadySet, setUserAlreadySet]);

  const submitForm = async (
    values: LoginFormValues,
    { setSubmitting, setStatus }: FormikHelpers<LoginFormValues>
  ) => {
    if (checkCredentials(values, setOpen, setError)) {
      return;
    }

    const result = await loginRequest(values);
    if (!isNil(result.error)) {
      //checks serverside errors
      setOpen({
        isOpen: true,
        type: "error",
        message: [result.error],
      });
      setError({ email: true, password: true });
    } else {
      setError({ password: false, email: false });
      setUser(result.user);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitForm}>
      {({ isSubmitting, status, values, errors, setFieldValue }) => {
        return (
          <Form>
            <Grid className={localClasses.parentGrid}>
              <Paper className={localClasses.paper}>
                <Grid className={localClasses.paperTitle}>
                  <Typography variant={"h4"}>
                    {formatMessage({ id: "login.login" })}
                  </Typography>
                </Grid>
                <Divider />
                <Grid>
                  <Grid container style={{ marginTop: "2%" }}>
                    <Grid item xs={12} style={{ paddingLeft: "6%" }}>
                      <Typography variant="h6">
                        {formatMessage({ id: "login.email" })}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid style={{ display: "flex", justifyContent: "center" }}>
                    <CustomTextField
                      error={error.email}
                      name="email"
                      style={{ margin: "3% 0" }}
                      inputProps={{ disableUnderline: true }}
                      disabled={false}
                    />
                  </Grid>
                  <Grid container style={{ marginTop: "2%" }}>
                    <Grid item xs={12} style={{ paddingLeft: "6%" }}>
                      <Typography variant="h6">
                        {formatMessage({ id: "login.password" })}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid style={{ display: "flex", justifyContent: "center" }}>
                    <CustomTextField
                      error={error.password}
                      name="password"
                      style={{ margin: "3% 0" }}
                      inputProps={{ disableUnderline: true }}
                      disabled={false}
                      type={"password"}
                    />
                  </Grid>
                </Grid>
                <Divider />
                <Grid>
                  <LoaderButton
                    text={formatMessage({ id: "login.loginBTN" })}
                    isSubmitting={isSubmitting}
                  />
                </Grid>
              </Paper>
            </Grid>
            {!isNil(open.isOpen) && open.isOpen && (
              <CustomSnackBar open={open} setOpen={setOpen} />
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
