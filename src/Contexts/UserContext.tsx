import React, { useContext, useState } from "react";
import { User } from "src/Utils/api";

export interface IUserContext {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  userAlreadySet: boolean;
  setUserAlreadySet: (value: boolean) => void;
}

export const LocaleContext = React.createContext<IUserContext | null>(null);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userAlreadySet, setUserAlreadySet] = useState<boolean>(false);

  const values = React.useMemo(
    () => ({
      user,
      setUser,
      userAlreadySet,
      setUserAlreadySet,
    }),
    [user, userAlreadySet]
  );

  return (
    <LocaleContext.Provider value={values}>{children}</LocaleContext.Provider>
  );
};

export const useUser = (): IUserContext => {
  const context = useContext<IUserContext | null>(LocaleContext);
  if (context === undefined) {
    throw new Error(
      "`useUser` hook must be used within a `UserProvider` component"
    );
  }
  return context as IUserContext;
};
