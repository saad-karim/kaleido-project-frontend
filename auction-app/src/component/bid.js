import React from 'react';

export default class Bid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "highestBid": null,
            "bidHistory": [],
            "placingBid": false,
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.bidHistory = this.bidHistory.bind(this)
        this.currentBid = this.currentBid.bind(this)
        this.placeBid = this.placeBid.bind(this)
    }

    componentDidMount() {
        this.bidHistory()
        this.currentBid()
    }

    bidHistory() {
        const url = `https://skarim-bidding.test-automation1-68e10f583f026529fe7a89da40169ef4-0001.us-south.containers.appdomain.cloud/bidhistory/${this.props.auctionid}`
        fetch(url, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                bidHistory: data,
            })
        })
    }

    currentBid() {
        const url = `https://skarim-bidding.test-automation1-68e10f583f026529fe7a89da40169ef4-0001.us-south.containers.appdomain.cloud/currentbid/${this.props.auctionid}`
        fetch(url, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                highestBid: data.output,
            })
        })
    }

    bidInputValue(evt) {
        evt.persist()
        this.setState({
            bid: evt.target.value
        });
    }

    userInputValue(evt) {
        evt.persist()
        this.setState({
            user: evt.target.value
        });
    }

    placeBid(evt) {
        evt.preventDefault()

        this.setState({
            placingBid: true,
        });

        const data = {
            "user": this.state.user,
            "amount": this.state.bid,
        }

        const url = `https://skarim-bidding.test-automation1-68e10f583f026529fe7a89da40169ef4-0001.us-south.containers.appdomain.cloud/placebid/${this.props.auctionid}`
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
        })
        .then(() => {
            this.setState({
                placingBid: false,
                bid: null,
                user: null,
            });

            this.bidHistory()
            this.currentBid()
        })
    }

    render() {
        return (
            <div>
                <div className="floatleft bidding-history">
                    <h3><center>Bidding Amount History</center></h3>
                    {
                        this.state.bidHistory.map((history, index) => (
                            <div className="bid" key={index}>
                                <div>Bidder: {history.bidder}</div>
                                <div>Amount: {history.amount}</div>
                            </div>
                        ))
                    }
                </div>
                <div className="floatleft">
                    <div className="placebid">
                        <h3><center>Bid on Item:</center></h3>
                        <div className="padding"><b>Item: </b>{this.props.item}</div>
                        <div className="padding"><b>Starting Bid Price: </b>{this.props.price}</div>
                        <div className="padding"><b>Highest Bid Placed: </b>{this.state.highestBid}</div>
                        <form className="navbar-form form-width inline" onSubmit={(e) => this.placeBid(e)}>
                            <div>
                                <input className="form-control float-left" placeholder="Bid" onChange={evt => this.bidInputValue(evt)} type="text" />
                            </div>
                            <div>
                                <input className="form-control float-left" placeholder="User ID" onChange={evt => this.userInputValue(evt)} type="text" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-md">Place Bid</button>
                        </form>
                        <div className="placebid-msg">
                            {this.state.placingBid ? <center><span>Placing Bid...</span></center> : null }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}