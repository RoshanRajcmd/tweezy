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
  faPlusCircle,
  faChartBar,
  faBoxOpen,
  faStreetView,
  faMoneyBillAlt,
  faInfoCircle,
  faShoppingCart,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

// Components
import Header from "./components/Header/Header";

// Tabs
import OverView from "./Tabs/Overview.js";
class Home extends React.Component {
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
                    Post a new role
                  </Nav.Link>
                  <Nav.Item>
                    <Nav.Link eventKey="d" className="inactive-link">
                      <FontAwesomeIcon
                        icon={faChartBar}
                        className="tabIcon mr-2"
                      />
                      Manage Posts
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

export default Home;
