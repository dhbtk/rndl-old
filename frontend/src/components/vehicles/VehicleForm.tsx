import { IVehicle } from '../../models';
import * as React from 'react';
import { Form, Control } from 'react-redux-form';
interface VehicleFormProps {
    onSubmit: (vehicle: IVehicle) => void,
    vehicle?: IVehicle
}

export default class VehicleForm extends React.Component<VehicleFormProps, void> {
    onSubmit(data: any) {
        this.props.onSubmit(this.formToData(data));
    }

    formToData(data: any): IVehicle {
        return {
            name: data.name,
            torque_id: data.torque_id,
            id: this.props.vehicle ? this.props.vehicle.id : null
        };
    }

    render() {
        return (
            <Form model="form.vehicle" onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    <label htmlFor="vehicle_name">Nome</label>
                    <Control.text id="vehicle_name" model=".name" className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="vehicle_torque_id">ID do Torque</label>
                    <Control.text id="vehicle_torque_id" model=".torque_id" className="form-control" required />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Enviar</button>
                </div>
            </Form>
        );
    }
}