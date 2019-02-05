import React from 'react';

// Instead of using BrowserRouter, we use a plain Router and a custom history object
// This is so that we can get a reference to the history from any place in our 
// application where it can be used for programmatic navigation
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import Header from './Header';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';

const App = () => {
    return (
        <div className="ui container">
            <Router history={ history }>
                <div>
                    <Header />
                    {/* Using switch ensures only the first matching route is used */}
                    <Switch>
                        <Route path="/" exact component={ StreamList } />
                        <Route path="/streams/new" exact component={ StreamCreate } />
                        <Route path="/streams/edit/:id" exact component={ StreamEdit } />
                        <Route path="/streams/delete/:id" exact component={ StreamDelete } />
                        <Route path="/streams/:id" exact component={ StreamShow } />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;