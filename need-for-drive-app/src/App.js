import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import StartPage from "./pages/start";
import OrderPage from "./pages/order";

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
            <Route
              exact
              path="/React-Internship-Simbirsoft/"
              component={StartPage}
            />
            <Route
              exact
              path="/React-Internship-Simbirsoft/order"
              component={OrderPage}
            />
          </Switch>
        </Provider>
      </Router>
    </div>
  );
};

export default App;
