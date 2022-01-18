import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Resolved from '../Resolved';

class ResolvedCard extends React.Component {


    render() {


        return (
            <Container style={{ minHeight: '100vh', minWidth: '100vh' }}
            >
                <Resolved />
            </Container >
        );
    }
}

export default ResolvedCard;
