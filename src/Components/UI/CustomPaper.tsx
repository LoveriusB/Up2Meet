import { makeStyles, Paper } from "@material-ui/core";
import React, { ReactNode } from "react";

interface CustomePaperProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

const useLocalStyles = makeStyles({
  customPaper: {
    boxShadow: "4px 4px 20px 4px rgba(174, 174, 174, 0.25);",
  },
});

export const CustomPaper: React.FC<CustomePaperProps> = ({
  children,
  style,
}) => {
  const localClasses = useLocalStyles();

  return (
    <Paper style={style} className={localClasses.customPaper}>
      {children}
    </Paper>
  );
};

export default CustomPaper;
