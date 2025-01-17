import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import { NavMenu } from './NavMenu'

export class Layout extends Component {
    render() {
        return (
            <div>
                <NavMenu />
                <Container fluid className="mt-4">
                    {this.props.children}
                </Container>
            </div>
        );
    }
}