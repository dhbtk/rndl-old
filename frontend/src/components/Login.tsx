import * as React from "react";
import {connect, Dispatch} from "react-redux";
import {browserHistory} from "react-router";
import {login, validateToken} from "@edanniehues/devise-token-auth-redux/actions";
import FlashAlert from './common/FlashAlert';
import {IState} from "../models";
import Component = React.Component;
import FormEvent = React.FormEvent;
import ChangeEvent = React.ChangeEvent;

export interface ILoginProps {
    token: any,
    user: any,
    dispatch: Dispatch<IState>,
    location?: any
}

export interface IFormDict {
    [value: string]: string
}

export interface ILoginState {
    form: IFormDict,
    buttonDisabled: boolean
}

class Login extends Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props);

        this.state = {
            form: {
                email: '',
                password: ''
            },
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

    componentWillReceiveProps(nextProps: ILoginProps) {
        if (nextProps.user === null) {
            this.setState({ buttonDisabled: false });
        }
    }

    logIn(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({ buttonDisabled: true });
        this.props.dispatch(login(this.state.form.email, this.state.form.password));
    }

    setFormValue(event: ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({form: Object.assign(this.state.form, {[name]: value})});
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
                    <form onSubmit={this.logIn.bind(this)}>
                        <div className="form-group">
                            <label>Email</label>
                            <input className="form-control" type="email" name="email" id="email" onChange={this.setFormValue.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input className="form-control" type="password" name="password" id="password" onChange={this.setFormValue.bind(this)}/>
                        </div>
                        <button type="submit" disabled={this.state.buttonDisabled} className="btn btn-primary">Logar</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(({ token, user }: {token: any, user: any}) => ({ token, user }), (dispatch: Dispatch<IState>) => ({ dispatch }))(Login);
