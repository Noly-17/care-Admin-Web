import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Ongoing from '../Ongoing'


class OngoingCard extends React.Component {


    render() {


        return (
            <Container style={{ minHeight: '100vh', minWidth: '100vh' }}
            >
                <Ongoing />
            </Container >
        );
    }
}

export default OngoingCard;
