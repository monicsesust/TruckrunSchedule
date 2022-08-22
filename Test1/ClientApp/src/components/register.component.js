import React, { Component } from 'react';
import Helpers from "../Helpers";
 


export default class Register extends Component {

    handleSubmit = e => {
         e.preventDefault();
        Helpers.fetchRequest('Cal/AddUser', 'POST',
            {
                fullName: this.fullName,
                email: this.email,
                password: this.password,
                role:"basic",
            }).catch(
                err => { console.log(err); }
            )
    } 
    
    //handleSubmit = e => {
    //    e.preventDefault();
    //    const data = {
    //        fullName: this.fullName,
    //        phone: this.phone,
    //        email: this.email,
    //        password: this.password,
    //        confirmPassword: this.confirmPassword
    //    };
    //    axios.post('register', data).then(
    //        res => {
    //            console.log(res)
    //        }
    //    ).catch(
    //        err => { console.log(err); }

    //    )
    //}


    render() {
        return (
            <div className="signUpForm">
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign Up </h3>
                    <div className="form-group">
                        <label> Full Name</label>
                        <input type="text" className="form-control" placeholder="Full Name" onChange={e => this.fullName = e.target.value}></input>
                    </div>

                    <div className="form-group">
                        <label> Email</label>
                        <input type="email" className="form-control" placeholder="Email" onChange={e => this.email = e.target.value}></input>
                    </div>
                    <div className="form-group">
                        <label> Password</label>
                        <input type="password" className="form-control" placeholder="Password" onChange={e => this.password = e.target.value}></input>
                    </div>
                    <div className="form-group">
                        <label> Confirm Password</label>
                        <input type="password" className="form-control" placeholder="Confirm password" onChange={e => this.confirmPassword = e.target.value}></input>
                    </div>
                    <button className="btn btn-primary btn-block">Sign Up</button>

                </form>
            </div>

            

          
        );
    }
}