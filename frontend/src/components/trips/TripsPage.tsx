import * as React from "react";
import {connect, Dispatch} from "react-redux";
import * as moment from "moment";
import {Link, browserHistory} from "react-router";
import {IDate, ITrip, IVehicle, IState} from "../../models";
import {loadTrips} from '../../ducks/trip';
import Component = React.Component;
import {loadVehicles} from "../../ducks/vehicle";

export interface ITripListProps {
    date: IDate
}

class TripList extends Component<ITripListProps, undefined> {
    render() {
        return (
            <div className="trip-list">
                <h4 id={'date' + this.props.date.trip_date}>{moment(this.props.date.trip_date, 'YYYY-MM-DD').format('DD [de] MMMM')}</h4>
                <table className="table table-sm table-striped">
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
                    {this.props.date.trips.map((trip: ITrip) => <tr key={trip.id}>
                        <td><Link to={'/trips/' + trip.id}><strong>{moment(new Date(trip.start_time)).format('HH:mm')}</strong></Link></td>
                        <td>{moment(trip.duration).hours() > 0 ? moment(trip.duration)
                                .format('hh [horas,] mm [minutos e] ss [segundos]') : moment(trip.duration)
                                .format('mm [minutos e] ss [segundos]')}</td>
                        <td>{trip.distance ? ((trip.distance / 1000).toFixed(1) + ' km') : '-'}</td>
                        <td>{trip.average_speed ? (trip.average_speed.toFixed(0) + ' km/h') : '-'}</td>
                        <td>{trip.economy ? (trip.economy.toFixed(1) + ' km/l') : ''}</td>
                        <td>{trip.vehicle ? trip.vehicle.name : '-'}</td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export interface ITripsPageProps {
    trips: IDate[],
    vehicles: IVehicle[],
    loading: boolean,
    dispatch: Dispatch<IState>,
    location: any,
    params: any
}

export interface ITripsPageState {
    currentMonth?: any,
    vehicleId?: any,
    loading?: boolean
}

class TripsPage extends Component<ITripsPageProps, ITripsPageState> {
    constructor(props: ITripsPageProps) {
        super(props);

        const currentMonth = this.props.location.query.date ? moment(this.props.location.query.date, 'YYYY-MM-DD') : moment();


        this.state = {
            currentMonth: currentMonth,
            vehicleId: this.props.location.query.vehicleId || '',
            loading: true
        };
    }

    componentDidMount() {
        this.props.dispatch(loadTrips(this.state.currentMonth.format('YYYY-MM-DD'), this.state.vehicleId));
        this.props.dispatch(loadVehicles());
    }

    componentWillReceiveProps(nextProps: ITripsPageProps) {
        const delta: any = {};
        if (nextProps.location.query.date != this.props.location.query.date) {
            delta.currentMonth = moment(nextProps.location.query.date, 'YYYY-MM-DD');
        }
        if (nextProps.location.query.vehicleId != this.props.location.query.vehicleId) {
            delta.vehicleId = nextProps.location.query.vehicleId;
        }
        if (delta.currentMonth !== undefined || delta.vehicleId !== undefined) {
            this.setState(delta);
            const newState = Object.assign({}, this.state, delta);
            this.props.dispatch(loadTrips(newState.currentMonth.format('YYYY-MM-DD'), newState.vehicleId));
        }
    }

    setVehicle(event: React.ChangeEvent<HTMLSelectElement>) {
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
                        <Link
                            to={'/trips?date=' + previousMonth.format('YYYY-MM-DD') + '&vehicleId=' + this.state.vehicleId}>« {previousMonth.format('MMMM [de] YYYY')}</Link>
                        <Link
                            to={'/trips?date=' + nextMonth.format('YYYY-MM-DD') + '&vehicleId=' + this.state.vehicleId}>{nextMonth.format('MMMM [de] YYYY')}
                            »</Link>
                    </div>
                    <div className="vehicle-filter">
                        <span>Veículo:</span>
                        <select defaultValue={this.state.vehicleId} className="form-control" onChange={this.setVehicle.bind(this)}>
                            <option value="">Todos</option>
                            {this.props.vehicles.map((vehicle: IVehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 month-dates-list">
                        <h5>Datas</h5>
                        {this.props.loading ||
                        <ul>
                            {this.props.trips.map((date: IDate) => <li key={date.trip_date}>
                                <a href={'#date' + date.trip_date}>
                                    {moment(date.trip_date, 'YYYY-MM-DD').format('DD [de] MMMM, dddd')} ({date.count})
                                </a>
                            </li>)}
                        </ul>}
                    </div>
                    <div className="col-md-9 trips-table-list">
                        {this.props.loading ? <span className="loading">Carregando...</span> : this.props.trips.map(
                                (date: IDate) => <TripList key={date.trip_date} date={date}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({trips, vehicles, loading}: {trips: IDate[], vehicles: IVehicle[], loading: boolean}, {location, params}: {location: any, params: any}) => ({
        trips,
        vehicles,
        loading,
        location,
        params
    }),
    (dispatch: Dispatch<IState>) => ({dispatch}))(TripsPage);
