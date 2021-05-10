import { React, useContext, useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import SpotifyIcon from "../../images/icons/spotifyIcon.png";
import "./navbar.css";

// My Components
import SignInModal from "../signInModal/signInModal";

// Context
import { UserContext } from "../../context/userContext";

const MyNavbar = () => {
  const signIn = () => {
    let clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    let redirectUrl = process.env.REACT_APP_SPOTIFY_REDIRECT_URL;
    let url = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=user-read-private%20user-read-email%20playlist-read-collaborative%20user-follow-read%20user-top-read&response_type=token&state=123`;
    window.location.replace(url);
  };

  const [modalShow, setModalShow] = useState(false);
  const [user] = useContext(UserContext);

  return (
    <div>
      <SignInModal show={modalShow} onHide={() => setModalShow(false)} />
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
              href="https://github.com/RorroRojas3/react-spotify-stats"
            >
              Github
            </Nav.Link>
          </Nav>
          {!user.isLoggedIn && (
            <Button variant="dark" onClick={() => signIn()}>
              Sign In
            </Button>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
