import React, { Component } from 'react';
import  { graphql } from 'react-apollo';
import mutation from '../mutations/logout';

import { Link } from 'react-router';

import query from '../queries/currentUser';
class Header extends Component{
    onLogout(event){
        event.preventDefault();
        this.props.mutate({
            refetchQueries: [{ query }]
        });
    }
    renderButtons(){
       const { loading, user } = this.props.data
        if (loading){
            return <div/>;
        }
        if (user){
            return (
                <li>
                    <a 
                        onClick={this.onLogout.bind(this)}
                        className="">Logout
                    </a>
                </li>
            );
        }
        return (
            <div>
                <li className=""><Link to="/login">Login</Link></li>
                <li className=""><Link to="/signup">Signup</Link></li>
            </div>
        )
    }
    render(){
        return(
            <nav>
                <div className="nav-wrapper">
                    <ul className="left">
                        <li><Link to="/">Home</Link></li>
                    </ul>
                    <ul className="right">
                        {this.renderButtons()}
                    </ul>
                </div>

            </nav>
        )
    }
}


export default graphql(mutation)(
    graphql(query)(Header)
);