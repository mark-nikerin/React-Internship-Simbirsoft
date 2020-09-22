import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import StartPage from "./pages/start";
import OrderPage from "./pages/order";
import AdminPage from "./pages/admin"

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store/reducers";

import "./App.css";

const store = createStore(rootReducer);

const App = () => {
  return (
    <div className="main-body">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact render={() =><><Sidebar /><StartPage/></>} />
            <Route path="/order" exact render={() =><><Sidebar /><OrderPage/></>} />
            <Route path="/order/:id" exact render={(props) =><><Sidebar /><OrderPage id={props.match.params.id}/></>} />
            <Route path="/admin" exact component={AdminPage} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
