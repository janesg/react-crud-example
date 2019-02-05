import React from 'react';
import _ from 'lodash';

import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    
    // As we can't rely on the list of streams having been loaded into state,
    // we fetch the single stream we're looking to edit, which then gets
    // loaded into state so we can access it
    componentDidMount = () => {
        this.props.fetchStream(this.props.match.params.id);    
    }
    
    // formValues should only contain the changes
    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }
    
    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }
        
        // Property initialValues is a specific name used with Redux Form.
        // Use lodash to pick out just the stream properties that we
        // display/can change in the form.
        // Consequence is onSubmit formValues will not contain properties
        // that we cannot change.
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                    onSubmit={ this.onSubmit } 
                    initialValues={ 
                        _.pick(this.props.stream, 'title', 'description')
                    } />
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
}

const mapDispatchToProps = {
    fetchStream,
    editStream
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StreamEdit);