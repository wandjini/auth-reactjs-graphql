import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';

import currentUserQuery from '../queries/currentUser';

export default (WrappedComponent) => {
    class RequireAuth extends Component {
        componentWillUpdate(nextProps){
            const { user, loading } = nextProps.data;
            if (!loading && !user){
                hashHistory.push('/login');
            }

        }
        

        render(){
            return <WrappedComponent {...this.props} />
        }
    }

    return graphql(currentUserQuery)(RequireAuth);

};