import '../css/SignUp.css';

import * as React from 'react';
import { Card, Input, Button } from 'reactstrap';
import axios from 'axios';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            cfPassword: '',
            displayRes: ''
        };
        this.getInput = this.getInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async handleSubmit(e) {
        e.preventDefault();

        const res = await axios.post(process.env.REACT_APP_BASE_BACK + '/api/signup', {
            email: this.state.email,
            password: this.state.password,
            cfPassword: this.state.cfPassword
        })

        if (this.state.password === this.state.cfPassword) {
            this.setState({
                displayRes: res.data,
                email: '',
                password: '',
                cfPassword: ''
            })
        } else this.setState({
            displayRes: res.data
        })
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <Card id='signup-card'>
                        <div id='signup-header'>
                            Sign Up
                        </div>

                        <div id='email-header'>
                            Email
                        </div>
                        <div id='signup-input'>
                            <Input placeholder="Email" required
                                type="email" id='email' name='email'
                                value={this.state.email} onChange={this.getInput}
                                css={{ width: '100%' }}
                            />
                        </div>

                        <div id='password-header'>
                            Password
                        </div>
                        <div id='signup-input'>
                            <Input placeholder="Password" required
                                type="password" id='password' name='password'
                                value={this.state.password} onChange={this.getInput}
                                css={{ width: '100%' }}
                            />
                        </div>

                        <div id='cf-password-header'>
                            Confirm Password
                        </div>
                        <div id='signup-input'>
                            <Input placeholder="Confirm Password" required
                                type="password" id='cf-password' name='cfPassword'
                                value={this.state.cfPassword} onChange={this.getInput}
                                css={{ width: '100%' }}
                            />
                        </div>

                        <div id='signup-footer'>
                            <Button type='submit' onChange={this.handleSubmit}
                            >Sign Up</Button>
                            <h4>
                                {this.state.displayRes && this.state.displayRes}
                            </h4>
                        </div>
                    </Card>
                </form>
            </>
        )
    }
}

export default SignUp;