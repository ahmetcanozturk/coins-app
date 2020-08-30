import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <a href="/market-chart">Market Chart</a>
            </div>
        );
    }
}