/*import React, { Component } from "react";
import axios from "axios";
import AuthService from "../auth.service";
import logo from "./img/logo.png"; // import imagem
//import './App.css';
import '../index.css';

export default class Login extends Component {
    
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.state = {
            email: "",
            password: "",
            loading: false,
            message: ""
        };
    }
    onChangeUsername(e) {
        this.setState({username:e.target.value});
    }
    onChangePassword(e) {
        this.setState({password: e.target.value});
    }

    handleLogin(e) {
        e.preventDefault();
        this.setState({message: "", loading: true});
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
            () => {
                    this.props.history.push("/");
                    window.location.reload();
                }
            );
            this.setState({
                loading: false,
                message: "Login Errado"
            });
        }
    }


    raiseInvoiceClicked(){
    const url = '/admin/home';
    window.open(url, '_blank');}
    render(){
        return (
    <div className="App">
      <div className="outer">
        <div className="inner">
            <form>
            <div className="cor_form">
            <img src={logo} alt="logo" border="0" width="100" height="100" class="alinhar_centro"/>
                <br/>
                <h5>Crowd Zero</h5>

                <div className="form-group">
                    <label>Email de Administrador:</label>
                    <input type="email" className="form-control" placeholder="Insira o seu email" 
                        value={this.state.email} oncChange={this.onChangeUsername} validations={[required]}/>
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" placeholder="Insira a sua password "
                        value={this.state.password} onChange={this.onChangePassword}  validations={[required]}/>
                </div>

                <p className="pedir-acesso">
                    Ainda não tem uma conta? <a href="/registar">Pedir acesso</a>
                    </p>
                <br/>
                <button type="submit" className="btn btn-dark btn-lg btn-block" disabled={this.state.loading}  onClick={this.raiseInvoiceClicked}> Iniciar sessão </button>  
                 </div>
            </form>
            </div>
            </div>
            </div>
            
        );
    }
}
*/