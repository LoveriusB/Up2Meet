import { Grid } from "@material-ui/core";
import React from "react";
import CustomSearchBar from "../UI/CustomSearchBar";
import LoginForm from "../UI/LoginForm";

const Profile = () => {
  return (
    <Grid style={{ width: "100%" }}>
      <CustomSearchBar showInput={false} barStyles={{ marginBottom: "8%" }} />
      <LoginForm />
    </Grid>
  );
};

export default Profile;
