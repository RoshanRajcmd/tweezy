import React from "react";

// Bootstrap Components
import { Row, Col } from "react-bootstrap";

// StyleSheet
import "./style.css";

import ReactSpeedometer from "react-d3-speedometer";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSmile,
  faThumbsUp,
  faThumbsDown,
  faHandPointRight,
} from "@fortawesome/free-solid-svg-icons";

// Charts
import { Doughnut } from "react-chartjs-2";

//
const data = {
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};
class OverView extends React.Component {
  render() {
    return (
      <div className="p-3">
        <Row>
          <Col md={5}>
            <div className="card">
              <div className="card-title">
                <h5 className="ml-2 mt-1">OVERALL SENTIMENT LEVEL</h5>
              </div>
              <div className="card-content">
                <Row>
                  <Col>
                    <ReactSpeedometer
                      width={250}
                      height={160}
                      needleHeightRatio={0.8}
                      value={777}
                      segmentColors={[
                        "#c0392b",
                        "#e74c3c",
                        "#f39c12",
                        "#f1c40f",
                        "#3498db",
                      ]}
                      currentValueText=""
                      customSegmentLabels={[
                        {
                          position: "INSIDE",
                          color: "#fff",
                        },
                        {
                          position: "INSIDE",
                          color: "#fff",
                        },
                        {
                          position: "INSIDE",
                          color: "#fff",
                        },
                        {
                          position: "INSIDE",
                          color: "#fff",
                        },
                        {
                          position: "INSIDE",
                          color: "#fff",
                        },
                      ]}
                      ringWidth={20}
                      needleTransitionDuration={3333}
                      needleTransition="easeElastic"
                      needleColor={"#2c3e50"}
                      textColor={"#d8dee9"}
                    />
                  </Col>
                  <Col>
                    <div className="score">
                      <h5>
                        <FontAwesomeIcon icon={faSmile} className="mr-2" />
                        4.12
                      </h5>
                      <h6>Out of 5</h6>
                      <h5 className="final-score">Positive</h5>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col>
            <div className="card">
              <div className="card-title">
                <h5>SENTIMENT BREAKDOWN</h5>
              </div>
              <div className="card-content piechart-container">
                <Doughnut data={data} className="piechart" />
                <div className="breakdown-score mt-2 ml-2">
                  <Row className="mt-4 ml-2 ">
                    <p className=" ml-3 mr-4">
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="mr-1 positive"
                      />{" "}
                      - 77%
                    </p>
                    <p>
                      <FontAwesomeIcon
                        icon={faThumbsDown}
                        className="mr-2 negative"
                      />
                      - 28%
                    </p>
                    <p className="ml-4">
                      <FontAwesomeIcon
                        icon={faHandPointRight}
                        className="mr-2 neutral"
                      />
                      - 2%
                    </p>
                  </Row>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="card">
              <div className="card-title mb-0">
                <center>
                  <h5 className="mt-2">NUMBER OF TWEETS</h5>
                  <h3>2099</h3>
                  <hr />
                  <h5>NUMBER OF HASHTAGS</h5>
                  <h3>190</h3>
                  <hr />
                  <h5>NUMBER OF USERS</h5>
                  <h3>1300</h3>
                </center>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default OverView;
