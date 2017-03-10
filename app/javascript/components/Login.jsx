import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import * as authActions from '../actions/authActions';

class Login extends React.Component {
    componentWillMount() {
        this.props.actions.login("eduardo@edanni.io", "12345678");
        console.log(this.props);
    }

    componentDidUpdate() {
        if (this.props.token.validated) {
            browserHistory.push(this.props.location.state.nextPathname);
        }
    }

    render() {
        return <h1>Logando...</h1>;
    }
}

export default connect(({ token, user }) => {
    return { token, user }
}, dispatch => {
    return { actions: bindActionCreators(authActions, dispatch) };
})(Login);
