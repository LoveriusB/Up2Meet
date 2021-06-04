import { Button, Grid, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { PaymentState } from "src/Utils/api";
import UpdateMeetingDialog from "./UpdateMeetingDialog";

interface UpdatePaymentButtonProps {
  paymentState: PaymentState;
  setPaymentState: (value: PaymentState) => void;
  clientName: string;
}

const useLocalStyles = makeStyles({
  buttonPaid: {
    minWidth: 110,
    backgroundColor: "#97e62c",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#85c928",
    },
  },
  buttonPartiallyPaid: {
    minWidth: 110,
    backgroundColor: "#ff9d3b",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#ff8000",
    },
  },
  buttonNotPaid: {
    minWidth: 110,
    backgroundColor: "#FD0000",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#e00000",
    },
  },
  buttonNotMet: {
    minWidth: 110,
    backgroundColor: "#AEAEAE",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#999999",
    },
  },
});

const UpdatePaymentButton: React.FC<UpdatePaymentButtonProps> = ({
  paymentState,
  setPaymentState,
  clientName,
}) => {
  const localClasses = useLocalStyles();
  const { formatMessage } = useIntl();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  let buttonClass = localClasses.buttonNotPaid;

  switch (paymentState) {
    case PaymentState.PAYD:
      buttonClass = localClasses.buttonPaid;
      break;
    case PaymentState.PARTIALLY_PAID:
      buttonClass = localClasses.buttonPartiallyPaid;
      break;
    case PaymentState.NOT_PROVIDED:
      buttonClass = localClasses.buttonNotMet;
      break;
    case PaymentState.IN_PROGRESS:
      buttonClass = localClasses.buttonNotPaid;
      break;
  }

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Grid>
      <Button
        variant="contained"
        className={buttonClass}
        onClick={() => setDialogOpen(!dialogOpen)}
      >
        {formatMessage({
          id: `dashBoardCards.mainCard.paymentStatus.${paymentState}`,
        })}
      </Button>
      <UpdateMeetingDialog
        clientName={clientName}
        dialogOpen={dialogOpen}
        handleClose={handleClose}
      />
    </Grid>
  );
};

export default UpdatePaymentButton;
