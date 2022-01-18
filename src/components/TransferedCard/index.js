import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import TranferedRequest from '../Transfered'


class TransferedCard extends React.Component {


    render() {


        return (
            <Container style={{ minHeight: '100vh', minWidth: '100vh' }}
            >
                <TranferedRequest />
            </Container >
        );
    }
}

export default TransferedCard;
