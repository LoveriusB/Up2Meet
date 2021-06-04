import { Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { MeetingState, PaymentState } from "src/Utils/api";
import UpdatePaymentButton from "../Dashboard/UpdatePaymentButton";

interface DailyMeetingProps {
  name: string;
  price: number;
  meetingState: MeetingState;
  paymentState: PaymentState;
  futureMeeting: boolean;
}

const useLocalStyles = makeStyles({
  generalInformationTabTitle: {
    margin: "0 2%",
    width: 100,
    textAlign: "center",
  },
});

const DailyMeeting: React.FC<DailyMeetingProps> = ({
  name,
  price,
  meetingState,
  paymentState,
  futureMeeting,
}) => {
  const { formatMessage } = useIntl();
  const localClasses = useLocalStyles();
  const [paymentStateValue, setPaymentStateValue] =
    useState<PaymentState>(paymentState);

  return (
    <>
      <Grid container style={{ display: "flex", alignItems: "center" }}>
        <Grid item xs={3}>
          <Typography variant={"body2"} style={{ marginLeft: "18%" }}>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography
            variant={"body2"}
            className={localClasses.generalInformationTabTitle}
          >
            {`${price} €`}
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          style={{
            display: "flex",
            justifyContent: "center",
            paddingLeft: "5%",
          }}
        >
          <UpdatePaymentButton
            setPaymentState={setPaymentStateValue}
            paymentState={paymentStateValue}
            clientName={name}
          />
        </Grid>
        <Grid
          item
          xs={3}
          style={{
            display: "flex",
            justifyContent: "center",
            paddingRight: "5%",
          }}
        >
          <UpdatePaymentButton
            setPaymentState={setPaymentStateValue}
            paymentState={paymentStateValue}
            clientName={name}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant={"body2"}
            className={localClasses.generalInformationTabTitle}
          >
            {formatMessage(
              { id: "dashBoardCards.mainCard.futurMeeting" },
              { linebreak: <br /> }
            )}
          </Typography>
        </Grid>
      </Grid>
      <Divider
        style={{
          marginTop: "1%",
          marginBottom: "1%",
          width: "95%",
          marginLeft: "2.5%",
        }}
      />
    </>
  );
};

export default DailyMeeting;
