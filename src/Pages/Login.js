import axios from 'axios';
import React, { Component,useState } from 'react';
import {BASE_URL} from '../Utils/Utils';
import {Navigate} from 'react-router-dom';
import qs from 'qs';

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
      <div className='flex-row' style={{background:"#f5f5f5"}}>
        <main className="form-signin">
            <form onSubmit={send}>
              <h1 className="h3 mb-3 fw-normal text-center">KMilyon</h1>

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

              <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
          </main>
      </div>
    );
}