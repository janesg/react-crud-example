import React from 'react';

import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    
    componentDidMount = () => {
        // Load the required part of the Google API
        // In the callback that gets invoked once load is complete, we initalise
        // using the client id generated in the Google Developer's Console
        //  - https://console.developers.google.com/apis/credentials?project=stream-tastic
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '752391798347-1l4rb0kfis32r53ifufm90e46q0a4ndk.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
    
    onAuthChange = (isSignedIn) => {
        // Reflect the signIn/signOut change in the store's state
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());            
        } else {
            this.props.signOut();            
        }
    }
    
    onSignInClick = () => {
        // Invoke the Google Auth2 sign-in flow
        // - change will be communicated via onAuthChange
        this.auth.signIn();
    }
    
    onSignOutClick = () => {
        // Invoke the Google Auth2 sign-out
        // - change will be communicated via onAuthChange
        this.auth.signOut();
    }
    
    renderAuthButton = () => {
        if (this.props.isSignedIn === null) {
            return;
        } else if (this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={ this.onSignOutClick }>
                    <i className="icon google" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button className="ui blue google button" onClick={ this.onSignInClick }>
                    <i className="icon google" />
                    Sign In with Google
                </button>
            );
        }
    }
    
    render() {
        return (
            <div>{ this.renderAuthButton() }</div>
        );
    }
}

const mapDispatchToProps = {
    signIn,
    signOut
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GoogleAuth);