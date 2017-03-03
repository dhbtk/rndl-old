import React from 'react';
import {IndexLink} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import moment from 'moment';
import {ajax} from '../ajax';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            loading: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    startLoading() {
        this.setState({ loading: true });
    }

    stopLoading() {
        this.setState({ loading: false });
    }

    componentDidMount() {
        ajax.addListener('start-loading', this.startLoading.bind(this));
        ajax.addListener('stop-loading', this.stopLoading.bind(this));
    }

    render() {
        const date = moment().format("YYYY-MM-DD");
        return (
            <div>
                <Navbar color="primary" toggleable inverse={true}>
                    <NavbarToggler right onClick={this.toggle} />
                    <NavbarBrand href="/">
                        Torque Logs
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <LinkContainer to="/trips">
                                    <NavLink>Viagens</NavLink>
                                </LinkContainer>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" style={{transition: '0.125s width ease-in-out', width: this.state.loading ? '100%' : '0%'}}></div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
