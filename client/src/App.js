// React
import React from "react";

// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import AdminLogin from "./pages/Admin/Login/Login";
import AdminHome from "./pages/Admin/DashBoard/Home";

// Context
import Context from "./context/Context";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todayTweets: {},
      markerData: [],
    };
  }

  // Function to update today's tweets
  updateTodayTweets = (data) => {
    this.setState({
      todayTweets: data,
    });
  };

  // Set marker data
  setMarkerData = (data) => {
    this.setState({
      markerData: data,
    });
  };
  // sleep function
  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          updateTodayTweets: this.updateTodayTweets,
          setMarkerData: this.setMarkerData,
          sleep: this.sleep,
        }}
      >
        <div>
          <Router>
            <Switch>
              <Route path="/adminLogin" exact component={AdminLogin} />
              <Route path="/admin/home" exact component={AdminHome} />
            </Switch>
          </Router>
        </div>
      </Context.Provider>
    );
  }
}
export default App;
