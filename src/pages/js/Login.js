import '../css/Login.css';

import { Card, Input, Button } from 'reactstrap';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

const Login = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [displayLog, setDisplayLog] = useState("");
    const navigate = useNavigate();

    const getInput = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(process.env.REACT_APP_BASE_BACK + '/api/login', {
            email: values.email,
            password: values.password
        });

        setDisplayLog(res.data.detail)

        const cookies = Cookies.get();
        if (cookies) {
            alert(res.data.detail);
            navigate('/');
            window.location.reload('/');
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Card id='login-card'>
                    <div id='login-header'>
                        Login
                    </div>

                    <div id='email-header'>
                        Email
                    </div>
                    <div id='login-input'>
                        <Input placeholder="Email" required
                            type="email" id='email-login' name='email'
                            value={values.email} onChange={getInput}
                            css={{ width: '100%' }}
                        />
                    </div>

                    <div id='password-header'>
                        Password
                    </div>
                    <div id='login-input'>
                        <Input placeholder="Password" required
                            type="password" id='password-login' name='password'
                            value={values.password} onChange={getInput}
                            css={{ width: '100%' }}
                        />
                    </div>

                    <div id='login-footer'>
                        <Button type='submit'
                        >Login</Button>
                        <h4>
                            {displayLog !== '' && displayLog}
                        </h4>
                    </div>
                </Card>
            </form>
        </>
    )
}

export default Login;