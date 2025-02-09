import React from "react";

// Bootstrap
import { Modal, Button } from "react-bootstrap";

// Map
import Map from "../../../components/Maps/BasicMap";

class ShowMap extends React.Component {
  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Map</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Map style={{ width: "100%" }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default ShowMap;
