import * as React from "react";
import { useState } from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faMarker,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

// Context
import Context from "../../../../../context/Context";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2hyaXNhcmFucmFqIiwiYSI6ImNrOHlhanJoeDAwODkza2w3cGpsMGw5YjEifQ.GuuUnBze_nbTo6raeeYZ1g"; // Set your mapbox token here

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
      popupInfo: null,
    };
  }

  renderPopup(key) {
    return (
      this.state.popupInfo && (
        <Popup
          tipSize={5}
          anchor="bottom-right"
          longitude={this.context.markerData[key].position.Longitude}
          latitude={this.context.markerData[key].position.Latitude}
          onMouseLeave={() => this.setState({ popupInfo: null })}
          closeOnClick={true}
        >
          <p>
            <strong>{this.context.markerData[key].negative}</strong>
            <br />
            Positive:{this.context.markerData[key].positive}
          </p>
        </Popup>
      )
    );
  }
  _updateViewport = (viewport) => {
    this.setState({ viewport });
  };

  render() {
    console.log(this.context.markerData);
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
            {Object.keys(this.context.markerData).map((key, index) => {
              const marker = this.context.markerData[key];
              if (marker.position !== undefined) {
                var color;
                if (marker.positive > marker.negative) color = "text-success";
                else if (marker.negative > marker.positive)
                  color = "text-danger";
                else color = "text-warning";
                return (
                  <div key={key}>
                    <Marker
                      longitude={marker.position.Longitude}
                      latitude={marker.position.Latitude}
                    >
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className={`${color}`}
                        style={{ fontSize: 20 }}
                        onMouseEnter={() => this.setState({ popupInfo: true })}
                        onMouseLeave={() => this.setState({ popupInfo: null })}
                      />
                    </Marker>
                    {this.renderPopup(key)}
                  </div>
                );
              }
            })}
            {/* {markerData.map((marker, index) => {
              return (
                <div key={index}>
                  <Marker
                    longitude={marker.position.Longitude}
                    latitude={marker.position.Latitude}
                  >
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
            })} */}
          </div>
        </ReactMapGL>
      </div>
    );
  }
}
Map.contextType = Context;
export default Map;
