import React from "react";

// Bootstrap components
import { Navbar, Form } from "react-bootstrap";

// Stylesheet
import "./Header.css";

// FontAwesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";

class Header extends React.Component {
  render() {
    return (
      <div>
        <Navbar className="navbar" sticky="top">
          <div className="navbar-bg-light">
            <h5 className="brandName">HIRE.ME</h5>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {/* Right Side content */}
          <Navbar.Collapse
            className="justify-content-end mr-5"
            id="responsive-navbar-nav"
          >
            <div>
              <FontAwesomeIcon icon={faSearch} className="inputIcon" />
              <Form.Control
                type="search"
                className="searchBar mr-4"
                placeholder="Search"
              ></Form.Control>
            </div>
            <h5 className="recruiterName mr-3">Recruiter Name</h5>
            <FontAwesomeIcon icon={faBars} className="icon" />
          </Navbar.Collapse>

          {/* <Navbar.Brand href="#home"></Navbar.Brand> */}
        </Navbar>
      </div>
    );
  }
}

export default Header;
