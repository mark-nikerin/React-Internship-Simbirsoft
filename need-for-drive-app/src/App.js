import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import StartPage from "./pages/start";
import OrderPage from "./pages/order";
import "./App.css"

const App = () => {
  return (
    <div className="main-body">
      <Router>
        <Sidebar />
        <Switch>
          <Route exact path="/React-Internship-Simbirsoft/" component={StartPage}/>
          <Route exact path="/React-Internship-Simbirsoft/order" component={OrderPage}/>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
