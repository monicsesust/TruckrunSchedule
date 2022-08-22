import React, { Component } from 'react';
import Helpers from "../Helpers";
import './AdminLogin.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


export class AdminLogin extends Component {

    constructor(props) {
        super(props);
        this.state = { username: '', password: ''}
    }
    async handleClick(event) {
        try {
            const data = await Helpers.fetchRequest('/AdminLogin', 'POST',
                {
                    username: this.state.username,
                    password: this.state.password
                })
            console.log(data)
            window.location.replace('/portal');
        } catch (error) {
            console.log(error.toString())
        }
    }
    render() {


        return (
            <div>
                <h1 className="centerheader">Admin Login</h1>
                <div>
                    <MuiThemeProvider>
                        <div className="center">
                            
                            <TextField 
                                
                                hintText="Enter your Username"
                                floatingLabelText="Username"
                                onChange={(event, newValue) => this.setState({ username: newValue })}
                            />
                            <br />
                            <TextField
                                type="password"
                                
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={(event, newValue) => this.setState({ password: newValue })}
                            />
                            <br />
                            <RaisedButton label="Submit" primary={true}  onClick={(event) => this.handleClick(event)} />
                        </div>
                    </MuiThemeProvider>
                </div>

                
            </div>
            );
    }
}