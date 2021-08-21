import { Button, CircularProgress, Grid, makeStyles } from "@material-ui/core";
import React from "react";

interface LoaderButtonProps {
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  isSubmitting: boolean;
}

const useLocalStyles = makeStyles({
  clickableButtonStyle: {
    width: 150,
    height: 50,
    backgroundColor: "#01324A",
    color: "#FFFFFF",
    margin: "4% 0",
    "&:hover": {
      backgroundColor: "#004d73",
    },
  },
});

const LoaderButton: React.FC<LoaderButtonProps> = ({
  type = "submit",
  isSubmitting,
  text,
}) => {
  const localClasses = useLocalStyles();

  return (
    <Grid style={{ display: "flex", justifyContent: "center" }}>
      <Button
        disabled={isSubmitting}
        className={localClasses.clickableButtonStyle}
        type={type}
      >
        {isSubmitting ? (
          <CircularProgress style={{ color: "#FFFFFF" }} size={24} />
        ) : (
          text
        )}
      </Button>
    </Grid>
  );
};

export default LoaderButton;
