import React from 'react';
import {Router, Route, browserHistory} from 'react-router'
import Navigation from './Navigation.jsx';
import Dates from './Dates.jsx';
import Trip from './Trip.jsx';

export default class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Navigation}>
                    <Route path="/dates/:date" component={Dates}/>
                    <Route path="/trips/:id" component={Trip}/>
                </Route>
            </Router>);
    }
}
