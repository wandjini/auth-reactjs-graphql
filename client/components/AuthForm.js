import React from 'react';

class AuthForm extends React.Component {
    constructor(){
        super();
        this.state={ email: '', password: '' };
    }
    onSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.onSubmit({ email, password });

    }
    render(){
        return(
            <div className="row">
                <form className="col s4" onSubmit={this.onSubmit.bind(this)}>
                    <div className="input-field">
                        
                        <input
                            placeholder="Email"
                            onChange={ e => this.setState({ email: e.target.value })}
                            value={this.state.email}
                        />
                    </div>
                    <div className="input-field">
                        
                        <input
                            placeholder="Password" 
                            onChange={ e => this.setState({ password: e.target.value })}
                            value={this.state.password}
                            type="password"/>
                    </div>
                    <div className="errors">
                        {
                            this.props.errors ?
                                this.props.errors.map( error => <div key={error}>{error}</div>)
                             : ""}
                    </div>
                    <button className="btn">Submit</button>
                </form>
            </div>
        )
    }
}
export default AuthForm;