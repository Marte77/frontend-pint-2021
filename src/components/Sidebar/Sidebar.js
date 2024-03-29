import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

import logo from "views/img/logo.png";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  if(localStorage.getItem('tokenauth')){
    return (
      <div className="sidebar" data-image={image} data-color={color} >
        
        <div className="sidebar-wrapper">
          <div className="logo d-flex align-items-center justify-content-start">
            <a
              href="/admin/home"
              className="simple-text logo-mini mx-1">
              <div className="logo-img">
                <img
                  src={require("views/img/logo.png").default}
                />
              </div>
            </a><a> &nbsp; &nbsp; Crowd Zero</a>
          </div>
          <Nav>
            {routes.map((prop, key) => {
              if (!prop.redirect)
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : activeRoute(prop.layout + prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              return null;
            })}
          </Nav>
        </div>
      </div>
    );
  }else{
    if(location.pathname !== '/login')
{
  window.open(window.location.origin+'/login','_self');
  console.log(window.location);
}
   
  }
  /*if(data.token === localStorage.getItem('tokenauth'))
        return (
          <div className="sidebar" data-image={image} data-color={color} >
      
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="/admin/home"
            className="simple-text logo-mini mx-1">
            <div className="logo-img">
              <img
                src={require("views/img/logo.png").default}
              />
            </div>
          </a><a> &nbsp; &nbsp; Crowd Zero</a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
        );
      else return <h1>lol</h1>*/


  
}

export default Sidebar;
