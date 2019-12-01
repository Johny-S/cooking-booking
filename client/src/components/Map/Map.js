import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '80%',
};

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [
        { latitude: 55.738643, longitude: 37.589588 },
        { latitude: 55.759121, longitude: 37.617706 },
        { latitude: 55.745592, longitude: 37.648765 },
        { latitude: 55.770308, longitude: 37.600157 },
        { latitude: 55.759496, longitude: 37.58161 }
      ]
    };
  }
 
  displayMarkers = () => {
    return this.props.venues.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.geo.lat,
            lng: store.geo.lng
          }}
          onClick={() => console.log('You clicked me!')}
        />
      );
    });
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{ lat: 55.749591, lng: 37.62376 }}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}


export default GoogleApiWrapper((props) => ({ apiKey: props.myKey }))(MapContainer);