import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

export class NavMenu extends Component {
    render() {
        return (       
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Coins-App</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/market-chart">Market Chart</Nav.Link>
                </Nav>
            </Navbar>
        </div>);
    }
}