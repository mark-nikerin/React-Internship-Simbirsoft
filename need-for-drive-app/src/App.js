import React from 'react' 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import MainPage from './pages/MainPage'
import OrderPage from './pages/OrderPage'

const App = () => {
  return ( 
      <>
      <Sidebar> 
      </Sidebar>
      <Router>
          <Switch> 
            <Route exact path="/" component={MainPage}/>
            <Route path="/order" component={OrderPage}/>
          </Switch>
      </Router> 
    </>
  );
}

export default App;