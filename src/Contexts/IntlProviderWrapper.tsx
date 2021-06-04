import React, { useContext, useState } from "react";
import { IntlProvider } from "react-intl";
import { MessagesFR as localeFR } from "../i18n/MessagesFR";
import { MessagesEN as localeEN } from "../i18n/MessagesEN";
import { MessagesNL as localeNL } from "../i18n/MessagesNL";
import { flattenMessages } from "src/Utils/i18nUtils";

export interface ILocaleContext {
  language: number;
  setLanguage: (language: number) => void;
}

export const LocaleContext = React.createContext<ILocaleContext | null>(null);
const providerLocaleMap: Record<string, {}> = {
  fr: localeFR,
  en: localeEN,
  nl: localeNL,
};

export const LocaleProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState<number>(0);

  const values = React.useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language]
  );

  let locale = "fr";

  switch (language) {
    case 0:
      locale = "fr";
      break;
    case 1:
      locale = "en";
      break;
    case 2:
      locale = "nl";
      break;
  }

  return (
    <LocaleContext.Provider value={values}>
      <IntlProvider
        locale={locale}
        messages={{
          ...flattenMessages(providerLocaleMap[locale]),
        }}
        defaultLocale={locale}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export const useLocale = (): ILocaleContext => {
  const context = useContext<ILocaleContext | null>(LocaleContext);
  if (context === undefined) {
    throw new Error(
      "`useUser` hook must be used within a `UserProvider` component"
    );
  }
  return context as ILocaleContext;
};
