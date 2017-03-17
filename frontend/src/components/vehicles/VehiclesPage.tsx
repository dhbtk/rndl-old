import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadVehicles} from '../../actions/vehicleActions';
import {Link} from 'react-router';
import * as moment from 'moment';
import {IVehicle, IState} from "../../models";
import Component = React.Component;

function Vehicle({vehicle}: {vehicle: IVehicle}) {
    return (
        <div className="col-sm-4">
            <div className="card card-inverse bg-primary">
                <div className="card-block">
                    <h4 className="card-title">{vehicle.name}</h4>
                    <p className="card-text">
                        Última atualização: {moment.duration(new Date().valueOf() - new Date(vehicle.latest_gps_entry.device_time).valueOf()).humanize()} atrás
                    </p>
                    <Link className="btn btn-secondary" to={'/vehicles/' + vehicle.id}>Detalhes</Link>
                </div>
            </div>
        </div>);
}

export interface IVehiclesPageProps {
    vehicles: IVehicle[],
    dispatch: Dispatch<IState>
}

class VehiclesPage extends Component<IVehiclesPageProps, undefined> {
    componentDidMount() {
        this.props.dispatch(loadVehicles());
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Veículos</h3>
                    </div>
                </div>
                <div className="row">
                    {this.props.vehicles.map((vehicle: IVehicle) => <Vehicle key={vehicle.id} vehicle={vehicle} />)}
                </div>
            </div>
        );
    }
}

export default connect(({vehicles}: {vehicles: IVehicle[]}) => ({vehicles}), (dispatch: Dispatch<IState>) => ({dispatch}))(VehiclesPage);


