import * as React from "react";
import { useState } from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faMarker,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2hyaXNhcmFucmFqIiwiYSI6ImNrOHlhanJoeDAwODkza2w3cGpsMGw5YjEifQ.GuuUnBze_nbTo6raeeYZ1g"; // Set your mapbox token here

const markerList = [
  { lat: 17.441013, long: 78.391796, name: "ABC Hospitals", info: 10 },

  { lat: 17.442889, long: 78.396873, name: "XYZ Hospitals", info: 20 },

  { lat: 17.441681, long: 78.394357, name: "NRI Hospitals", info: 10 },
];

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 20.5937,
        longitude: 78.9629,
        zoom: 3,
      },
    };
  }

  renderPopup(index) {
    return (
      this.state.popupInfo && (
        <Popup
          tipSize={5}
          anchor="bottom-right"
          longitude={markerList[index].long}
          latitude={markerList[index].lat}
          onMouseLeave={() => this.setState({ popupInfo: null })}
          closeOnClick={true}
        >
          <p>
            <strong>{markerList[index].name}</strong>
            <br />
            Available beds:{markerList[index].info}
          </p>
        </Popup>
      )
    );
  }
  _updateViewport = (viewport) => {
    this.setState({ viewport });
  };
  render() {
    const { viewport } = this.state;

    return (
      <div>
        <ReactMapGL
          {...viewport}
          onViewportChange={this._updateViewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          width="55vw"
          height="30vw"
          mapStyle="mapbox://styles/mapbox/dark-v9"
        >
          <div className="nav">
            <NavigationControl
              onViewportChange={(viewport) => this.setState({ viewport })}
            />
            {markerList.map((marker, index) => {
              return (
                <div key={index}>
                  <Marker longitude={marker.long} latitude={marker.lat}>
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-danger"
                      style={{ fontSize: 20 }}
                      onMouseEnter={() => this.setState({ popupInfo: true })}
                      onMouseLeave={() => this.setState({ popupInfo: null })}
                    />
                  </Marker>
                  {this.renderPopup(index)}
                </div>
              );
            })}
          </div>
        </ReactMapGL>
      </div>
    );
  }
}
export default Map;
