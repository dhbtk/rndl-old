import React from "react";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import {login, validateToken} from "@edanniehues/devise-token-auth-redux/actions";
import {Button, Form, FormGroup, Label, Input} from "reactstrap";
import FlashAlert from './common/FlashAlert.jsx';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            buttonDisabled: false
        };
    }

    componentWillMount() {
        if (!this.props.token.validated && this.props.token.token && this.props.token.token !== 'null') {
            console.log('validando', this.props.token.token);
            this.props.dispatch(validateToken(this.props.token));
        }
    }

    componentDidUpdate() {
        if (this.props.token.validated) {
            browserHistory.push(this.props.location.state ? this.props.location.state.nextPathname : '/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user === null) {
            this.setState({ buttonDisabled: false });
        }
    }

    logIn(event) {
        event.preventDefault();
        this.setState({ buttonDisabled: true });
        this.props.dispatch(login(this.state.email, this.state.password));
    }

    setFormValue(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        if (this.props.token.token != null && !this.props.token.validated) {
            return <span>Autenticando...</span>;
        }
        return (
            <div id="login-container">
                <div className="inner">
                    <img style={{ display: 'block', maxWidth: '200px', margin: '0 auto 15px' }} src="/logo.png" alt="RNDL - Really Nice Data Logger"/>
                    <FlashAlert />
                    <Form onSubmit={this.logIn.bind(this)}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" onChange={this.setFormValue.bind(this)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Senha</Label>
                            <Input type="password" name="password" id="password" onChange={this.setFormValue.bind(this)}/>
                        </FormGroup>
                        <Button type="submit" disabled={this.state.buttonDisabled} color="primary">Logar</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connect(({ token, user }) => ({ token, user }), dispatch => ({ dispatch }))(Login);
