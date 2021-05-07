import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Jumbotron,
  Card,
  CardDeck,
} from "react-bootstrap";
import axios from "axios";

// Context
import { UserContext } from "../../context/userContext";

const Home = () => {
  const [user] = useContext(UserContext);
  const [topArtists, setTopArtist] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    if (!user.isLoggedIn) {
      return;
    }

    const fetchData = async () => {
      const artistsReponse = await axios.get(
        "https://api.spotify.com/v1/me/top/artists?limit=5",
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      const trackResponse = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks?limit=5",
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      setTopArtist(artistsReponse.data.items);
      setTopTracks(trackResponse.data.items);
    };
    fetchData();
  }, [user]);

  const userSignedIn = () => {
    return (
      <>
        <Jumbotron fluid>
          <Row>
            <Col sm={6} className="text-center">
              <Image src={user.image} fluid />
            </Col>
            <Col sm={6} className="text-center">
              <h1>Welcome</h1>
              <h2>{user.name}</h2>
            </Col>
          </Row>
        </Jumbotron>
        <h1>Favorite Artists</h1>
        <CardDeck>
          {topArtists.map((artist) => {
            return (
              <Card>
                <Card.Img src={artist.images[0].url} />
                <Card.Body>
                  <Card.Title>{artist.name}</Card.Title>
                  <Card.Link
                    target="_blank"
                    href={artist.external_urls.spotify}
                  >
                    Open on Spotify
                  </Card.Link>
                </Card.Body>
              </Card>
            );
          })}
        </CardDeck>
        <h1 className="mt-5">Favorite Tracks</h1>
        <CardDeck>
          {topTracks.map((tracks) => {
            return (
              <Card>
                <Card.Img src={tracks.album.images[0].url} />
                <Card.Body>
                  <Card.Title>Artist: {tracks.artists[0].name}</Card.Title>
                </Card.Body>
                <Card.Body>
                  <Card.Title>Album: {tracks.album.name}</Card.Title>
                </Card.Body>
                <Card.Body>
                  <Card.Title>Track: {tracks.name}</Card.Title>
                </Card.Body>
                <Card.Body>
                  <audio>
                    <source src={tracks.preview_url} type="audio/mpeg"></source>
                  </audio>
                </Card.Body>
                <Card.Body>
                  <Card.Link
                    target="_blank"
                    href={tracks.external_urls.spotify}
                  >
                    Open on Spotify
                  </Card.Link>
                </Card.Body>
              </Card>
            );
          })}
        </CardDeck>
        <br className="mt-5" />
      </>
    );
  };

  return (
    <>
      <Container className="mt-5">
        {user.isLoggedIn && userSignedIn()}
      </Container>
    </>
  );
};

export default Home;
