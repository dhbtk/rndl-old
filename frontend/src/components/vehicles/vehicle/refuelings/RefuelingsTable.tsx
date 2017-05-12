import { IRefueling, IState, Page } from '../../../../models';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import moment = require('moment');
import { numberStringToLocale } from '../../../../util';
import { removeRefueling } from '../../../../ducks/refueling';
import { SyntheticEvent } from 'react';

class RefuelingsTable extends React.Component<Page<IRefueling> & {dispatch: Dispatch<IState>}, void> {
    handleRemove(refueling: IRefueling, event: SyntheticEvent<HTMLAnchorElement>) {
        event.preventDefault();
        if(confirm('Remover abastecimento?')) {
            this.props.dispatch(removeRefueling(refueling));
        }
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Data</th>
                    <th>Preço/litro</th>
                    <th>Litros</th>
                    <th>Custo total</th>
                    <th>Odômetro parcial</th>
                    <th>Economia</th>
                    <th>Custo/km</th>
                    <th>Distância rastreada</th>
                    <th>Opções</th>
                </tr>
                </thead>
                <tbody>
                {this.props.content.map(refueling =>
                    <tr key={refueling.id}>
                        <td>{moment(refueling.date).format('DD/MM/YYYY')}</td>
                        <td>R$ {numberStringToLocale(refueling.liter_price)}</td>
                        <td>{numberStringToLocale(refueling.liters, 1)} L</td>
                        <td>R$ {numberStringToLocale(refueling.total_cost)}</td>
                        <td>{numberStringToLocale(refueling.odometer, 1)} km</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>
                            <a href="#" className="btn" onClick={this.handleRemove.bind(this, refueling)}><i className="fa fa-fw fa-remove"/></a>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        );
    }
}

export default connect((state: IState) => state.refuelings, dispatch => ({dispatch}))(RefuelingsTable);