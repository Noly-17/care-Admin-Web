import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import VerifyAccount from '../Verify Account';


class VerifyCard extends React.Component {


    render() {


        return (
            <Container style={{ minHeight: '100vh', minWidth: '100vh' }}
            >
                <VerifyAccount />
            </Container >
        );
    }
}

export default VerifyCard;
