import { IState, IVehicle } from '../../models';
import { connect } from 'react-redux';
import * as React from 'react';
import VehicleForm from './VehicleForm';
import { actions as formActions } from 'react-redux-form';
import { createVehicle } from '../../ducks/vehicle';
import { Dispatch } from 'redux';
import {browserHistory} from 'react-router';

class NewVehiclePage extends React.Component<{dispatch: Dispatch<IState>}, void> {
    onSubmit(vehicle: IVehicle) {
        console.log(vehicle);
        this.props.dispatch(createVehicle(vehicle) as any).then((result: any) => {
            browserHistory.push('/vehicles');
        });
    }

    componentWillMount() {
        this.props.dispatch(formActions.reset('form.vehicle'));
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>
                            Novo veículo
                        </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <VehicleForm onSubmit={this.onSubmit.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, (dispatch: Dispatch<IState>) => ({ dispatch }))(NewVehiclePage) as React.ComponentClass<{dispatch?: Dispatch<IState>}>;
