import React, { Component } from "react";
import "../css/Login_SignUp.css";
import Store from "../Store";
import fire from '../fire';
import {
    Redirect
} from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            username: '',
            email: '',
            encrypted_password: '',
            redirect: false,
            mode: true,
            errorMessage: '',
            error: false,
            newUserID: ''
        };
        this.store = new Store();

    };

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        //User login
        if (this.state.mode) {
            fire.auth().signInWithEmailAndPassword(this.state.email, this.state.encrypted_password).catch((error) => {
                this.setState({
                    error: true,
                    errorMessage: error.message
                })
            }).then(() => {
                this.setState({
                    redirect: true
                })
            })
        } else {
            //User signup
            fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.encrypted_password).then((res) => {
                //Store the user info in the database.
                this.setState({ newUserID: res.user.uid });
                this.store.storenewUser(this.state).then(() => {
                    this.setState({
                        redirect: true
                    })
                })
            }).catch((error) => {
                this.setState({
                    error: true,
                    errorMessage: error.message
                })

            })
        }

    }

    changeMode = () => {
        var currentMode = this.state.mode;
        console.log(currentMode);
        if (currentMode) {
            this.setState({ mode: false })
        } else {
            this.setState({ mode: true })
        }
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />;
        }
        const { name, username, encrypted_password, email } = this.state
        let mode = this.state.mode;
        let error = this.state.error;


        if (mode) {
            return (
                <div className="Login">
                    <form onSubmit={this.submitHandler}>
                        <h2>Sign In</h2>

                        <div className="form-group">
                            <label>Email</label>
                            <input className="login_signup_input" type="email" className="form-control login_signup_input" name="email" placeholder="Enter username" value={email} onChange={this.changeHandler} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control login_signup_input" name="encrypted_password" placeholder="Enter password" value={encrypted_password} onChange={this.changeHandler} />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block submit_button">Submit</button>
                        <p className="forgot-password text-left">
                            Don't have an account ? <a href="#" onClick={this.changeMode}>Sign Up</a>
                        </p>

                        {
                            error ? <p className="error text-left">
                                {this.state.errorMessage}
                            </p> : <p className="error text-left">

                                </p>
                        }
                    </form>
                </div>)

        } else {
            return (
                <div className="Login">
                    <form onSubmit={this.submitHandler}>
                        <h2>Sign Up</h2>

                        <div className="form-group">
                            <label>Name</label>
                            <input type="text"  className="form-control login_signup_input" name="name" placeholder="Enter name" value={name} onChange={this.changeHandler} />
                        </div>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control login_signup_input" name="username" placeholder="Enter email" value={username} onChange={this.changeHandler} />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control login_signup_input" name="email" placeholder="Enter username" value={email} onChange={this.changeHandler} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control login_signup_input" name="encrypted_password" placeholder="Enter password" value={encrypted_password} onChange={this.changeHandler} />
                        </div>

                        <button type="submit" className="submit_button">Submit</button>
                        <p className="forgot-password text-left">
                            Already have an account ? <a onClick={this.changeMode} href="#">Login</a>
                        </p>
                        {
                            error ? <p className="error text-left">
                                {this.state.errorMessage}
                            </p> : <p className="error text-left">

                                </p>
                        }

                    </form>

                </div>);
        }

    }
}

export default Login