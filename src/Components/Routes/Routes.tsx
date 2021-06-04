import { isNil } from "lodash";
import React from "react";
import { Switch } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import { ReactComponent as HomeSVG } from "../Icons/leftMenu_home.svg";
import { ReactComponent as ProfileSVG } from "../Icons/leftMenu_profil.svg";
import { ReactComponent as CalendarSVG } from "../Icons/leftMenu_calendar.svg";
import { ReactComponent as NoteBookSVG } from "../Icons/leftMenu_notebook.svg";
import AuthenticatedRoute from "./AuthenticatedRoute";

export interface NavItem {
  to?: string;
  exact?: boolean;
  params?: string;
  svgicon?: React.FC;
  component?: React.FC<any>;
  labelId?: string;
  space?: boolean;
  divider?: boolean;
  menu?: boolean;
  showLeftMenu?: boolean;
}

enum RouteDestination {
  PROFILE = "/profile",
  HOME = "/home",
  CALENDAR = "/calendar",
  MEETING = "/meeting",
}

export const navRoutes: NavItem[] = [
  {
    to: RouteDestination.PROFILE,
    exact: true,
    svgicon: ProfileSVG,
    component: Dashboard,
    labelId: "menu.profile",
  },
  {
    to: RouteDestination.HOME,
    exact: true,
    svgicon: HomeSVG,
    component: Dashboard,
    labelId: "menu.home",
  },
  {
    to: RouteDestination.CALENDAR,
    exact: true,
    svgicon: CalendarSVG,
    component: Dashboard,
    labelId: "menu.calendar",
  },
  {
    to: RouteDestination.MEETING,
    exact: true,
    svgicon: NoteBookSVG,
    component: Dashboard,
    labelId: "menu.meeting",
    showLeftMenu: false,
  },
];

const Routes: React.FC = () => {
  //const isAuthenticated = Boolean(user && user.getUsername());
  const authRoutes = navRoutes.map(({ divider, space, ...route }) => {
    let RouteComponent = route.component;
    const to = route.to;
    const showMenu = !isNil(route.showLeftMenu) ? route.showLeftMenu : true;

    //const currentUser = !isNil(userId) ? getUser(userId) : undefined;

    if (RouteComponent) {
      return (
        <AuthenticatedRoute
          path={to}
          key={route.to}
          component={RouteComponent}
          showMenu={showMenu}
          isAuthenticated={true}
        />
      );
    } else {
      return null;
    }
  });
  const routes = (
    <Switch>
      <AuthenticatedRoute
        path={"/"}
        component={Dashboard}
        showMenu={true}
        isAuthenticated={true}
        exact
      />

      {authRoutes}

      {/* Finally, catch all unmatched routes */}
      <AuthenticatedRoute
        component={() => <h1>NOT FOUND</h1>}
        showMenu={false}
        isAuthenticated={true}
      />
    </Switch>
  );
  return routes;
};

export default Routes;
