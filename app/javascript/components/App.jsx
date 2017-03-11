import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../actions/authActions';
import {LinkContainer} from "react-router-bootstrap";
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from "reactstrap";
import {browserHistory} from 'react-router';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.token.token == null) {
            browserHistory.push('/login');
        }
    }

    logOut(event) {
        event.preventDefault();
        this.props.actions.logout();
    }

    render() {
        if (!this.props.token.validated) {
            return this.props.children;
        }
        return (
            <div>
                <Navbar color="primary" toggleable inverse={true}>
                    <NavbarToggler right onClick={this.toggle}/>
                    <NavbarBrand href="/">
                        Torque Logs
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <LinkContainer to="/vehicles">
                                    <NavLink>Veículos</NavLink>
                                </LinkContainer>
                            </NavItem>
                            <NavItem>
                                <LinkContainer to="/trips">
                                    <NavLink>Viagens</NavLink>
                                </LinkContainer>
                            </NavItem>
                        </Nav>
                        <span className="navbar-text">{this.props.user.email}</span>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="#" onClick={this.logOut.bind(this)}>Sair</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated"
                         style={{ transition: '0.125s width ease-in-out', width: this.props.loading ? '100%' : '0%' }}></div>
                </div>
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        loading: state.loading,
        token: state.token,
        user: state.user
    };
}

function actionsToProps(dispatch) {
    return {
        actions: bindActionCreators(authActions, dispatch)
    };
}

export default connect(mapStateToProps, actionsToProps)(App);
