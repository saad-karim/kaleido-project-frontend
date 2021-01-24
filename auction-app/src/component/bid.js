import React from 'react';

export default class Bid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "bid": null,
            "highestBid": null,
            "bidHistory": [{}],
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        let url = `http://skarim-bidding.test-automation1-68e10f583f026529fe7a89da40169ef4-0001.us-south.containers.appdomain.cloud/bidhistory/${this.props.auctionid}`
        fetch(url, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            console.log('bid history data: ', data)
            this.setState({
                bidHistory: data,
            })
            // this.state.bidHistory.push(data)
            console.log('bidHistory: ', this.state.bidHistory)
        })

        url = `http://skarim-bidding.test-automation1-68e10f583f026529fe7a89da40169ef4-0001.us-south.containers.appdomain.cloud/currentbid/${this.props.auctionid}`
        fetch(url, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            console.log('currentbid resp: ', data)
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
        const data = {
            "user": this.state.user,
            "amount": this.state.bid,
        }

        const url = `http://skarim-bidding.test-automation1-68e10f583f026529fe7a89da40169ef4-0001.us-south.containers.appdomain.cloud/placebid/${this.props.auctionid}`
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            let url = `http://skarim-bidding.test-automation1-68e10f583f026529fe7a89da40169ef4-0001.us-south.containers.appdomain.cloud/bidhistory/${this.props.auctionid}`
            fetch(url, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                console.log('bid history data: ', data)
                this.setState({
                    bidHistory: data,
                })
                // this.state.bidHistory.push(data)
                console.log('bidHistory: ', this.state.bidHistory)
            })
        })
    }

    render() {
        return (
            <div>
                <div className="floatleft bidding-history">
                    <h3>Bidding History</h3>
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
                    <div>Item: {this.props.item}</div>
                    <div>Starting Bid Price: {this.props.price}</div>
                    <div>Highest Bid Placed: {this.state.highestBid}</div>
                    <form className="navbar-form form-width inline" onSubmit={(e) => this.placeBid(e)}>
                        <div>
                            <input className="form-control float-left" placeholder="Bid" onChange={evt => this.bidInputValue(evt)} type="text" />
                        </div>
                        <div>
                            <input className="form-control float-left" placeholder="User ID" onChange={evt => this.userInputValue(evt)} type="text" />
                        </div>
                        <button type="submit" className="btn btn-primary btn-md">Place Bid</button>
                    </form>
                </div>
            </div>
        )
    }
}