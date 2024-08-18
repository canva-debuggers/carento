import { createContext, useState } from "react";

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        user,
        setUser,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
