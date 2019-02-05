import React from 'react';

import { connect } from 'react-redux';

import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
    
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    
    renderInfo() {
        if (!this.props.stream) {
            return <div>Loading...</div>;
        }
        
        const { title, description } = this.props.stream;
        
        return (
            <div>
                <h1>{ title }</h1>
                <h5>{ description }</h5>
            </div>
        )
    }
    
    render() {
        return (
            <div>
                <h2>Stream Show</h2>
                { this.renderInfo() }
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
    fetchStream    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StreamShow);