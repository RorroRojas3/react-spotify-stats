import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// My components
import Home from "../pages/home/home";
import Callback from "../pages/callback/callback";
import MyNavbar from "../components/navbar/myNavbar";

// Context
import { UserContextProvider } from "../context/userContext";

const Routes = () => {
  return (
    <div>
      <UserContextProvider>
        <MyNavbar />
        {console.log(process.env.PUBLIC_URL)}
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/callback">
              <Callback />
            </Route>
          </Switch>
        </Router>
      </UserContextProvider>
    </div>
  );
};

export default Routes;
