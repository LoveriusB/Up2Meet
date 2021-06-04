import {
  Button,
  Dialog,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useIntl } from "react-intl";
import { MeetingState, PaymentState } from "src/Utils/api";
import CustomSelect from "../UI/CustomSelect";

interface UpdateMeetingDialogProps {
  dialogOpen: boolean;
  handleClose: () => void;
  clientName: string;
}

const useLocalStyles = makeStyles({
  typo: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 100,
    fontSize: "24px",
  },
  textField: {
    backgroundColor: "#F2F2F2",
    minHeight: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .Mui-disabled": {
      textAlign: "center",
    },
  },
});

const UpdateMeetingDialog: React.FC<UpdateMeetingDialogProps> = ({
  dialogOpen,
  handleClose,
  clientName,
}) => {
  const localClasses = useLocalStyles();
  const { formatMessage } = useIntl();

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <Grid style={{ padding: "5%", minWidth: 500 }}>
        <Typography variant={"h4"}>Update meeting status</Typography>
      </Grid>
      <Divider />
      <Grid container style={{ marginTop: "2%" }}>
        <Grid item xs={6} style={{ paddingLeft: "5%" }}>
          <Typography variant="h6">Client</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "5%",
          }}
        >
          <Typography variant="h6">Prestataire</Typography>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "2%" }}>
        <Grid item xs={6} style={{ paddingLeft: "5%" }}>
          <TextField
            className={localClasses.textField}
            disabled
            InputProps={{ disableUnderline: true }}
            value={clientName}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={localClasses.textField}
            disabled
            InputProps={{ disableUnderline: true }}
            value={"Loverius"} //User.name
          />
        </Grid>
      </Grid>
      <Typography variant="h6" style={{ paddingLeft: "5%", marginTop: "5%" }}>
        {formatMessage({
          id: `dashBoardCards.mainCard.meeting`,
        })}
      </Typography>
      <Grid style={{ paddingLeft: "5%" }}>
        <CustomSelect>
          {Object.keys(MeetingState).map((state) => (
            <Typography className={localClasses.typo}>
              {formatMessage({
                id: `dashBoardCards.mainCard.meetingStatus.${state}`,
              })}
            </Typography>
          ))}
        </CustomSelect>
      </Grid>
      <Typography variant="h6" style={{ paddingLeft: "5%", marginTop: "5%" }}>
        {formatMessage({
          id: `dashBoardCards.mainCard.payment`,
        })}
      </Typography>
      <Grid style={{ paddingLeft: "5%" }}>
        <CustomSelect>
          {Object.keys(PaymentState).map((state) => (
            <Typography className={localClasses.typo}>
              {formatMessage({
                id: `dashBoardCards.mainCard.paymentStatus.${state}`,
              })}
            </Typography>
          ))}
        </CustomSelect>
      </Grid>
      <Divider style={{ marginTop: "2%" }} />
      <Grid container>
        <Grid
          item
          xs={6}
          style={{ display: "flex", justifyContent: "center", padding: "7%" }}
        >
          <Button onClick={() => handleClose()}>Cancel</Button>
        </Grid>
        <Grid
          item
          xs={6}
          style={{ display: "flex", justifyContent: "center", padding: "7%" }}
        >
          <Button onClick={() => handleClose()}>Cancel</Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default UpdateMeetingDialog;
