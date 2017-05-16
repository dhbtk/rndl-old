import { IState, IVehicle } from '../../models';
import { connect, Dispatch } from 'react-redux';
import * as React from 'react';
import { loadVehicle, updateVehicle } from '../../ducks/vehicle';
import { browserHistory } from 'react-router';
import VehicleForm from './VehicleForm';
interface PageProps {
    vehicle?: IVehicle,
    dispatch?: Dispatch<IState>,
    params?: any
}

class EditVehiclePage extends React.Component<PageProps, void> {
    componentWillMount() {
        this.props.dispatch(loadVehicle(this.props.params.id));
    }

    onSubmit(vehicle: IVehicle) {
        this.props.dispatch(updateVehicle(vehicle) as any).then(() => browserHistory.push(`/vehicles/${vehicle.id}`));
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Editar Veículo</h2>
                    </div>
                </div>
                {this.props.vehicle && <div className="row">
                    <div className="col-sm-4">
                        <VehicleForm vehicle={this.props.vehicle} onSubmit={this.onSubmit.bind(this)}/>
                    </div>
                </div>}
            </div>
        );
    }
}

export default connect(
    state => ({ vehicle: state.vehicle } as PageProps),
    dispatch => ({ dispatch } as PageProps))(EditVehiclePage);