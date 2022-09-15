import axios from 'axios';
import React, {Component } from 'react';
import {BASE_URL} from '../Utils/Utils';
import qs from 'qs';
import km from '../ressources/images/km.png';
import bg from '../ressources/images/background.jpg';
import { Redirect } from 'react-router';

export default class Login extends Component {

    constructor(props){
      super(props);
      this.state = {
        username : '',
        password : '',
        navigate : false,
      }
    }

    send = (e) => {
        e.preventDefault();

        const config = {
            withCredentials: true,
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }

        axios({
            method: 'POST',
            url: BASE_URL+"/api/login",
            data: qs.stringify({
              username: this.state.username,
              password: this.state.password
            }),
            config
        }).then( (response) => {

          localStorage.setItem('token',response.data.accessToken);
          localStorage.setItem('refresh',response.data.refreshToken);

          setTimeout(()=>{
            this.setState({navigate:true})
          },1000)

          console.log(response.data.accessToken,response.data.refreshToken);
        }).catch((err)=>{
          alert("Invalid Credentials");
        });

    }

    render() {
      if(this.state.navigate){
        return <Redirect to={{
            pathname : '/'
        }}/>
      }
      return (
        <div className='flex-row form_bg' style={{backgroundImage:'url('+bg+')'}}>
          <div style={{height:"100%",backgroundColor:"rgba(0, 0, 0,0.6)"}}>
          <main className="form-signin">
              <img src={km} alt="Krezi Milyon" width={300}/>
              <br /><br />
              <form onSubmit={this.send}>
      
                <div className="form-floating">
                  <input type="text" className="form-control" id="floatingInput" placeholder="username"
                      onChange={(e)=>this.setState({username:e.target.value})}/>
                  <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                      onChange={(e)=>this.setState({password:e.target.value})}/>
                  <label htmlFor="floatingPassword">Password</label>
                </div>
  
                <br />
  
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
              </form>
            </main>
          </div>
        </div>
      );
    }
}