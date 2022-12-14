import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class NavBar extends Component{

    render() {
        return (
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{height:"100%"}} id="navbar">
            {/* <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-4">Menu</span>
            </a> */}
            {/* <hr/> */}
            <ul className="nav nav-pills flex-column mb-auto" style={{marginLeft:10}}>
              <li className="nav-item">
                <Link to="/home" className="nav-link active" aria-current="page">
                <i className="fa-solid fa-gauge pr-5"></i>
                  Pano
                </Link>
              </li>
              <li>
                <Link to="/game" className="nav-link text-success">
                <i className="fa-solid fa-gamepad"></i>
                  Jwèt
                </Link>
              </li>
              <li>
                <Link to="/gametype" className="nav-link orange">
                <i className="fa-solid fa-list"></i>
                  Tip Jwèt
                </Link>
              </li>
              {/* <li>
                <Link to="/ticket" className="nav-link text-white">
                <i className="fa-solid fa-ticket"></i>
                  Tikè
                </Link>
              </li> */}
            </ul>
            <hr/>
            <div className="dropdown">
              <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
                <strong>mdo</strong>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                <li><a className="dropdown-item" href="#">New project...</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="#">Sign out</a></li>
              </ul>
            </div>
          </div>
        );
    }
}