import React from "react";

// Bootstrap Components
import { Row, Col, Table } from "react-bootstrap";

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
  faRetweet,
  faHashtag,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";

// Charts
import { Doughnut } from "react-chartjs-2";

// Context
import Context from "../../../../context/Context";
import ShowHashTags from "../components/Header/Modal/ShowHashTags";

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
  constructor() {
    super();
    this.state = {
      isShowHashTagsModalOpen: false,
    };
  }

  showHashTagsModal = () => {
    this.setState({
      isShowHashTagsModalOpen: true,
    });
  };
  render() {
    if (this.context.todayTweets.data !== undefined) {
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
                    <h5 className="mt-2">
                      <FontAwesomeIcon icon={faRetweet} className="mr-2" />
                      NUMBER OF TWEETS
                    </h5>
                    <h3>{this.context.todayTweets.totalTweetCount}</h3>
                    <hr />
                    <div
                      onClick={this.showHashTagsModal}
                      className="cursor-pointer"
                    >
                      <h5>
                        <FontAwesomeIcon icon={faHashtag} className="mr-2" />
                        NUMBER OF HASHTAGS
                      </h5>
                    </div>
                    <h3>
                      {Object.keys(this.context.todayTweets.hashtags).length}
                    </h3>
                    <hr />
                    <h5>
                      <FontAwesomeIcon icon={faUserAlt} className="mr-2" />
                      NUMBER OF USERS
                    </h5>
                    <h3>1300</h3>
                  </center>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}>
              <h5 className="small font-weight-bold">Recent Tweets</h5>
              <Table striped bordered hover size="sm" variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Tweet</th>
                    <th>Tone</th>
                  </tr>
                </thead>
                <tbody>
                  {this.context.todayTweets.data[0].data
                    .slice(0, 5)
                    .map((tweet, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{tweet.screenName}</td>
                          <td title={tweet.text}>
                            {tweet.text.substring(0, 8) + "..."}
                          </td>
                          <td>{"Positive"}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Col>
            <Col md={4}>
              <h5 className="small font-weight-bold">Top Influencers</h5>
              <Table striped bordered hover size="sm" variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>No Of Tweets</th>
                    <th>No Of Likes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          {/* Modal */}
          <ShowHashTags
            isOpen={this.state.isShowHashTagsModalOpen}
            handleClose={() => {
              this.setState({
                isShowHashTagsModalOpen: false,
              });
            }}
          />
        </div>
      );
    } else {
      return <p>Loading</p>;
    }
  }
}
OverView.contextType = Context;
export default OverView;
