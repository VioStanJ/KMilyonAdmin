import React, { Component } from 'react';
import Header from './Header';
import NavBar from './NavBar';

export default class Container extends Component{

    render(){
        return <div style={{height:"100%",overflow:"hidden"}}>
            <Header/>
            <div className='row' style={{height:"100%",background:"lightgray"}}>

                <NavBar/>

                <div className='col-9'>
                    {this.props.children}
                </div>

            </div>
        </div>;
    }
}