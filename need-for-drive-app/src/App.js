import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StartPage from "./pages/start";
import OrderPage from "./pages/order";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/Need-For-Drive" component={StartPage} />
        <Route exact path="/Need-For-Drive/order" component={OrderPage} />
      </Switch>
    </Router>
  );
};

export default App;
