import React, { useEffect, useState } from 'react';
import { Switch, BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import SignIn from './screens/sign-in.screen';
import SignUp from './screens/sign-up.screen';
import Dashboard from './screens/dashboard.screen';

function App() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const history = useHistory();

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={(props) => <SignIn {...props} />} />
        <Route exact path="/signup" render={(props) => <SignUp {...props} />} />
        <Route exact path="/dashboard" render={(props) => <Dashboard {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
