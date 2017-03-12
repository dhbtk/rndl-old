import React from 'react';
import {connect} from 'react-redux';
import {popNotice, popError} from '../../actions/flashActions';
import {Alert} from 'reactstrap';

class FlashAlert extends React.Component {
    constructor(props) {
        super(props);
    }

    pop() {
        this.props.dispatch(popNotice());
    };

    popError() {
        this.props.dispatch(popError());
    };

    render() {
        if(this.props.flash == null) {
            return null;
        }
        return (
            <div style={this.props.style}>
                <Alert color={this.props.flash.type} toggle={this.pop.bind(this)}>{this.props.flash.text}</Alert>
            </div>
        )
    }
}

export default connect(({ flash }) => ({ flash }), dispatch => ({ dispatch }))(FlashAlert);
