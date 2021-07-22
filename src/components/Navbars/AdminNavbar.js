/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";

import routes from "routes.js";
import authService from "view/auth.service";


function Header() {

  
  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };


  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
 //className="dropdownalign" no dropdown caso seja para alinhar à direita
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" navbar>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                aria-expanded={false}
                aria-haspopup={true}
                as={Nav.Link}
                data-toggle="dropdown"
                id="navbarDropdownMenuLink"
                variant="default"
                className="m-0"
              >  &nbsp;&nbsp;
                <span className="no-icon">A minha conta</span>
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                
                <div className="divider"></div>
                <Dropdown.Item
                  href="#pablo"
                  onClick={()=>{localStorage.clear();window.open(window.location.origin+'/','_self')}}
                >
                  Sair
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
