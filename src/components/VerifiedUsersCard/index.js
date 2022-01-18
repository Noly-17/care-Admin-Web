import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import VerifiedUsers from '../VerifiedUsers';

class VerifiedUsersCard extends React.Component {


    render() {


        return (
            <Container style={{ minHeight: '100vh', minWidth: '100vh' }}
            >
                <VerifiedUsers />
            </Container >
        );
    }
}

export default VerifiedUsersCard;
