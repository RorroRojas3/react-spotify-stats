import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import SpotifyIcon from "../../images/icons/spotifyIcon.png";
import "./navbar.css";

const MyNavbar = () => {
  return (
    <div>
      <Navbar className="navbar-dark" bg="dark" expand="lg">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={SpotifyIcon}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Spotify Stats
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              target="_blank"
              href="https://github.com/RorroRojas3/React-Spotify-Status"
            >
              Github
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
