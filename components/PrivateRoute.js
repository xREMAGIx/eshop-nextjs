import { useEffect } from "react";
import Router from "next/router";
import { isAuth } from "../actions/user.actions";

const PrivateRoute = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push(`/login`);
    }
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
};

export default PrivateRoute;
