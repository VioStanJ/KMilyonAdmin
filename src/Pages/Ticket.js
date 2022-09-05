import React, { Component } from 'react'

export default class Ticket extends Component{

    componentDidMount(){
        this._Mounted = true;
        if (this._Mounted) {
            console.log("Ticket");
        }
    }

    render() {
        return (
            <div>
                <h1>Ticket !</h1>
            </div>
        );
    }
}