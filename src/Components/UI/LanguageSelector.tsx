import { makeStyles, Tab, Tabs } from "@material-ui/core";
import React, { useContext } from "react";
import {
  ILocaleContext,
  LocaleContext,
} from "src/Contexts/IntlProviderWrapper";

const useLocalStyles = makeStyles({
  tabStyle: {
    fontWeight: 400,
    minWidth: 50,
  },
});

const LanguageSelector = () => {
  const context = useContext<ILocaleContext | null>(LocaleContext);
  const localClasses = useLocalStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    context?.setLanguage(newValue);
  };
  return (
    <Tabs
      value={context?.language}
      onChange={handleChange}
      indicatorColor="secondary"
      textColor="secondary"
      variant={"standard"}
    >
      <Tab className={localClasses.tabStyle} label={"Fr"} />
      <Tab className={localClasses.tabStyle} label={"En"} />
      <Tab className={localClasses.tabStyle} label={"Nl"} />
    </Tabs>
  );
};

export default LanguageSelector;
