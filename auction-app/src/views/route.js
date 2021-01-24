import React from 'react';
import Bidding from '../component/bidding'
import Home from '../component/home'
import ManageAuction from '../component/manageauction'
import {Navbar, Nav} from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function Routes() {
    return (
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Auction App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/bidding">Bid on Auctions</Nav.Link>
                    <Nav.Link href="/manage">Manage Auctions</Nav.Link>
                </Nav>
           </Navbar>

            <Switch>
                <Route exact path="/">
                    <Home></Home>
                </Route>
                <Route exact path="/bidding">
                    <Bidding></Bidding>
                </Route>
                <Route exact path="/manage">
                    <ManageAuction></ManageAuction>
                </Route>
            </Switch>
        </Router>
    )
}