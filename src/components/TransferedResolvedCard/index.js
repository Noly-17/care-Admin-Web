import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import TransferedResolved from '../TransferedResolved';

class TransferedResolvedCard extends React.Component {


    render() {


        return (
            <Container style={{ minHeight: '100vh', minWidth: '100vh' }}
            >
                <TransferedResolved />
            </Container >
        );
    }
}

export default TransferedResolvedCard;
