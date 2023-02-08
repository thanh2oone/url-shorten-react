import '../../css/SignUp.css';

import React, { useState } from 'react';
import { Card, Input, Button } from 'reactstrap';
import axios from 'axios';

const SignUp = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        cfPassword: ''
    });
    const [displayRes, setDisplayRes] = useState('');

    const getInput = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post(process.env.REACT_APP_BASE_BACK + '/api/signup', {
            email: values.email,
            password: values.password,
            cfPassword: values.cfPassword
        })

        if (values.password === values.cfPassword) {
            setValues({
                [e.target.name]: ''
            })
            setDisplayRes(res.data);
        } else setDisplayRes(res.data);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
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
                            value={values.email} onChange={getInput}
                            css={{ width: '100%' }}
                        />
                    </div>

                    <div id='password-header'>
                        Password
                    </div>
                    <div id='signup-input'>
                        <Input placeholder="Password" required
                            type="password" id='password' name='password'
                            value={values.password} onChange={getInput}
                            css={{ width: '100%' }}
                        />
                    </div>

                    <div id='cf-password-header'>
                        Confirm Password
                    </div>
                    <div id='signup-input'>
                        <Input placeholder="Confirm Password" required
                            type="password" id='cf-password' name='cfPassword'
                            value={values.cfPassword} onChange={getInput}
                            css={{ width: '100%' }}
                        />
                    </div>

                    <div id='signup-footer'>
                        <Button type='submit' onChange={handleSubmit}
                        >Sign Up</Button>
                        <h4>
                            {displayRes && displayRes}
                        </h4>
                    </div>
                </Card>
            </form>
        </>
    )
}

export default SignUp;