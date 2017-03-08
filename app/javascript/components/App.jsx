import React from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from "reactstrap";
import moment from "moment";

export default class App extends React.Component {
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
                    </Collapse>
                </Navbar>
                {this.props.children}
            </div>
        );
    }
}
