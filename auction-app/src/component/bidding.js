import React from 'react';
import {Table} from 'react-bootstrap';
import Bid from './bid';

export default class Bidding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "auctions": [],
            "bidPage:": Boolean,
            "auction": {},
        }
        this.onClick = this.onClick.bind(this)
    }

    componentDidMount() {
        fetch("http://skarim-bidding.test-automation1-68e10f583f026529fe7a89da40169ef4-0001.us-south.containers.appdomain.cloud/auctions", {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                auctions: data,
            });
        })
    }

    onClick(evt, auction) {
        console.log("Open Bid Page")
        this.setState({
            auction: auction,
            bidPage: true,
        })
    }

    auctions() {
        return (
            <div>
                {/* <p>{this.state.auctions}</p> */}
                <Table striped hover>
                <thead>
                    <tr>
                        <th>Auction</th>
                        <th>Item</th>
                        <th>Starting Bid Price</th>
                        <th>Place Bid</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.auctions.map(auction => (
                            <tr key={auction.ID}>
                                <td>{auction.ID}</td>
                                <td>{auction.Item}</td>
                                <td>{auction.Price}</td>
                                <td><button onClick={(e) => this.onClick(e, auction)}>Place Bid</button></td>
                            </tr>
                        ))
                    }
                </tbody>
                </Table>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.bidPage ? <Bid auctionid={this.state.auction.ID} item={this.state.auction.Item} price={this.state.auction.Price}></Bid> : this.auctions() }
                </div>
            </div>
        )
    }
}