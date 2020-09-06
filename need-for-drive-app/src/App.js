import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import StartPage from "./pages/start";
import OrderPage from "./pages/order";
import FinalStep from "./components/Steps/FinalStep"

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store/reducers";

import "./App.css";

const store = createStore(rootReducer);

const App = () => {
  return (
    <div className="main-body">
      <Router>
        <Provider store={store}>
          <Sidebar />
          <Switch>
            <Route path="/" exact component={StartPage} />
            <Route path="/order" exact component={OrderPage} />
            <Route path="/order/:id" exact component={OrderPage} />
          </Switch>
        </Provider>
      </Router>
    </div>
  );
};

export default App;
