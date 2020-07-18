import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StartPage from "./pages/start";
import OrderPage from "./pages/order";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/React-Internship-Simbirsoft/" component={StartPage} />
        <Route exact path="/React-Internship-Simbirsoft/order" component={OrderPage} />
      </Switch>
    </Router>
  );
};

export default App;
