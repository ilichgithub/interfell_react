import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './views/login';
import Home from './views/home';

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/login" >
            <Login />
          </Route>
          <Route path="/home" >
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
