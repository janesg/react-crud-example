import React from 'react';
import { connect } from 'react-redux';

import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {

    // Using redux-form we don't need to handle events or preventDefault
    onSubmit = (formValues) => {
        // console.log(formValues);
        this.props.createStream(formValues);
    }
    
    render() {
        // We have to add class name of error to form to have error messages show up
        return (
            <div>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={ this.onSubmit } />
            </div>
        );
    }
}

const mapDispatchToProps = {
    createStream
};

export default connect(
    null,
    mapDispatchToProps
)(StreamCreate);