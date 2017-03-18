import * as React from "react";
import {connect, Dispatch} from "react-redux";
import * as authActions from "@edanniehues/devise-token-auth-redux/actions";
import {browserHistory, Link} from "react-router";
import FlashAlert from "./common/FlashAlert";
import {IState} from "../models";
import Component = React.Component;

export interface IAppProps {
    loading: boolean,
    token: any,
    user: any,
    dispatch: Dispatch<IState>
}

export interface IAppState {
    isOpen: boolean
}

class App extends Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
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

    componentWillReceiveProps(nextProps: IAppProps) {
        if (nextProps.token.token == null) {
            browserHistory.push('/login');
        }
    }

    logOut(event: any) {
        event.preventDefault();
        this.props.dispatch(authActions.logout());
    }

    render() {
        if (!this.props.token.validated) {
            return this.props.children as JSX.Element;
        }
        return (
            <div>
                <nav className="navbar navbar-toggleable-md bg-primary navbar-inverse">
                    <button className="navbar-toggler navbar-toggler-right" onClick={this.toggle}><span className="navbar-toggler-icon"/></button>
                    <Link className="navbar-brand" to="/">RNDL</Link>
                    <div className={'navbar-collapse' + (this.state.isOpen ? '' : ' collapse')}>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/vehicles" className="nav-link">Veículos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/trips" className="nav-link">Viagens</Link>
                            </li>
                        </ul>
                        <span className="navbar-text">{this.props.user.email}</span>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href="#" className="nav-link" onClick={this.logOut.bind(this)}>Sair</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated"
                         style={{ transition: '0.125s width ease-in-out', width: this.props.loading ? '100%' : '0%' }}></div>
                </div>
                <div className="container"><FlashAlert style={{padding: '10px 0'}}/></div>
                {this.props.children}
            </div>
        );
    }
}

export default connect(
    ({loading, token, user}: {loading: boolean, token: any, user: any}): any => {
        return {loading, token, user};
}, (dispatch: Dispatch<IState>): any => ({dispatch}))(App);

