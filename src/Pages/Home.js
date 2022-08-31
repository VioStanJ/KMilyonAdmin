import React, { Component, useEffect, useState } from 'react';
import {BASE_API,AxiosConfig} from '../Utils/Utils';
import axios from 'axios';

export const Home = () => {

    // const config = {
    //     // withCredentials: true,
    //     headers: {'Authorization': 'Bearer '+"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqaG9uIiwicm9sZXMiOlsiVVNFUiJdLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL2xvZ2luIiwiZXhwIjoxNjYyMDUyMTM3fQ.TCC-h0PIg6abkLo2g1P4NVgNyNCP3P7Vywfnoz4JCIk"}
    // };

    AxiosConfig();
    
    const [name,setName] = useState("");

    useEffect(()=>{
        const getProfile = async () => {

            axios.get(BASE_API+"/users/profile").then((res)=>{
                console.log(res.data);
                setName(res.data.username);
            }).catch((err)=>{
                console.log(err);
            });
        }
        getProfile();
    },[]);

    return <div>
        <h1>Hi {name} !</h1>
    </div>
}