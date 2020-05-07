import React from "react";

// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import AdminLogin from "./pages/Admin/Login/Login";
import AdminHome from "./pages/Admin/DashBoard/Home";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/adminLogin" exact component={AdminLogin} />
            <Route path="/admin/home" exact component={AdminHome} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
