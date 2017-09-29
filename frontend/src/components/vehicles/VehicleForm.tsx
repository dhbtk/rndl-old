import { IState, IVehicle } from '../../models';
import * as React from 'react';
import { Form, Control, actions as formActions } from 'react-redux-form';
import { connect, Dispatch } from 'react-redux';
interface VehicleFormProps {
    onSubmit: (vehicle: IVehicle) => void,
    vehicle?: IVehicle,
    model?: any,
    dispatch?: Dispatch<IState>
}

class VehicleForm extends React.Component<VehicleFormProps, void> {
    onSubmit(data: any) {
        this.props.onSubmit(this.formToData(data));
    }

    formToData(data: any): IVehicle {
        return {
            name: data.name,
            torque_id: data.torque_id,
            id: this.props.vehicle ? this.props.vehicle.id : null,
            final_drive: data.final_drive,
            tire_diameter: data.tire_diameter,
            gear_ratios: data.gear_ratios
        };
    }

    newGear() {
        this.props.dispatch(formActions.push('form.vehicle.gear_ratios', '1.0'));
    }

    removeGear(index: number, event: React.MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();
        this.props.dispatch(formActions.remove('form.vehicle.gear_ratios', index));
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
                    <label htmlFor="vehicle_tire_diameter">
                        Diâmetro do pneu (m)
                    </label>
                    <Control.text id="vehicle_tire_diameter" model=".tire_diameter" className="form-control" required />
                </div>
                <div className="form-group">
                    <label htmlFor="vehicle_final_drive">
                        Relação do diferencial
                    </label>
                    <Control.text id="vehicle_final_drive" model=".final_drive" className="form-control" required />
                </div>
                <h4>Relações de marcha <button type="button" onClick={this.newGear.bind(this)}>Nova</button></h4>
                {this.props.vehicle.gear_ratios.map((ratio, i) => <div className="form-group" key={i}>
                    <label htmlFor={'vehicle_gear_' + i}>
                        {i + 1}a
                        <a href="#" onClick={this.removeGear.bind(this, i)} className="pull-right"><i className="fa fa-fw fa-close"></i></a>
                    </label>
                    <Control.text id={'vehicle_gear_' + i} model={`.gear_ratios[${i}]`} className="form-control"  />
                </div>)}
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Enviar</button>
                </div>
            </Form>
        );
    }
}

export default connect(
    (state: IState, props: VehicleFormProps) => {
        return {vehicle: state.form.vehicle} as VehicleFormProps
    },
    (dispatch: Dispatch<IState>) => ({dispatch}) as VehicleFormProps
)(VehicleForm) as React.ComponentClass<VehicleFormProps>;