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
  faSearch,
  faBalanceScale,
} from "@fortawesome/free-solid-svg-icons";

// Components
import Header from "./components/Header/Header";

// Tabs
import OverView from "./Tabs/Overview";
import ShowTweets from "./Tabs/ShowTweets";
import History from "./Tabs/History";

// Constants
import Constants from "../../../constants/Constants";

// Axios
import axios from "axios";

// Context
import Context from "../../../context/Context";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      markerData: [],
    };
  }

  // Get all today's tweets
  getLiveTweets = () => {
    var today = new Date();
    // var month = (today.getMonth() + 1).toString();
    // var day = today.getDate().toString();
    var month = "05";
    var day = "13";
    if (month.length == 1) {
      month = "0" + month;
    }
    if (day.length == 1) {
      day = "0" + day;
    }
    var date = today.getFullYear() + "-" + month + "-" + day;
    axios
      .post(`${Constants.FLASK_SERVER_ENDPOINT}/api/getTweetsByDate`, {
        date: date,
      })
      .then((res) => {
        this.context.updateTodayTweets(res.data);
        this.getCoordinatesForLocations();
      });
  };

  getCoordinatesForLocations = () => {
    var tempData = this.context.todayTweets.locations;
    Object.keys(tempData).map((val) => {
      axios
        .post(`${Constants.FLASK_SERVER_ENDPOINT}/api/getCoordinates`, {
          name: val,
        })
        .then((res) => {
          if (res.data.Latitude !== undefined) {
            tempData[val]["position"] = res.data;
            this.setState({
              markerData: tempData,
            });
            this.context.setMarkerData(tempData);
          }
        });
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
                  <Nav.Link eventKey="showTweets" className="inactive-link">
                    <FontAwesomeIcon icon={faSearch} className="tabIcon mr-2" />
                    Search Tweets
                  </Nav.Link>
                  <Nav.Item>
                    <Nav.Link eventKey="history" className="inactive-link">
                      <FontAwesomeIcon
                        icon={faChartBar}
                        className="tabIcon mr-2"
                      />
                      History
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="predict" className="inactive-link">
                      <FontAwesomeIcon
                        icon={faBalanceScale}
                        className="tabIcon mr-2"
                      />
                      Predict
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
                  <Tab.Pane eventKey="showTweets">
                    <ShowTweets />
                  </Tab.Pane>
                  <Tab.Pane eventKey="history">
                    <History />
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
