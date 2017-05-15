import { connect, Dispatch } from 'react-redux';
import { IRefueling, IState } from '../../../../models';
import * as React from 'react';
import { Control, Form } from 'react-redux-form';
import moment = require('moment');
interface RefuelingsFormProps {
    vehicleId?: number,
    onSubmit?: (data: any) => any
}

export default class RefuelingFormBase extends React.Component<RefuelingsFormProps, void> {
    onSubmit(data: any) {
        console.log(data);
        console.log(this.formToData(data));
        if(this.props.onSubmit) {
            this.props.onSubmit(this.formToData(data));
        }
    }

    onSubmitFailed(data: any) {
        console.log('failed:', data);
    }

    formToData(data: any): IRefueling {
        return {
            id: null,
            created_at: null,
            updated_at: null,
            vehicle_id: this.props.vehicleId,
            date: moment(data.date, 'YYYY-MM-DD').toDate(),
            liter_price: data.liter_price,
            liters: data.liters,
            total_cost: data.total_cost,
            odometer: data.odometer
        }
    }

    render() {
        return (
            <Form model="form.newRefueling" onSubmit={this.onSubmit.bind(this)} onSubmitFailed={this.onSubmitFailed.bind(this)}>
                <div className="row">
                    <div className="col-sm-2">
                        <div className="form-group">
                            <label>Data</label>
                            <Control.input type="date" model=".date" className="form-control" required />
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="form-group">
                            <label>Preço do Litro</label>
                            <div className="input-group">
                                <div className="input-group-addon">R$</div>
                                <Control.input min="0" step="0.01" type="number" model=".liter_price" className="form-control" required />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="form-group">
                            <label>Litros</label>
                            <div className="input-group">
                                <Control.input min="0" step="0.01" type="number" model=".liters" className="form-control" required />
                                <div className="input-group-addon">L</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="form-group">
                            <label>Custo Total</label>
                            <div className="input-group">
                                <div className="input-group-addon">R$</div>
                                <Control.input min="0" step="0.01" type="number" model=".total_cost" className="form-control" required />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="form-group">
                            <label>Odômetro</label>
                            <div className="input-group">
                                <Control.input min="0" step="0.1" type="number" model=".odometer" className="form-control" required />
                                <div className="input-group-addon">km</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2" style={{paddingTop: '28px'}}>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Enviar</button>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }
}