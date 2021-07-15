import React, { useState } from 'react'
import { auth, db } from '../config/Config'
import { Link } from 'react-router-dom'


export const Signup = (props) => {

    // defining state using useSate hook
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const signup = (e) => {
        e.preventDefault();
        // console.log('form submitted')
        // console.log(name, email, password);
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            db.collection('SignedUpUsersData').doc(cred.user.uid).set({
                Name: name,
                Email: email,
                Password: password
            }).then(() => {
                setName('');
                setEmail('');
                setPassword('');
                setError('');
                props.history.push('/login');
            }).catch(err => setError(err.messenger));
        }).catch(err => setError(err.messenger));
    }

    return (
        <div className='container'>
            <br />
            <h2>Sign up</h2>
            <hr />
            <form autoComplete="off" className='form-group' onSubmit={signup}>
                <label htmlFor="Name">Name</label>
                <br />
                <input type="text" className='form-control' required
                    onChange={(e) => setName(e.target.value)} value={name} />
                <br />
                <label htmlFor="Email">Email</label>
                <br />
                <input type="email" className='form-control' required
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <label htmlFor="Password">Password</label>
                <br />
                <input type="password" className='form-control' required
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>REGISTER</button>
            </form>
            {error && <div className='error-msg'>{error}</div>}
            <br />
            <span> Already have an account? Login
                <Link to="login">Here</Link>
            </span>
        </div>
    )
}
