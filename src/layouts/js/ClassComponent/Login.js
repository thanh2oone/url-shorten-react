import '../../css/Login.css';

import * as React from 'react';
import { Card, Input, Button } from 'reactstrap';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            displayLog: '',
        };
        this.getInput = this.getInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCookie = this.handleCookie.bind(this);
    }

    getInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        const res = await axios.post(process.env.REACT_APP_BASE_BACK + '/api/login', {
            withCredentials: true,
            email: this.state.email,
            password: this.state.password
        });

        this.setState({
            displayLog: res.data
        });
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <Card id='login-card'>
                        <div id='login-header'>
                            Login
                        </div>

                        <div id='email-header'>
                            Email
                        </div>
                        <div id='login-input'>
                            <Input placeholder="Email" required
                                type="email" id='email' name='email'
                                value={this.state.email} onChange={this.getInput}
                                css={{ width: '100%' }}
                            />
                        </div>

                        <div id='password-header'>
                            Password
                        </div>
                        <div id='login-input'>
                            <Input placeholder="Password" required
                                type="password" id='password' name='password'
                                value={this.state.password} onChange={this.getInput}
                                css={{ width: '100%' }}
                            />
                        </div>

                        <div id='login-footer'>
                            <Button type='submit' onChange={this.handleSubmit}
                            >Login</Button>
                            <h4>
                                {this.state.displayLog && this.state.displayLog}
                            </h4>
                        </div>
                    </Card>
                </form>
            </>
        )
    }
}

export default Login;