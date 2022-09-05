import React, { Component } from 'react';
import bg from '../ressources/images/background.jpg';
import {Link} from 'react-router-dom';

export default class Welcome extends Component {

    render() {
        return (
            <div className='flex-row form_bg' style={{backgroundImage:'url('+bg+')'}}>
                <div className='d-flex justify-content-center align-items-center' style={{height:"100%",backgroundColor:"rgba(0, 0, 0,0.6)"}}>
                    
                        <Link to="/login" className="btn btn-lg btn-primary" type="submit">KONEKTE</Link>
                </div>
            </div>
        );
    }
}