import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../Modal';
import history from '../../history';

import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
    
    // As we can't rely on the list of streams having been loaded into state,
    // we fetch the single stream we're looking to delete, which then gets
    // loaded into state so we can access it
    componentDidMount = () => {
        this.props.fetchStream(this.props.match.params.id);    
    }
    
    renderActions() {
        const { id } = this.props.match.params;
        
        // Using an enclosing <div>...</div> to wrap multiple JSX components 
        // (i.e. buttons) messes with the Semantic UI styling...so instead we 
        // use a Fragment which has no impact on DOM
        //  - <>...</> is short-cut syntax for <React.Fragment>...</React.Fragment>
        return (
            <Fragment>
                <button 
                    onClick={ () => this.props.deleteStream(id) } 
                    className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </Fragment>
        );
    }
    
    renderContent() {
        // As component is initially rendered before componentDidMount is called
        // there is a chance that the specific stream has not yet been fetched
        if (!this.props.stream) {
            return 'Are you sure you would like to delete this stream ?';
        }
        
        return `Delete stream with title of "${this.props.stream.title}" ?`;
    }
        
    render() {
        return (
            <Modal 
                title="Delete Stream"
                content={ this.renderContent() }
                actions={ this.renderActions() }
                onDismiss={ () => history.push('/') }/>
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
    deleteStream
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StreamDelete);