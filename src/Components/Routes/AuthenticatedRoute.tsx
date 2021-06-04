import React from "react";
import { Route, Redirect, RouteProps, Link } from "react-router-dom";
import { navRoutes } from "./Routes";
import Badge from "@material-ui/core/Badge";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import { useIntl } from "react-intl";
import { useLocation } from "react-router";
import { Divider, Grid, makeStyles } from "@material-ui/core";
import { ReactComponent as OpenMenuSVG } from "../Icons/leftMenu_menu.svg";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  arrow: {
    "&:before": {
      backgroundColor: "#01324A",
    },
  },
});

interface LayoutProps {
  component: React.ComponentType<any>;
  showMenu?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ component: Component, showMenu }) => {
  const location = useLocation();
  const classes = useStyles();
  const { formatMessage } = useIntl();
  return (
    <React.Fragment>
      <Grid style={{ display: "flex", flexDirection: "row" }}>
        {showMenu ? (
          <Grid
            style={{
              maxWidth: 100,
              height: "100vh",
              backgroundColor: "#01324A",
              boxShadow: "5px 4px 20px rgba(0, 0, 0, 0.25)",
            }}
          >
            <List
              component="nav"
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                padding: 0,
              }}
            >
              {/* Expand menu button */}
              <Tooltip
                title={formatMessage({ id: "menu.open" })}
                placement="right"
                arrow
                style={{ maxHeight: 120 }}
                classes={{ arrow: classes.arrow }}
              >
                <ListItem
                  button
                  style={{ marginTop: "0%", maxHeight: 119 }}
                  classes={{ root: classes.root, button: classes.root }}
                >
                  <Badge color="secondary">
                    {/* variant="dot" */}
                    <OpenMenuSVG style={{ fill: "#607D8B" }} />
                  </Badge>
                </ListItem>
              </Tooltip>
              <Divider style={{ backgroundColor: "#AEAEAE" }} />

              {/* Navigation menu buttons */}

              {navRoutes.map(({ divider, space, ...route }) => {
                let SvgComponent = route.svgicon as any;
                const svgFill =
                  location.pathname.includes(route.to as string) ||
                  (location.pathname === "/" && route.to === `/dashboard`)
                    ? "#ff0000"
                    : "#607D8B";
                return (
                  <Tooltip
                    key={route.to}
                    title={formatMessage({ id: route.labelId })}
                    placement="right"
                    style={{ maxHeight: 120 }}
                    arrow
                    classes={{ arrow: classes.arrow }}
                  >
                    <ListItem
                      component={Link as React.ComponentType<any>}
                      style={{ marginTop: "80%", maxHeight: 120 }}
                      to={route.to}
                      button
                      classes={{ root: classes.root, button: classes.root }}
                    >
                      <Badge
                        color="error"
                        variant={
                          location.pathname === route.to ||
                          (location.pathname === "/" &&
                            route.labelId === "menu.home")
                            ? "dot"
                            : "standard"
                        }
                      >
                        {/* variant="dot" */}
                        <SvgComponent style={{ fill: svgFill }} />
                      </Badge>
                    </ListItem>
                  </Tooltip>
                );
              })}
            </List>
          </Grid>
        ) : null}
        <Component />
      </Grid>
    </React.Fragment>
  );
};
interface AuthenticatedRouteProps extends RouteProps {
  isAuthenticated?: boolean;
  showMenu?: boolean;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  component,
  showMenu,
  isAuthenticated,
  path,
  exact,
}) => {
  if (!component) {
    return null;
  }
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        isAuthenticated ? (
          <div>
            <Layout component={component} showMenu={showMenu} />
          </div>
        ) : (
          <Redirect to={`/`} />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
