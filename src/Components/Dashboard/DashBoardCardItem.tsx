import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import CustomPaper from "../UI/CustomPaper";

const useLocalStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  logoGrid: {
    margin: "0 3% 0 10%",
  },
  typo: {
    fontStyle: "Thin",
    fontWeight: 100,
    fontSize: 26,
    textAlign: "center",
    width: "100%",
  },
});

interface DashBoardCardItemProps {
  Logo: React.FC;
  comment: string;
}

const DashBoardCardItem: React.FC<DashBoardCardItemProps> = ({
  Logo,
  comment,
}) => {
  const localClasses = useLocalStyles();

  return (
    <CustomPaper style={{ width: "20%", height: 140 }}>
      <Grid className={localClasses.container}>
        <Grid className={localClasses.logoGrid}>
          <Logo />
        </Grid>
        <Typography variant={"body1"} className={localClasses.typo}>
          {comment}
        </Typography>
      </Grid>
    </CustomPaper>
  );
};

export default DashBoardCardItem;
