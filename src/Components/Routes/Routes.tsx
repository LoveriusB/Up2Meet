import { isNil } from "lodash";
import React from "react";
import { Switch } from "react-router-dom";
import { ReactComponent as HomeSVG } from "../Icons/leftMenu_home.svg";
import { ReactComponent as ProfileSVG } from "../Icons/leftMenu_profil.svg";
import { ReactComponent as CalendarSVG } from "../Icons/leftMenu_calendar.svg";
import { ReactComponent as NoteBookSVG } from "../Icons/leftMenu_notebook.svg";
import AuthenticatedRoute from "./AuthenticatedRoute";

import Profile from "../Profile/Profile";
import Dashboard from "../Dashboard/Dashboard";
import { useUser } from "src/Contexts/UserContext";

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
  forceAuthenticated?: boolean;
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
    component: Profile,
    labelId: "menu.profile",
    forceAuthenticated: true,
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
  const { user } = useUser();
  const isAuthenticated = Boolean(user);
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
          isAuthenticated={route.forceAuthenticated ? true : isAuthenticated}
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
        isAuthenticated={isAuthenticated}
        exact
      />

      {authRoutes}

      {/* Finally, catch all unmatched routes */}
      <AuthenticatedRoute
        component={() => <h1>NOT FOUND</h1>}
        showMenu={false}
        isAuthenticated={isAuthenticated}
      />
    </Switch>
  );
  return routes;
};

export default Routes;
