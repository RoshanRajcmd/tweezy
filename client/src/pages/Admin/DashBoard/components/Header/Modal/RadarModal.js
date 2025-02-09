import React from "react";

// Bootstrap
import { Modal, Button } from "react-bootstrap";

// Charts
import { Radar } from "react-chartjs-2";

class RadarModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Variantions Between Time Intervals</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Radar data={this.props.data} />
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

export default RadarModal;
