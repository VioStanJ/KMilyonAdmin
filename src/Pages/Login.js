import axios from 'axios';
import React, { Component,useState } from 'react';
import {BASE_URL} from '../Utils/Utils';
import {Navigate} from 'react-router-dom';
import qs from 'qs';
import km from '../ressources/images/km.png';
import bg from '../ressources/images/background.jpg';

export const Login = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [navigate,setNavigate] = useState(false);

    const send = async e => {
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
              username: username,
              password: password
            }),
            config
        }).then(function (response) {

          localStorage.setItem('token',response.data.accessToken);
          localStorage.setItem('refresh',response.data.refreshToken);

          console.log(response.data.accessToken,response.data.refreshToken);
        });

        setTimeout(()=>{
          setNavigate(true);
        },1000)
    }

    if(navigate){
        return <Navigate to="/home"/>
    }

    return (
      <div className='flex-row form_bg' style={{height:'100vh',background:"",backgroundImage:'url('+bg+')'}}>
        <div style={{height:"100%",backgroundColor:"rgba(0, 0, 0,0.6)"}}>
        <main className="form-signin">
            <img src={km} alt="Krezi Milyon" width={300}/>
            <br /><br />
            <form onSubmit={send}>
            

              <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput" placeholder="username"
                    onChange={e => setUsername(e.target.value)}/>
                <label htmlFor="floatingInput">Username</label>
              </div>
              <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                    onChange={e => setPassword(e.target.value)}/>
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