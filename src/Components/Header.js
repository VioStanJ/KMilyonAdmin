import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {

    return <header>
    <div className="px-3 py-2 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
            {/* <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg> */}
          </a>

          <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
            <li>
              <Link to="/home" className="nav-link text-secondary">
                {/* <svg className="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#home"></use></svg> */}
                Home
              </Link>
            </li>
            <li>
              <Link to="/home" className="nav-link text-white">
                {/* <svg className="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#speedometer2"></use></svg> */}
                Dashboard
              </Link>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                {/* <svg className="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#table"></use></svg> */}
                Orders
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                {/* <svg className="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#grid"></use></svg> */}
                Products
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                {/* <svg className="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#people-circle"></use></svg> */}
                Customers
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>;
}