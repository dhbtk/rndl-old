import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import Home from "../components/Home.jsx";
import TripsPage from "../components/trips/TripsPage.jsx";
import TripPage from "../components/trips/TripPage.jsx";
import VehiclesPage from "../components/vehicles/VehiclesPage.jsx";
import VehiclePage from "../components/vehicles/VehiclePage.jsx";
import configureStore from "../store";
import {Provider} from "react-redux";
import "moment/locale/pt-br";
import App from "../components/App.jsx";
moment.locale('pt-br');

window.react = React;
window.React = React;
window.moment = moment;

const store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home}/>
                    <Route path="/vehicles" component={VehiclesPage}/>
                    <Route path="/vehicles/:id" component={VehiclePage}/>
                    <Route path="/trips" component={TripsPage}/>
                    <Route path="/trips/:id" component={TripPage}/>
                </Route>
            </Router>
        </Provider>, document.getElementById('app'));
});
