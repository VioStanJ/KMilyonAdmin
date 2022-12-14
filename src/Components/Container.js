import React, { Component } from 'react';
import Header from './Header';
import NavBar from './NavBar';

export default class Container extends Component{

    render(){
        return <div style={{height:"100%",overflow:"hidden"}}>
            <Header/>
            <div style={{height:"100%",background:"#e0e0e06b"}} id="parent-content">

                <NavBar/>

                <div id="main-content">
                    <br />
                    {this.props.children}
                </div>

            </div>
        </div>;
    }
}