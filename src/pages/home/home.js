import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
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
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <Image src={user.image} />
          </Col>
          <Col>Welcome: {user.name}</Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
};

export default Home;
