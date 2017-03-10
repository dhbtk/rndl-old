import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tripActions from '../../actions/tripActions';
import * as vehicleActions from '../../actions/vehicleActions'
import moment from 'moment';
import {Link, browserHistory} from 'react-router';
import {Button, Table, Input} from 'reactstrap';

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
                        <td><Link to={'/trips/' + trip.id}><strong>{moment(new Date(trip.start_time)).format('HH:mm')}</strong></Link></td>
                        <td>{moment(trip.duration).hours() > 0 ? moment(trip.duration)
                                .format('hh [horas,] mm [minutos e] ss [segundos]') : moment(trip.duration)
                                .format('mm [minutos e] ss [segundos]')}</td>
                        <td>{(parseFloat(trip.distance) / 1000).toFixed(1)} km</td>
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

class TripsPage extends React.Component {
    constructor(props) {
        super(props);

        const currentMonth = this.props.location.query.date ? moment(this.props.location.query.date, 'YYYY-MM-DD') : moment();


        this.state = {
            currentMonth: currentMonth,
            vehicleId: this.props.location.query.vehicleId || '',
            loading: true
        };
    }

    componentDidMount() {
        this.props.actions.loadTrips(this.state.currentMonth.format('YYYY-MM-DD'), this.state.vehicleId);
        this.props.vehicleActions.loadVehicles();
    }

    componentWillReceiveProps(nextProps) {
        const delta = {};
        if (nextProps.location.query.date != this.props.location.query.date) {
            delta.currentMonth = moment(nextProps.location.query.date, 'YYYY-MM-DD');
        }
        if (nextProps.location.query.vehicleId != this.props.location.query.vehicleId) {
            delta.vehicleId = nextProps.location.query.vehicleId;
        }
        if (delta.currentMonth !== undefined || delta.vehicleId !== undefined) {
            this.setState(delta);
            const newState = Object.assign({}, this.state, delta);
            this.props.actions.loadTrips(newState.currentMonth.format('YYYY-MM-DD'), newState.vehicleId);
        }
    }

    scrollToDate(date, event) {
        event.preventDefault();
    }

    setVehicle(event) {
        console.log(event.target);
        const vehicleId = event.target.value;
        browserHistory.push(`/trips/?date=${this.state.currentMonth.format('YYYY-MM-DD')}&vehicleId=${vehicleId}`);
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
                        <Link to={'/trips?date=' + previousMonth.format('YYYY-MM-DD') + '&vehicleId=' + this.state.vehicleId}>« {previousMonth.format('MMMM [de] YYYY')}</Link>
                        <Link to={'/trips?date=' + nextMonth.format('YYYY-MM-DD') + '&vehicleId=' + this.state.vehicleId}>{nextMonth.format('MMMM [de] YYYY')} »</Link>
                    </div>
                    <div className="vehicle-filter">
                        <span>Veículo:</span>
                        <Input defaultValue={this.state.vehicleId} type="select" onChange={this.setVehicle.bind(this)}>
                            <option value="">Todos</option>
                            {this.props.vehicles.map(vehicle => <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>)}
                        </Input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 month-dates-list">
                        <h5>Datas</h5>
                        {this.props.loading ||
                        <ul>
                            {this.props.trips.map(date => <li key={date.trip_date}>
                                <a href="#" onClick={this.scrollToDate.bind(this, date)}>
                                    {moment(date.trip_date, 'YYYY-MM-DD').format('DD [de] MMMM')} ({date.count})
                                </a>
                            </li>)}
                        </ul>}
                    </div>
                    <div className="col-md-9 trips-table-list">
                        {this.props.loading ? <span className="loading">Carregando...</span> : this.props.trips.map(
                                date => <TripList key={date.trip_date} date={date}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

TripsPage.propTypes = {
    trips: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        trips: state.trips,
        vehicles: state.vehicles,
        loading: state.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(tripActions, dispatch),
        vehicleActions: bindActionCreators(vehicleActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TripsPage);
