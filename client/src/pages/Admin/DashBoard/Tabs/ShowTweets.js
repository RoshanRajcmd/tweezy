import React from "react";

// Bootstrap
import {
  FormControl,
  InputGroup,
  Button,
  Row,
  Col,
  Table,
  Form,
} from "react-bootstrap";

// Stylesheet
import "./style.css";

// Context
import Context from "../../../../context/Context";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Constants
import Constants from "../../../../constants/Constants";

// Axios
import axios from "axios";

class ShowTweets extends React.Component {
  constructor() {
    super();
    this.state = {
      searchResults: [],
      searchResultsIsOpen: false,
      sentiment: "",
      date: "",
      data: [],
    };
  }

  // onchange
  handleChange = (e) => {
    if (e.target.name == "date") {
      this.formatDate(e.target.value);
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  formatDate = (date) => {
    var dateText = date.split("/")[0];
    this.setState({
      date: dateText,
    });
    this.getTweetsByDate(date);
  };

  // get tweets
  getTweetsByDate = (date) => {
    axios
      .post(`${Constants.FLASK_SERVER_ENDPOINT}/api/getTweetsByDate`, {
        date: date,
      })
      .then((res) => {
        this.setState({
          data: res.data,
        });
      });
  };

  // search tweets
  search = (e) => {
    console.log(this.state.sentiment);
    var value = e.target.value;
    const recentTweetsKey = Object.keys(this.state.data.results)[
      Object.keys(this.state.data.results).length - 1
    ];
    var tempTweets = this.state.data.results[recentTweetsKey];
    var filteredData = [];
    tempTweets
      .slice(2, this.state.data.results[recentTweetsKey].length)
      .map((val) => {
        if (val.text !== undefined) {
          if (
            val.text.toLowerCase().indexOf(value.toLowerCase().trim()) !== -1 ||
            val.screenName.toLowerCase().indexOf(value.toLowerCase().trim()) !==
              -1 ||
            val.prediction.toLowerCase().indexOf(value.toLowerCase().trim()) !==
              -1 ||
            val.prediction
              .toLowerCase()
              .indexOf(this.state.sentiment.toLowerCase().trim()) !== -1
          ) {
            filteredData.push(val);
          }
        }
      });

    if (value.trim() === "") {
      this.setState({ searchResults: [], searchResultsIsOpen: false });
    } else if (filteredData.length === 0)
      this.setState({ searchResultsIsOpen: false });
    this.setState({
      searchResults: filteredData,
      searchResultsIsOpen: true,
    });
  };

  renderTable = (tableData) => {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Username</th>
            <th>Tweet</th>
            <th>Sentiment</th>
          </tr>
        </thead>
        <tbody>
          {tableData !== undefined
            ? tableData.slice(2, 100).map((val, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val.screenName}</td>
                    <td>{val.text}</td>
                    <td>{val.prediction}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    );
  };

  //   Get the current Date
  getDate = () => {
    var today = new Date();
    var month = (today.getMonth() + 1).toString();
    var day = today.getDate().toString();
    if (month.length == 1) {
      month = "0" + month;
    }
    if (day.length == 1) {
      day = "0" + day;
    }
    var date = today.getFullYear() + "-" + month + "-" + day;
    this.setState({
      date: date,
    });

    this.getTweetsByDate(date);
  };
  componentDidMount() {
    this.getDate();
  }
  render() {
    var recentTweetsKey;
    if (this.state.data.results !== undefined) {
      recentTweetsKey = Object.keys(this.state.data.results)[
        Object.keys(this.state.data.results).length - 1
      ];
    }
    return (
      <div>
        <div className="searchContainer">
          <h5 className="header-text">Search Tweets</h5>
          <Row className="searchWrapper border border-muted m-2">
            <Col md={3} className="pt-2">
              <Form.Label className="filter-label">SELECT DATE</Form.Label>
              <Form.Control
                type="date"
                name="date"
                onChange={this.handleChange}
              />
            </Col>
            <Col className="pt-2">
              <Form.Label className="filter-label">SEARCH TWEETS</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search by hashtags and username"
                  onChange={this.search}
                />
              </InputGroup>
            </Col>
            <Col md={3} className="pt-2">
              <Form.Label className="filter-label">FILTER BY</Form.Label>
              <Form.Control
                as="select"
                name="sentiment"
                onChange={this.handleChange}
              >
                <option>----</option>
                <option>Positive</option>
                <option>Negative</option>
                <option>Neutral</option>
              </Form.Control>
            </Col>
            <Col md={1} className="searchButton">
              <Button variant="success" className="searchButton">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Col>
          </Row>
          <hr />

          <div className="mt-2 ml-2 mr-4">
            {this.state.data.results !== undefined &&
            !this.state.searchResultsIsOpen
              ? this.renderTable(this.state.data.results[recentTweetsKey])
              : this.state.searchResultsIsOpen
              ? this.renderTable(this.state.searchResults)
              : null}
          </div>
        </div>
      </div>
    );
  }
}
ShowTweets.contextType = Context;
export default ShowTweets;
