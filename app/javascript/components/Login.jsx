import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import * as authActions from '../actions/authActions';
import {validateToken} from '../auth';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }
    componentWillMount() {
        if(!this.props.token.validated && this.props.token.token && this.props.token.token !== 'null') {
            console.log('validando', this.props.token.token);
            validateToken();
        } else if(!this.props.token.validated) {

        }
    }

    componentDidUpdate() {
        if (this.props.token.validated) {
            browserHistory.push(this.props.location.state.nextPathname);
        }
    }

    logIn() {
        this.props.actions.login("eduardo@edanni.io", "12345678");
    }

    setEmail(event) {

    }

    setPassword(event) {

    }
    
    render() {
        return (
            <div id="login-container">
                <h1>Torque Logs</h1>
                <button onClick={this.logIn.bind(this)}>Logar</button>
            </div>
        );
    }
}

export default connect(({ token, user }) => {
    return { token, user }
}, dispatch => {
    return { actions: bindActionCreators(authActions, dispatch) };
})(Login);
