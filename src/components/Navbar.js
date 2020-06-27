import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

class Navigationbar extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar
          bg="white"
          style={{ marginTop: "5px", marginBottom: "5px", width: "100%" }}
        >
          <Navbar.Brand href="#">Delina Hijab</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="mx-auto"
              style={{
                textAlign: "center"
              }}
            >
              <Nav.Link
                className="navLink"
                style={{ marginRight: "5vw" }}
                href="#"
              >
                Home
              </Nav.Link>
              <Nav.Link
                className="navLink"
                style={{ marginRight: "5vw" }}
                href="#"
              >
                Collection
              </Nav.Link>
              <Nav.Link
                className="navLink"
                style={{ marginRight: "5vw" }}
                href="#"
              >
                About
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#">ASSALAMUALAIKUM, Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      // <div className="navbar">
      //   <nav>
      //     <div id="logo">
      //       <h2>Delina Hijab</h2>
      //     </div>
      //     <div id="menu">
      //       <ul>
      //         <li>
      //           <a href="#">Home</a>
      //         </li>
      //         <li>
      //           <a href="#">Collection</a>
      //         </li>
      //         <li>
      //           <a href="#">About</a>
      //         </li>
      //         <li>
      //           <a href="#">Contact</a>
      //         </li>
      //       </ul>
      //     </div>
      //   </nav>
      // </div>
    );
  }
}

export default Navigationbar;
