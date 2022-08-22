import React, { Component } from 'react';
import axios from 'axios';


export default class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const data = {
            email: this.email,
            password: this.password

        }
        axios.post('login', data).then(
            res => {
                localStorage.setItem('token',res.token)
            }
        ).catch(
            err => { console.log(err); }

        )

    }


    render() {
        return (
            <form>
                <h3>Login </h3>
                <div className="form-group">
                    <label> Email</label>
                    <input type="email" className="form-control" placeholder="Email" onChange={e => this.email = e.target.value}></input>
                </div>
                <div className="form-group">
                    <label> Password</label>
                    <input type="password" className="form-control" placeholder="Password" onChange={e => this.password = e.target.value}></input>
                </div>
                <button className="btn btn-primary btn-block">Sign Up</button>
            </form>


        );
    }
}