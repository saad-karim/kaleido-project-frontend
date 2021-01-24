import React from 'react';

export default class ManageAuction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "item": null,
            "startingBid": null,
            "auctionID": null,
            "fromAddress": null,
            "startContractMsg": null,
            "closeContractMsg": null,
            "auctionWinner": null,
        }
        this.onCreateAuctionSubmit = this.onCreateAuctionSubmit.bind(this)
        this.onCloseAuctionSubmit = this.onCloseAuctionSubmit.bind(this)
    }

    updateItemInputValue(evt) {
        evt.persist()
        this.setState({
            item: evt.target.value
        });
    }

    updateBidInputValue(evt) {
        evt.persist()
        this.setState({
            startingBid: evt.target.value
        });
    }

    updateAuctionIDInputValue(evt) {
        evt.persist()
        this.setState({
            auctionID: evt.target.value
        });
    }

    onCreateAuctionSubmit(evt) {
        evt.preventDefault()
        console.log(this.state)
        const data = {
            'assetForSale': this.state.item,
            'startingBid': this.state.startingBid,
        }

        this.setState({
            startContractMsg: `Creating auction...`
        });

        fetch("https://skarim-auctionlifecycle.test-automation1-68e10f583f026529fe7a89da40169ef4-0001.us-south.containers.appdomain.cloud/start", {
            method: 'POST',
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                startContractMsg: `Contract Address: ${data.contractAddress}`
            });
        })
    }

    onCloseAuctionSubmit(evt) {
        evt.preventDefault()
        const req = {
            'contractAddress': this.state.auctionID,
        }

        fetch("https://skarim-auctionlifecycle.test-automation1-68e10f583f026529fe7a89da40169ef4-0001.us-south.containers.appdomain.cloud/close", {
            method: 'POST',
            body: JSON.stringify(req),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                closeContractMsg: `Contract ${this.state.auctionID} Closed`
            });
        })

        const url = `https://skarim-bidding.test-automation1-68e10f583f026529fe7a89da40169ef4-0001.us-south.containers.appdomain.cloud/highestbidder/${this.state.auctionID}`
        fetch(url, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            console.log('auction winner: ', data)
            this.setState({
                auctionWinner: `Auction winner: ${data.output}`
            });
        })
    }

    render() {
        return (
            <div>
                <div>
                    <h4>Start Auction</h4>
                </div>
                <center>
                    <div>
                        <form className="navbar-form form-width inline" onSubmit={(e) => this.onCreateAuctionSubmit(e)}>
                            <div>
                                <input className="form-control float-left" placeholder="Item" onChange={evt => this.updateItemInputValue(evt)} type="text" />
                            </div>
                            <div>
                                <input className="form-control float-left" placeholder="Starting Bid" onChange={evt => this.updateBidInputValue(evt)} type="text" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-md">Create Auction</button>
                        </form>
                        <div className="userMsg">
                            {this.state.startContractMsg ? <span>{this.state.startContractMsg}</span> : null }
                        </div>
                    </div>
                </center>
                <hr></hr>
                <div>
                    <h4>Close Auction</h4>
                    <center>
                        <div>
                            <form className="navbar-form form-width inline" onSubmit={(e) => this.onCloseAuctionSubmit(e)}>
                                <div>
                                    <input className="form-control float-left" placeholder="Auction ID" onChange={evt => this.updateAuctionIDInputValue(evt)} type="text" />
                                </div>
                                <button type="submit" className="btn btn-primary btn-md">Close Auction</button>
                            </form>
                            <div className="userMsg">
                                {this.state.auctionWinner ? <span>{this.state.auctionWinner}</span> : null }
                            </div>
                            <div className="userMsg">
                                {this.state.closeContractMsg ? <span>{this.state.closeContractMsg}</span> : null }
                            </div>
                        </div>
                    </center>
                </div>
            </div>
        )
    }
}