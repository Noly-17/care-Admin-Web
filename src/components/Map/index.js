import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker, Circle } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};



export class MapContainer extends Component {
    render() {

        return (
            <>
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={
                        {
                            lat: this.props.lat,
                            lng: this.props.lng
                        }
                    }
                >
                    <Marker
                        position={
                            {
                                lat: this.props.lat,
                                lng: this.props.lng
                            }
                        }
                    />

                </Map>
            </>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBS6XgsOc5WIKnbVgogjC_xtJxJrfw6gHo'
})(MapContainer);