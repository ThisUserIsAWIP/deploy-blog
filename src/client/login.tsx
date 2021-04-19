import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Author, Post } from '../utilities';
import { apiService, TOKEN_KEY } from './utils/apiService'

const Login = () => {

    const [email, setEmail] = useState<Author['email']>();
    const [password, setPassword] = useState<Author['password']>();

    const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const authorData = {
            email: email,
            password: password
        };
        // fetch('/api/authors', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(authorData)
        // })
        try {
            const token = await apiService('/auth/login', 'POST', {
                email: authorData.email,
                password: authorData.password
            });
            localStorage.setItem(TOKEN_KEY, `${token}`);

        } catch (error) {

        }

    }
    return (
        <>
            <div className="row d-flex m-3 p-3">
                <span id="basic-addon1">Login</span>
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Email" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type="text" className="form-control" placeholder='Password' aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <p className='card-subtext'>Don't have an account?<Link to={`/register`}>Register</Link></p>
                <button onClick={handleButtonClick} className="btn btn-outline-secondary" type="button" id="button-addon2">Login</button>
            </div>
        </>
    )
};

export default Login;