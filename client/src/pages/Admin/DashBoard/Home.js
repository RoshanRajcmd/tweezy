import React from "react";

// Style sheet
import "./Home.css";

// Bootstarp components
import { Row, Col, Nav, Tab } from "react-bootstrap";

// Stylesheets
import "./Home.css";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faInfoCircle,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

// Components
import Header from "./components/Header/Header";

// Tabs
import OverView from "./Tabs/Overview.js";

// Constants
import Constants from "../../../constants/Constants";

// Axios
import axios from "axios";

// Context
import Context from "../../../context/Context";

class Home extends React.Component {
  // Get all today's tweets
  getLiveTweets = () => {
    axios
      .get(`${Constants.FLASK_SERVER_ENDPOINT}/api/getTweetsByDate`)
      .then((res) => {
        this.context.updateTodayTweets(res.data);
      });
  };

  componentDidMount() {
    // Get the tweets when the page is loaded
    this.getLiveTweets();
  }
  render() {
    return (
      <div>
        <Header />
        <Tab.Container id="left-tabs-example" defaultActiveKey="overview">
          <div className="sidenav">
            <div className="sidenav-inner">
              <h5 className="mb-3">NAVIGATION</h5>
              <Nav variant="pills" className="flex-column nav-links">
                <Nav.Item>
                  <Nav.Link eventKey="overview" className="inactive-link">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="tabIcon mr-2"
                    />
                    Overview
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="por" className="inactive-link">
                    <FontAwesomeIcon
                      icon={faUserTie}
                      className="tabIcon mr-2"
                    />
                    Show All Tweets
                  </Nav.Link>
                  <Nav.Item>
                    <Nav.Link eventKey="d" className="inactive-link">
                      <FontAwesomeIcon
                        icon={faChartBar}
                        className="tabIcon mr-2"
                      />
                      History
                    </Nav.Link>
                  </Nav.Item>
                </Nav.Item>
              </Nav>
            </div>
          </div>
          <div className="main-content">
            <Row>
              <Col>
                <Tab.Content>
                  <Tab.Pane eventKey="overview">
                    <OverView />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </div>
        </Tab.Container>
      </div>
    );
  }
}
Home.contextType = Context;
export default Home;
