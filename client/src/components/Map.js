import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";

const ttApiKey = require('../tt-api-key');

const MAX_ZOOM = 17;

function Map() {
  const mapElement = useRef();
  const [mapLongitude, setMapLongitude] = useState(-0.624582898103651);
  const [mapLatitude, setMapLatitude] = useState(54.4916967106725);
  const [mapZoom, setMapZoom] = useState(7);
  const [map, setMap] = useState({});

  const increaseZoom = () => {
    if (mapZoom < MAX_ZOOM) {
      setMapZoom(mapZoom + 1);
    }
  };

  const decreaseZoom = () => {
    if (mapZoom > 1) {
      setMapZoom(mapZoom - 1);
    }
  };

  const updateMap = () => {
    map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
    map.setZoom(mapZoom);
  };

  useEffect(() => {
    let map = tt.map({
      key: ttApiKey,
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
    });
    var marker = new tt.Marker().setLngLat([-0.2713284100911, 50.8265866683731]).addTo(map);
    var popupOffsets = {
      top: [0, 0],
      bottom: [0, -70],
      'bottom-right': [0, -70],
      'bottom-left': [0, -70],
      left: [25, -35],
      right: [-25, -35]
    }
    
    var popup = new tt.Popup({offset: popupOffsets}).setHTML("Shoreham Beach");
    marker.setPopup(popup).togglePopup();
    setMap(map);
    return () => map.remove();
  }, []);

  return (
    <div className="App">
      <Container className="mapContainer">
        <Row>
          <Col xs="4">
            <FormGroup>
              <Label for="longitude">Longitude</Label>
              <Input
                type="text"
                name="longitude"
                value={mapLongitude}
                onChange={(e) => setMapLongitude(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="latitude">Latitude</Label>
              <Input
                type="text"
                name="latitude"
                value={mapLatitude}
                onChange={(e) => setMapLatitude(e.target.value)}
              />
            </FormGroup>
            <Col xs="12">
              <Row>Zoom</Row>
              <Row>
                <Button outline color="primary" onClick={decreaseZoom}>
                  -
                </Button>
                <div className="mapZoomDisplay">{mapZoom}</div>
                <Button outline color="primary" onClick={increaseZoom}>
                  +
                </Button>
              </Row>
            </Col>
            <Col xs="12">
              <Row className="updateButton">
                <Button color="primary" onClick={updateMap}>
                  Update Map
                </Button>
              </Row>
            </Col>
          </Col>
          <Col xs="8">
            <div ref={mapElement} className="mapDiv" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Map;