import React from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import LoginMutation from '../mutations/login';
import query from '../queries/currentUser';

import AuthForm from './AuthForm';
class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state={ errors: [] };
    }
    componentWillUpdate(nextProps) {
        if(!this.props.data.user && nextProps.data.user){
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
            <h3>Login</h3>
            <AuthForm 
                errors={this.state.errors}
                onSubmit={this.onSubmit.bind(this)}/>
         </div>
        );
    }
}

export default graphql(query)( 
    graphql(LoginMutation)(LoginForm)
);