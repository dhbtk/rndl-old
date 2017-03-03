import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import Navigation from './Navigation.jsx';
import Home from './Home.jsx';
import Trips from './Trips.jsx';
import Trip from './Trip.jsx';
import Vehicles from './Vehicles.jsx';
import Vehicle from './Vehicle.jsx';

export default class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Navigation}>
                    <IndexRoute component={Home}/>
                    <Route path="/vehicles" component={Vehicles}/>
                    <Route path="/vehicles/:id" component={Vehicle}/>
                    <Route path="/trips" component={Trips}/>
                    <Route path="/trips/:id" component={Trip}/>
                </Route>
            </Router>);
    }
}
