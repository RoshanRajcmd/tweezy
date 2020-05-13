import React from "react";

// Bootstrap Components
import { Row, Col, Table, Button } from "react-bootstrap";

// StyleSheet
import "./style.css";

import ReactSpeedometer from "react-d3-speedometer";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSmile,
  faRetweet,
  faHashtag,
  faUserAlt,
  faSadTear,
  faSmileBeam,
  faAngry,
  faMeh,
} from "@fortawesome/free-solid-svg-icons";

// Charts
import { HorizontalBar } from "react-chartjs-2";

// Context
import Context from "../../../../context/Context";
import ShowHashTags from "../components/Header/Modal/ShowHashTags";
import RadarModal from "../components/Header/Modal/RadarModal";
import ShowMap from "../components/Header/Modal/ShowMap";

class OverView extends React.Component {
  constructor() {
    super();
    this.state = {
      isShowHashTagsModalOpen: false,
      isRadarModalOpen: false,
      isMapModalOpen: true,
    };
  }

  showMap = () => {
    this.setState({
      isMapModalOpen: true,
    });
  };

  showHashTagsModal = () => {
    this.setState({
      isShowHashTagsModalOpen: true,
    });
  };

  showRadarModal = () => {
    this.setState({
      isRadarModalOpen: true,
    });
  };

  render() {
    if (this.context.todayTweets.results !== undefined) {
      // Overall score calculation (out of 5)
      var overAllScore = Math.abs(
        this.context.todayTweets.overAllSentimentScore
      );
      var overAllScoreLabel = this.context.todayTweets.overAllSentimentLabel;

      var finalScore;
      var finalLabel;
      var finalLabelColor;

      if (
        overAllScore >= 0.01 &&
        overAllScore <= 0.5 &&
        overAllScoreLabel === "Negative"
      ) {
        finalScore = Math.abs(overAllScore) * 2;
        finalLabel = "Negative";
        finalLabelColor = "#c0392b";
      } else if (
        overAllScore >= 0.06 &&
        overAllScore <= 0.9 &&
        overAllScoreLabel === "Negative"
      ) {
        finalScore = Math.abs(overAllScore) * 2;
        finalLabel = "Negative";
        finalLabelColor = "#e74c3c";
      } else if (
        overAllScore >= 0.01 &&
        overAllScore <= 0.5 &&
        overAllScoreLabel === "Positive"
      ) {
        finalScore = Math.abs(overAllScore) * 2 + 3;
        finalLabel = "Positive";
        finalLabelColor = "#f1c40f";
      } else if (
        overAllScore >= 0.06 &&
        overAllScore <= 0.9 &&
        overAllScoreLabel === "Positive"
      ) {
        finalScore = Math.abs(overAllScore) * 2 + 3;
        finalLabel = "Positive";
        finalLabelColor = "#3498db";
      } else if (overAllScore === 0.0) {
        finalScore = Math.random(0, 0.6) + 2;
        finalLabelColor = "#f39c12";
        finalLabel = "Neutral";
      }

      // Get the last item in the array of objects (recent tweets)
      const recentTweetsKey = Object.keys(this.context.todayTweets.results)[
        Object.keys(this.context.todayTweets.results).length - 1
      ];
      const emotions = this.context.todayTweets.overAllEmotions;
      const results = this.context.todayTweets.overAllResults;

      //Horizontal Chart Chart Data
      const totalTweetCount = this.context.todayTweets.totalTweetCount;

      const data = {
        labels: ["Sadness", "Joy", "Fear", "Anger", "Disgust"],
        datasets: [
          {
            label: "Emotions",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [
              (emotions.sadness * 100).toFixed(0),
              (emotions.joy * 100).toFixed(0),
              (emotions.fear * 100).toFixed(0),
              (emotions.anger * 100).toFixed(0),
              (emotions.disgust * 100).toFixed(0),
            ],
          },
        ],
      };

      const randomColors = [
        {
          backgroundColor: "rgba(44, 62, 80,0.2)",
          borderColor: "rgb(52, 73, 94)",
          pointBackgroundColor: "rgb(52, 73, 94)",
          pointHoverBorderColor: "rgba(179,181,198,1)",
        },
        {
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255,99,132,1)",
        },
        {
          backgroundColor: "rgba(41, 128, 185,0.2)",
          borderColor: "rgb(52, 152, 219)",
          pointBackgroundColor: "rgb(52, 152, 219)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255,99,132,1)",
        },
      ];
      var dataset = [];
      {
        Object.keys(this.context.todayTweets.results).map((key, index) => {
          var data = this.context.todayTweets.results[key];
          var result = {};
          var emotions = data[0].emotion.document.emotion;
          result["label"] = key;
          result["backgroundColor"] = randomColors[index].backgroundColor;
          result["borderColor"] = randomColors[index].borderColor;
          result["pointBackgroundColor"] =
            randomColors[index].pointBackgroundColor;
          result["pointBorderColor"] = "#fff";
          result["pointHoverBackgroundColor"] = "#fff";
          result["pointHoverBorderColor"] =
            randomColors[index].pointHoverBackgroundColor;
          result["data"] = [
            (emotions.sadness * 100).toFixed(0),
            (emotions.joy * 100).toFixed(0),
            (emotions.fear * 100).toFixed(0),
            (emotions.anger * 100).toFixed(0),
            (emotions.disgust * 100).toFixed(0),
          ];
          dataset.push(result);
        });
      }

      const radarChartData = {
        labels: ["Sadness", "Joy", "Fear", "Anger", "Disgust"],

        datasets: dataset,
      };

      const date = Date().split(" ");
      return (
        <div className="p-3">
          <Row>
            <Col md={5}>
              <div className="card">
                <div className="card-title">
                  <Row>
                    <Col md={8}>
                      <h5 className="ml-2 mt-1">OVERALL SENTIMENT LEVEL</h5>
                    </Col>

                    <Col md={4} className="d-flex justify-content-end">
                      <p className="small text-primary cursor-pointer">
                        ({date[1] + " " + date[2] + " " + date[3]})
                      </p>
                    </Col>
                  </Row>
                </div>
                <div className="card-content">
                  <Row>
                    <Col>
                      {/* Speedometer */}
                      <ReactSpeedometer
                        width={250}
                        height={160}
                        needleHeightRatio={0.8}
                        value={finalScore * 200}
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
                        textColor={"#fff"}
                      />
                      <Row>
                        <Col>
                          <Button
                            size="sm"
                            className="mr-2"
                            onClick={this.showRadarModal}
                          >
                            Show variations
                          </Button>
                          <Button size="sm" onClick={this.showMap}>
                            Open Map
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <div className="score">
                        <h5>
                          {finalLabel === "Positive" ? (
                            <FontAwesomeIcon icon={faSmile} className="mr-2" />
                          ) : finalLabel === "Negative" ? (
                            <FontAwesomeIcon
                              icon={faSadTear}
                              className="mr-2"
                            />
                          ) : (
                            <FontAwesomeIcon icon={faMeh} className="mr-2" />
                          )}
                          {finalScore.toFixed(2)}
                        </h5>
                        <h6>Out of 5</h6>
                        <h5
                          className="final-score"
                          style={{ color: finalLabelColor }}
                        >
                          {finalLabel}
                        </h5>
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
                  <HorizontalBar data={data} />
                  {/* Emotions */}
                  <Row className="mt-3">
                    <Col>
                      <FontAwesomeIcon
                        icon={faSadTear}
                        style={{ color: "#f39c12" }}
                        title="Sadness"
                        className="ml-3 mr-2 cursor-pointer"
                      />
                      {"-  " + emotions.sadness.toFixed(2)}
                      <FontAwesomeIcon
                        icon={faSmileBeam}
                        title="Joy"
                        className="mr-2 ml-3 text-success cursor-pointer"
                      />
                      {"-  " + emotions.joy.toFixed(2)}
                      <FontAwesomeIcon
                        icon={faAngry}
                        title="Anger"
                        className="mr-2 ml-3 text-danger cursor-pointer"
                      />
                      {"-  " + emotions.anger.toFixed(2)}
                    </Col>
                  </Row>
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
                  {this.context.todayTweets.results[recentTweetsKey]
                    .slice(2, 7)
                    .map((tweet, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{tweet.screenName}</td>
                          <td title={tweet.text}>
                            {tweet.text.substring(0, 8) + "..."}
                          </td>
                          <td>{tweet.prediction}</td>
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
                    <th>Tweets</th>
                    <th>Likes</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(this.context.todayTweets.topInfluencers)
                    .slice(0, 5)
                    .map((key, index) => {
                      const influencer = this.context.todayTweets
                        .topInfluencers;
                      return (
                        <tr key={key}>
                          <td>{index + 1}</td>
                          <td>{"@" + key}</td>
                          <td>{influencer[key]["tweetCount"]}</td>
                          <td>{influencer[key]["favouriteCount"]}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Col>
            <Col>
              <h5 className="small font-weight-bold">Top Mentions</h5>
              <Table striped bordered hover size="sm" variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>No of mentions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(this.context.todayTweets.mentions)
                    .slice(0, 5)
                    .map((key, index) => {
                      const mentions = this.context.todayTweets.mentions;
                      return (
                        <tr key={key}>
                          <td>{index + 1}</td>
                          <td>{"@" + key}</td>
                          <td>{mentions[key]}</td>
                        </tr>
                      );
                    })}
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

          {/* Radar Chart Modal */}
          <RadarModal
            data={radarChartData}
            isOpen={this.state.isRadarModalOpen}
            handleClose={() => {
              this.setState({
                isRadarModalOpen: false,
              });
            }}
          />

          {/* Map Modal */}
          <ShowMap
            isOpen={this.state.isMapModalOpen}
            handleClose={() => {
              this.setState({
                isMapModalOpen: false,
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
