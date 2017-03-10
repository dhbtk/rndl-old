import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import Home from "../components/Home.jsx";
import TripsPage from "../components/trips/TripsPage.jsx";
import TripPage from "../components/trips/TripPage.jsx";
import VehiclesPage from "../components/vehicles/VehiclesPage.jsx";
import VehiclePage from "../components/vehicles/VehiclePage.jsx";
import Login from "../components/Login.jsx";
import {store} from "../store";
import {requireAuth} from "../auth";
import {Provider} from "react-redux";
import "moment/locale/pt-br";
import App from "../components/App.jsx";
moment.locale('pt-br');

window.react = React;
window.React = React;
window.moment = moment;

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home} onEnter={requireAuth}/>
                    <Route path="/vehicles" component={VehiclesPage} onEnter={requireAuth}/>
                    <Route path="/vehicles/:id" component={VehiclePage} onEnter={requireAuth}/>
                    <Route path="/trips" component={TripsPage} onEnter={requireAuth}/>
                    <Route path="/trips/:id" component={TripPage} onEnter={requireAuth}/>
                    <Route path="/login" component={Login}/>
                </Route>
            </Router>
        </Provider>, document.getElementById('app'));
});
