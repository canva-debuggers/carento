import React from "react";
import AccountProvider, { AccountContext } from "../context/AccountProvider";
import { Navigate } from "react-router-dom";

function PrivateRouter({ children }) {
  const { account } = React.useContext(AccountContext);
  console.log("account", AccountContext);
  if (account) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRouter;
