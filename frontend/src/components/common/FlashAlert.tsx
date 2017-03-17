import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import {popNotice} from '../../actions/flashActions';
import Component = React.Component;
import {IState, IFlash} from "../../models";

export interface IFlashAlertProps {
    style?: any,

}

interface ConnectedProps {
    dispatch: Dispatch<IState>,
    flash: IFlash
}

class FlashAlert extends Component<IFlashAlertProps & ConnectedProps, undefined> {
    constructor(props: IFlashAlertProps & ConnectedProps) {
        super(props);
    }

    pop() {
        this.props.dispatch(popNotice());
    };

    render() {
        if(this.props.flash == null) {
            return null;
        }
        return (
            <div style={this.props.style}>
                <div className={'alert alert-dismissible fade show alert-' + this.props.flash.type}>
                    <button onClick={this.pop.bind(this)} className="close"><span>&times;</span></button>
                    {this.props.flash.text}
                </div>
            </div>
        )
    }
}

export default connect(({ flash }: {flash: IFlash}) => ({ flash }), (dispatch: Dispatch<IState>) => ({ dispatch }))(FlashAlert) as React.ComponentClass<IFlashAlertProps>;
