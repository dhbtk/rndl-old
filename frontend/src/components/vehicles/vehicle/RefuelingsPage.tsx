import * as React from 'react';
import { IRefueling, IState, Page } from '../../../models';
import { connect, Dispatch } from 'react-redux';
import RefuelingsTable from './refuelings/RefuelingsTable';
import { NewRefuelingForm } from './refuelings/RefuelingsForm';
import { createRefueling, loadRefuelings } from '../../../ducks/refueling';


interface RefuelingsPageProps {
    dispatch?: Dispatch<IState>,
    newRefueling?: IRefueling,
    refueling?: IRefueling,
    refuelings?: Page<IRefueling>,
    params?: any,
}

class RefuelingsPage extends React.Component<RefuelingsPageProps, undefined> {
    componentWillMount() {
        this.props.dispatch(loadRefuelings(this.props.params.id, 1));
    }

    createNewRefueling(refueling: IRefueling) {
        this.props.dispatch(createRefueling(refueling));
    }

    render() {
        return (
            <div className="container">
                <h4>Novo abastecimento</h4>
                <NewRefuelingForm vehicleId={parseInt(this.props.params.id)} onSubmit={this.createNewRefueling.bind(this)} />
                <RefuelingsTable/>
            </div>
        );
    }
}

export default connect((state: IState): RefuelingsPageProps => {
    return {
        newRefueling: state.newRefueling,
        refueling: state.refueling,
        refuelings: state.refuelings
    };
}, (dispatch: Dispatch<IState>): RefuelingsPageProps => {
    return { dispatch };
})(RefuelingsPage);