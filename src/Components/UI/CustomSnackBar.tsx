import {
  Grid,
  IconButton,
  makeStyles,
  Snackbar,
  SnackbarCloseReason,
  SnackbarContent,
  Typography,
} from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { OpenState } from "src/Utils/api";
import { useIntl } from "react-intl";

interface CustomSnackBarProps {
  open: OpenState;
  setOpen: (value: OpenState) => void;
}

const useLocalStyles = makeStyles({
  snackbarContentSuccess: {
    "& .MuiSnackbarContent-message": {
      width: "100%",
    },
    backgroundColor: "rgba(219, 239, 226, .7)",
    color: "Black",
  },
  snackbarContentError: {
    "& .MuiSnackbarContent-message": {
      width: "100%",
    },
    backgroundColor: "rgba(199, 20, 20, .2)",
    color: "Black",
  },
});

const CustomSnackBar: React.FC<CustomSnackBarProps> = ({ open, setOpen }) => {
  const localClasses = useLocalStyles();
  const { formatMessage } = useIntl();

  const handleClose = (
    event: React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen({
      ...open,
      isOpen: false,
    });
  };

  function buildString(open: OpenState): string {
    if (open.message?.length === 1) {
      return `${formatMessage({ id: open.message[0] }, open.messageOptions)}`;
    }
    if (open.message?.length === 2) {
      return `${formatMessage(
        { id: open.message[0] },
        open.messageOptions
      )} ${formatMessage({
        id: "and",
      })} ${formatMessage({ id: open.message[1] }, open.messageOptions)}`;
    }
    if ((open.message as string[]).length > 2) {
      //Builds the string with correct punctuation
      return `${open.message!.forEach((message, index) => {
        if (index < open.message!.length - 2) {
          return `${formatMessage(
            { id: open.message![index] },
            open.messageOptions
          )},`;
        } else if (index === open.message!.length - 2) {
          return `${formatMessage(
            {
              id: open.message![index],
            },
            open.messageOptions
          )} ${formatMessage({ id: "and" })}`;
        } else {
          return `${formatMessage(
            {
              id: open.message![index],
            },
            open.messageOptions
          )}.`;
        }
      })}`;
    }
    return ``;
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open.isOpen}
      autoHideDuration={open.type === "success" ? 3000 : undefined}
      onClose={handleClose}
    >
      <SnackbarContent
        className={
          open.type === "success"
            ? localClasses.snackbarContentSuccess
            : localClasses.snackbarContentError
        }
        message={
          <React.Fragment>
            <Grid
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>{buildString(open)}</Typography>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() =>
                  setOpen({
                    ...open,
                    isOpen: false,
                  })
                }
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Grid>
          </React.Fragment>
        }
      />
    </Snackbar>
  );
};

export default CustomSnackBar;
