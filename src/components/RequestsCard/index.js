import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import DashboardRequest from '../DashboardRequest';



class RequestsCard extends React.Component {


    render() {


        return (
            <Container style={{ minHeight: '100vh', minWidth: '100vh' }}
            >
                <DashboardRequest />
            </Container >
        );
    }
}

export default RequestsCard;
