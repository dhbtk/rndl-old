import * as React from "react";
import * as ReactDOM from "react-dom";
import * as moment from "moment";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import Home from "./components/Home";
import TripsPage from "./components/trips/TripsPage";
import TripPage from "./components/trips/TripPage";
import VehiclesPage from "./components/vehicles/VehiclesPage";
import VehiclePage from "./components/vehicles/VehiclePage";
import Login from "./components/Login";
import {store} from "./store";
import {requireAuth, configureAuthentication} from "@edanniehues/devise-token-auth-redux";
import {Provider} from "react-redux";
import "moment/locale/pt-br";
import App from "./components/App";
import {pushError, pushNotice} from './ducks/flash';
import '../css/application.scss';
import RealTimePage from "./components/vehicles/vehicle/RealTimePage";
import RefuelingsPage from './components/vehicles/vehicle/RefuelingsPage';

configureAuthentication({
    pushError,
    pushNotice,
    store
});

moment.locale('pt-br');

let myWindow = window as any;
myWindow.react = React;
myWindow.React = React;
myWindow.moment = moment;

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/login" component={Login}/>
                <Route path="/" component={App}>
                    <IndexRoute component={Home} onEnter={requireAuth}/>
                    <Route path="/vehicles" component={VehiclesPage} onEnter={requireAuth}/>
                    <Route path="/vehicles/:id" component={VehiclePage} onEnter={requireAuth}>
                        <IndexRoute component={RealTimePage}/>
                        <Route path="/vehicles/:id/refuelings" component={RefuelingsPage} onEnter={requireAuth}/>
                    </Route>
                    <Route path="/trips" component={TripsPage} onEnter={requireAuth}/>
                    <Route path="/trips/:id" component={TripPage} onEnter={requireAuth}/>
                </Route>
            </Router>
        </Provider>, document.getElementById('app'));
});
