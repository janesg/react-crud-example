import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import GoogleAuth from './GoogleAuth';

class Header extends React.Component {
    render() {
        return (
            <div className="ui secondary pointing menu">
                <Link to="/" className="item">
                    Stream-tastic
                </Link>
                <div className="right menu">
                    <Link to="/" className="item">
                        All Streams
                    </Link>
                    <GoogleAuth />
                </div>
            </div>
        );
    }
};

const mapStateToProps = () => {
    return {
        
    };
}

export default connect(
    mapStateToProps
)(Header);