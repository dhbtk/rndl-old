import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';
import {AppDispatcher} from '../dispatcher';
import {TripStore} from '../stores/TripStore';
import {Button, Table} from 'reactstrap';

class TripList extends React.Component {
    render() {
        return (
            <div className="trip-list">
                <h4 data-date={this.props.date.trip_date}>{moment(this.props.date.trip_date, 'YYYY-MM-DD').format('DD [de] MMMM')}</h4>
                <Table size="sm" striped>
                    <thead>
                    <tr>
                        <th>Hora</th>
                        <th>Duração</th>
                        <th>Distância (km)</th>
                        <th>Velocidade Média (km/h)</th>
                        <th>Economia (km/l)</th>
                        <th>Veículo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.date.trips.map(trip => <tr key={trip.id}>
                        <td><Link to={'/trips/' + trip.id}>{new Date(trip.start_time).toLocaleTimeString()}</Link></td>
                        <td>{moment(trip.duration).format('hh:mm')}</td>
                        <td>{(parseFloat(trip.distance)/1000).toFixed(1)} km</td>
                        <td>{parseFloat(trip.average_speed).toFixed(0)} km/h</td>
                        <td>{parseFloat(trip.economy).toFixed(1)} km/l</td>
                        <td>{trip.vehicle}</td>
                    </tr>)}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default class Trips extends React.Component {
    constructor(props) {
        super(props);

        const currentMonth = this.props.location.query.date ? moment(this.props.location.query.date, 'YYYY-MM-DD') : moment();


        this.state = {
            currentMonth: currentMonth,
            loading: false,
            dates: [],
            trips: []
        }
    }

    componentDidMount() {
        TripStore.addListener('trips-loaded', this.setTrips.bind(this));
        AppDispatcher.dispatch({
            actionName: 'list-trips',
            date: this.state.currentMonth
        });
    }

    componentWillUnmount() {
        TripStore.removeListener('trips-loaded');
    }

    setTrips() {
        const data = TripStore.getAll();
        this.setState({ trips: data });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.query.date != this.props.location.query.date) {
            const newCurrentMonth = moment(nextProps.location.query.date, 'YYYY-MM-DD');
            this.setState({ currentMonth: newCurrentMonth, trips: [] });
            AppDispatcher.dispatch({
                actionName: 'list-trips',
                date: newCurrentMonth
            });
        }
    }

    scrollToDate(date, event) {

    }

    render() {
        const currentMonth = this.state.currentMonth;
        const previousMonth = currentMonth.clone();
        previousMonth.subtract(1, 'month');
        const nextMonth = currentMonth.clone();
        nextMonth.add(1, 'month');
        return (
            <div className="container-fluid">
                <div className="dates-header">
                    <h3>{currentMonth.format('MMMM [de] YYYY')}</h3>
                    <div className="links">
                        <Link to={'/trips?date=' + previousMonth.format('YYYY-MM-DD')}>« {previousMonth.format('MMMM [de] YYYY')}</Link>
                        <Link to={'/trips?date=' + nextMonth.format('YYYY-MM-DD')}>{nextMonth.format('MMMM [de] YYYY')} »</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 month-dates-list">
                        <h5>Datas</h5>
                        <ul>
                            {this.state.trips.map(date => <li key={date.trip_date}>
                                <a href="#" onClick={this.scrollToDate.bind(this, date)}>
                                    {moment(date.trip_date, 'YYYY-MM-DD').format('DD [de] MMMM')} ({date.count})
                                </a>
                            </li>)}
                        </ul>
                    </div>
                    <div className="col-md-9 trips-table-list">
                        {this.state.trips.map(date => <TripList key={date.trip_date} date={date} />)}
                    </div>
                </div>
            </div>
        );
    }
}
