import React from "react";

// Chart
import { Line } from "react-chartjs-2";

// Constants
import Constants from "../../../../constants/Constants";

// Axios
import axios from "axios";
// Boostrap
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

class History extends React.Component {
  constructor() {
    super();
    this.state = {
      overAllData: [],
      labels: [],
      sadness: [],
      joy: [],
      anger: [],
      fear: [],
      disgust: [],
    };
  }
  componentDidMount() {
    this.getAllData();
  }

  getAllData = () => {
    axios
      .get(`${Constants.FLASK_SERVER_ENDPOINT}/api/getAllTweets`)
      .then((res) => {
        this.setState({
          overAllData: res.data,
        });
        this.renderData();
      });
  };

  renderData = () => {
    var labels = [];
    var sadness = [];
    var anger = [];
    var joy = [];
    var disgust = [];
    var fear = [];
    Object.keys(this.state.overAllData).map((val) => {
      var data = this.state.overAllData;
      labels.push(val);
      sadness.push(data[val].sadness * 100).toFixed(0);
      joy.push(data[val].joy * 100).toFixed(0);
      anger.push(data[val].anger * 100).toFixed(0);
      disgust.push(data[val].disgust * 100).toFixed(0);
      fear.push(data[val].fear * 100).toFixed(0);
    });

    this.setState({
      labels: labels,
      sadness: sadness,
      anger: anger,
      joy: joy,
      disgust: disgust,
      fear: fear,
    });
  };
  render() {
    var sadnessData = {
      labels: this.state.labels,
      datasets: [
        {
          label: "Sadness",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(211, 84, 0,0.4)",
          borderColor: "rgba(211, 84, 0,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(211, 84, 0,1.0)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(211, 84, 0,1.0)",
          pointHoverBorderColor: "rgba(211, 84, 0,1.0)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.sadness,
        },
      ],
    };
    var joyData = {
      labels: this.state.labels,
      datasets: [
        {
          label: "Joy",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(22, 160, 133,0.4)",
          borderColor: "rgba(22, 160, 133,1.0)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(22, 160, 133,1.0)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(22, 160, 133,1.0)",
          pointHoverBorderColor: "rgba(22, 160, 133,1.0)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.joy,
        },
      ],
    };
    var angerData = {
      labels: this.state.labels,
      datasets: [
        {
          label: "Anger",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(192, 57, 43,0.4)",
          borderColor: "rgba(192, 57, 43,1.0)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(192, 57, 43,1.0)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(192, 57, 43,1.0)",
          pointHoverBorderColor: "rgba(192, 57, 43,1.0)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.anger,
        },
      ],
    };
    var disgustData = {
      labels: this.state.labels,
      datasets: [
        {
          label: "Disgust",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(243, 156, 18,0.4)",
          borderColor: "rgba(243, 156, 18,1.0)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(243, 156, 18,1.0)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(243, 156, 18,1.0)",
          pointHoverBorderColor: "rgba(243, 156, 18,1.0)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.disgust,
        },
      ],
    };
    var fearData = {
      labels: this.state.labels,
      datasets: [
        {
          label: "Fear",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(41, 128, 185,0.4)",
          borderColor: "rgba(41, 128, 185,1.0)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(41, 128, 185,1.0)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(41, 128, 185,1.0)",
          pointHoverBorderColor: "rgba(41, 128, 185,1.0)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.fear,
        },
      ],
    };
    return (
      <div className="m-3 ml-4">
        <h5 className="header">
          <FontAwesomeIcon icon={faChartBar} className="mr-2" />
          OVERALL HISTORY
        </h5>
        <hr />
        <Row>
          <Col className="seperate-charts mr-4" md={5}>
            <Line data={sadnessData} />
          </Col>
          <Col className="seperate-charts mr-4" md={5}>
            <Line data={angerData} />
          </Col>
          <Col className="seperate-charts mr-4 mt-2" md={5}>
            <Line data={joyData} />
          </Col>
          <Col className="seperate-charts mr-4 mt-2" md={5}>
            <Line data={disgustData} />
          </Col>
          <Col className="seperate-charts mr-4 mt-2" md={5}>
            <Line data={fearData} />
          </Col>
        </Row>
      </div>
    );
  }
}
export default History;
