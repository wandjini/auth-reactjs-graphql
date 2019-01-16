import React from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import SignupMutation from '../mutations/signup';
import query from '../queries/currentUser';

import AuthForm from './AuthForm';
class SignupForm extends React.Component {
    constructor(props){
        super(props);
        this.state={ errors: [] };
    }
    componentWillUpdate(nextProps){
        if(nextProps.data.user && !this.props.data.user) {
            hashHistory.push('/dashboard');
        }
    }
    onSubmit({email, password}){
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        })
        .catch(res => { 
            const errors = res.graphQLErrors.map(error => error.message );    
            this.setState({ errors });
        });
    }
    render(){
        return (
         <div>
            <h3>Signup</h3>
            <AuthForm 
                errors={this.state.errors} 
                onSubmit={this.onSubmit.bind(this)}
            />
         </div>
        );
    }
}

export default graphql(query)( 
    graphql(SignupMutation)(SignupForm)
);