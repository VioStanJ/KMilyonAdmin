import React, { Component } from 'react';
import axios from 'axios';

export class Home extends Component{

    constructor(props){
        super(props);

        this.state = {
            load : true,
            name:''
        }
    }

    componentDidMount(){
        console.log("DId Mount");
        setTimeout(() => {
            if(this.state.load){
                axios.get("/users/profile").then((res)=>{
                    console.log(res.data,"Profile");
                    this.setState({name:res.data.username,load:false});
                }).catch((err)=>{
                    console.log(err,'err home');
                });
            }
        }, 1000);
    }

    render(){ 
            if(this.state.load){
                return <h1>Loading</h1>;
            }else{
                return <h1>Hi {this.state.name} !</h1>;
            }
    }
}