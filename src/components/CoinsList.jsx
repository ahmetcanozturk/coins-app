import React, { Component } from 'react'

const API = "https://api.coingecko.com/api/v3/"
const METHOD = "coins"

export class CoinsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.getCoinsList();
    }

    static renderItems(items) {
        let selectList = [];
        // eslint-disable-next-line array-callback-return
        // eslint-disable-next-line no-lone-blocks
        {items.map(m => {
            selectList.push(
                <>
                    <option key={m.id} value={m.id}>{m.name}</option>
                </>
            );
        })};
        return(
            <>
                <select id="coinsList" ref="coinsList">
                    {selectList}
                </select>  
            </>
        );
    }

    render() {
        var items = this.state.data;
        let contents = items.length > 0 ? CoinsList.renderItems(items) : "";
        return(
            <>
                {contents}
            </>
        );
    }

    async getCoinsList() {
        try {
            const response = await fetch(API + METHOD);
            const data = await response.json();
            this.setState({ data: data });
        }
        catch(error) {
            this.setState({ data: [] });
        }
    }
}