import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import CanvasJSReact from '../lib/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const API = "https://api.coingecko.com/api/v3/"
const METHOD = "coins"
const ACTION = "market_chart"

export class MarketChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coins:[], items: []
        };

        this.coinsList = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
    }

    handleSubmit() {
        var days = 1;
        var coin = "bitcoin";
        
        if (this.coinsList.current)
            coin = this.coinsList.current.value;
        if (this.refs.days)
            days = this.refs.days.value;
        this.getChartData(coin, days);
    }

    static renderItems(items) {
        var dataPoints = [];
        var i = 0;

        items.forEach(function(item) {
            dataPoints.push({
                x: i++,
                y: item[1]
            });
        });

        const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Market Caps"
			},
			axisY: {
				title: "Market Cap"
			},
			axisX: {
				title: "Time"
			},
			data: [{
				type: "line",
				toolTipContent: "{x}: {y}",
				dataPoints: dataPoints
			}]
        };
        return(
            <div>
                <CanvasJSChart options = {options} />
            </div>
        );
    }

    render() {
        var days = [];
        for (var i = 1; i<366; i++) {
            days.push(i);
        }
        var optionDays = [];
        // eslint-disable-next-line array-callback-return
        days.map(d => {
            optionDays.push(<option key={d} value={d}>{d} days</option>)
        });

        const items = this.state.items;

        let contents = items && items.length > 0 ? MarketChart.renderItems(items) : "";
        return(
            <>
                <div className="d-flex flex-row">
                    <div className="mt-2">
                        <select id="coinsList" ref={this.coinsList}>
                            <option key="bitcoin" value="bitcoin">Bitcoin</option>
                            <option key="ethereum" value="ethereum">Ethereum</option>
                            <option key="tether" value="tether">Tether</option>
                            <option key="litecoin" value="litecoin">Litecoin</option>
                        </select>  
                    </div>
                    <div className="mt-2 ml-1">
                        <select id="days" ref="days">
                            {optionDays}
                        </select>
                    </div>
                    <div className="ml-1">
                        <Button variant="primary" onClick={this.handleSubmit}>Show</Button>
                    </div>
                </div>
                <div>
                    {contents}
                </div>
            </>
        );
    }

    async getChartData(coin, days) {
        var items = [];
        let query = "/" + coin + "/" + ACTION + "?vs_currency=usd&days=" + days;
        try {
            const response = await fetch(API + METHOD + query);
            const data = await response.json();
            items = data.prices;
        }
        catch(error) {
            alert(error);
        }
        this.setState({ items: items });
    }
}