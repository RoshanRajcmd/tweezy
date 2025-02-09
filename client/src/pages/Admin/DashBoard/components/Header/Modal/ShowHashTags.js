import React from "react";

// Bootstrap Components
import { Modal, Button, Row, Badge } from "react-bootstrap";

// Context
import Context from "../../../../../../context/Context";

class ShowHashTags extends React.Component {
  render() {
    const hashtags = this.context.todayTweets.hashtags;
    return (
      <div>
        <Modal show={this.props.isOpen} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Analyzed HashTags</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="ml-2 mr-2">
              {Object.keys(hashtags).map((key, index) => {
                return (
                  <span key={index} className="mr-5 mt-2">
                    {key + " "}
                    <Badge variant="primary">{hashtags[key]}</Badge>
                  </span>
                );
              })}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ShowHashTags.contextType = Context;
export default ShowHashTags;
