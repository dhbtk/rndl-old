import * as React from 'react';
import { IRefueling, IState, Page } from '../../../models';
import { connect, Dispatch } from 'react-redux';
import RefuelingsTable from './refuelings/RefuelingsTable';
import  NewRefuelingForm from './refuelings/RefuelingsForm';
import { createRefueling, loadRefuelings } from '../../../ducks/refueling';
import { ChangeEvent } from 'react';


interface RefuelingsPageProps {
    dispatch?: Dispatch<IState>,
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
                <div className="row">
                    <div className="col-sm-12">
                        <h6>Novo abastecimento</h6>
                        <NewRefuelingForm vehicleId={parseInt(this.props.params.id)} onSubmit={this.createNewRefueling.bind(this)} />
                        <RefuelingsTable/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state: IState): RefuelingsPageProps => {
    return {
        refuelings: state.refuelings
    };
}, (dispatch: Dispatch<IState>): RefuelingsPageProps => {
    return { dispatch };
})(RefuelingsPage);

interface DecimalInputProps {
    onChange?: (event: any) => any,
    type?: string,
    initialValue?: number,
    className?: string
}