import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import TransferOngoing from '../TransferOngoing';

class TransferedOngoingCard extends React.Component {


    render() {


        return (
            <Container style={{ minHeight: '100vh', minWidth: '100vh' }}
            >
                <TransferOngoing />
            </Container >
        );
    }
}

export default TransferedOngoingCard;
