import React, { Component } from 'react';
import axios from 'axios';
import Helpers from "../Helpers";
import { useHistory } from 'react-router-dom'


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' ,role:''}
    }

    handleSubmit = e => {
        e.preventDefault();
        Helpers.fetchRequest('Cal/Findloginuser/' + this.email + '/' + this.password, 'GET')
            .then(res => {
                console.log(res)
                if (res.length === 1) {
                    if (res.role === "admin") {
                        console.log(res.role);
                        window.location.replace('./components/Calendar/TruckRunSchedule');
                    }
                    else if (res.role === "basic") { console.log(res.role); window.location.replace('./components/Calendar/NormUserCalendar'); }
                    else { window.location.replace('./component/Home'); console.log(res.role) }


                }
                else {
                    console.log(res);
                    window.location.replace('./register');
                }


                //if (Error) { console.log(Error) }
                //else {
                //    if (res.role == "admin") {
                //         this.render('./component/Calendar/TruckRunSchedule');
                //    }
                //    else if (res.role == "basic") {this.render('./component/Calendar/NormUserCalendar'); }
                //    else { this.render('./component/Home'); }


                /*   }*/

            }
            )

        //axios.post('login', data).then(
        //    res => {
        //        localStorage.setItem('token', res.token)
        //    }
        //).catch(
        //    err => { console.log(err); }

        //)

    }


    render() {
        return (
            <section>
                {/*<p ref={errorRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"> {errMsg} </p>*/}
                <form onSubmit={this.handleSubmit}>
                    <h3>Login </h3>
                    <div className="form-group">
                        <label> Email</label>
                        <input type="email" className="form-control" name="email" placeholder="Email" onChange={e => this.email = e.target.value}></input>
                    </div>
                    <div className="form-group">
                        <label> Password</label>
                        <input type="password" className="form-control" name="password" placeholder="Password" onChange={e => this.password = e.target.value}></input>
                    </div>
                    <button className="btn btn-primary btn-block">Login</button>
                </form>
                </section>
            


        );
    }
}
