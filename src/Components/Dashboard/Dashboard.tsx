import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import CustomSearchBar from "../UI/CustomSearchBar";
import { ReactComponent as HandShakeSVG } from "../Icons/handshake.svg";
import { ReactComponent as EuroSVG } from "../Icons/euro.svg";
import { ReactComponent as ClockSVG } from "../Icons/clock.svg";
import { ReactComponent as ChatSVG } from "../Icons/chat.svg";
import { useIntl } from "react-intl";
import DashBoardCardItem from "./DashBoardCardItem";
import CustomPaper from "../UI/CustomPaper";
import DailyMeeting from "./DailyMeeting";
import { MeetingState, PaymentState } from "src/Utils/api";

interface dashBoardCardsItem {
  logo: React.FC;
  contentId: string;
  params?: {};
}

interface dailiMeeting {
  name: string;
  price: number;
  futureMeeting: boolean;
  meetingState: MeetingState;
  paymentState: PaymentState;
}

const useLocalStyles = makeStyles({
  dashBoardCardContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: "1%",
  },
  generalInformation: {
    marginLeft: "4%",
    width: "68%",
    height: "65%",
  },
  generalInformationTitle: {
    margin: "5% 10%",
  },
  generalInformationTabTitle: {
    margin: "0 2%",
    width: 100,
    textAlign: "center",
  },
  generalInvormationButtonGrid: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: "5%",
  },
  seeAllButton: {
    height: 40,
    width: "30%",
    marginRight: "0.3%",
    backgroundColor: "#5ED5FB",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#00c1ff",
    },
  },
});

const params = {
  amountOfMeetings: 3,
  nextMeetingTime: "13h45",
  todaysIncome: 240,
  currency: "euros",
  amountOfComments: 41,
};

const dashBoardCards: dashBoardCardsItem[] = [
  {
    logo: HandShakeSVG,
    contentId: "dashBoardCards.meetingsLeft",
    params: { amountOfMeetings: params.amountOfMeetings, linebreak: <br /> },
  },
  {
    logo: ClockSVG,
    contentId: "dashBoardCards.nextMeeting",
    params: { nextMeetingTime: params.nextMeetingTime, linebreak: <br /> },
  },
  {
    logo: EuroSVG,
    contentId: "dashBoardCards.todaysIncome",
    params: {
      todaysIncome: params.todaysIncome,
      currency: params.currency,
      linebreak: <br />,
    },
  },
  {
    logo: ChatSVG,
    contentId: "dashBoardCards.comments",
    params: { amountOfComments: params.amountOfComments, linebreak: <br /> },
  },
];

const dailiMeetings: dailiMeeting[] = [
  {
    name: "Lacroix",
    price: 80,
    futureMeeting: false,
    meetingState: MeetingState.DONE,
    paymentState: PaymentState.PAYD,
  },
  {
    name: "Pop Corn",
    price: 80,
    futureMeeting: false,
    meetingState: MeetingState.DONE,
    paymentState: PaymentState.PAYD,
  },
  {
    name: "Gustin",
    price: 80,
    futureMeeting: false,
    meetingState: MeetingState.DONE,
    paymentState: PaymentState.PAYD,
  },
  {
    name: "Fuscher",
    price: 80,
    futureMeeting: false,
    meetingState: MeetingState.DONE,
    paymentState: PaymentState.PAYD,
  },
  {
    name: "De theux",
    price: 80,
    futureMeeting: false,
    meetingState: MeetingState.DONE,
    paymentState: PaymentState.IN_PROGRESS,
  },
  {
    name: "Bond",
    price: 80,
    futureMeeting: false,
    meetingState: MeetingState.DONE,
    paymentState: PaymentState.NOT_PROVIDED,
  },
  {
    name: "Loverius",
    price: 80,
    futureMeeting: false,
    meetingState: MeetingState.DONE,
    paymentState: PaymentState.NOT_PROVIDED,
  },
];

const Dashboard = () => {
  const localClasses = useLocalStyles();
  const { formatMessage } = useIntl();
  return (
    <Grid
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <CustomSearchBar barStyles={{ marginBottom: "2%" }} />
      <Grid className={localClasses.dashBoardCardContainer}>
        <Grid className={localClasses.dashBoardCardContainer}>
          {dashBoardCards.map((card) => {
            const Logo = card.logo;
            const comment = formatMessage({ id: card.contentId }, card.params);
            return (
              <DashBoardCardItem key={comment} Logo={Logo} comment={comment} />
            );
          })}
        </Grid>
      </Grid>

      <Grid className={localClasses.generalInformation}>
        <CustomPaper style={{ height: "100%" }}>
          <Grid container>
            <Grid item xs={6}>
              <Typography
                variant={"h3"}
                className={localClasses.generalInformationTitle}
              >
                {formatMessage({ id: "dashBoardCards.meetingsOfTheDat" })}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              className={localClasses.generalInvormationButtonGrid}
            >
              <Button className={localClasses.seeAllButton} variant="contained">
                {formatMessage({ id: "dashBoardCards.mainCard.seeAll" })}
              </Button>
            </Grid>
          </Grid>
          {/*----------------Table menu----------------*/}
          <Grid container style={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={3}>
              <Typography
                variant={"body2"}
                className={localClasses.generalInformationTabTitle}
                style={{ marginLeft: "7%" }}
              >
                {formatMessage({ id: "dashBoardCards.mainCard.name" })}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography
                variant={"body2"}
                className={localClasses.generalInformationTabTitle}
              >
                {formatMessage({ id: "dashBoardCards.mainCard.price" })}
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
              <Typography
                variant={"body2"}
                className={localClasses.generalInformationTabTitle}
              >
                {formatMessage(
                  { id: "dashBoardCards.mainCard.meetingState" },
                  { linebreak: <br /> }
                )}
              </Typography>
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
              <Typography
                variant={"body2"}
                className={localClasses.generalInformationTabTitle}
              >
                {formatMessage(
                  { id: "dashBoardCards.mainCard.paymentState" },
                  { linebreak: <br /> }
                )}
              </Typography>
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
            style={{ margin: "1% 0%", width: "95%", marginLeft: "2.5%" }}
          />
          {dailiMeetings.map((meeting) => (
            <DailyMeeting
              name={meeting.name}
              price={meeting.price}
              futureMeeting={meeting.futureMeeting}
              meetingState={meeting.meetingState}
              paymentState={meeting.paymentState}
            />
          ))}
        </CustomPaper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
