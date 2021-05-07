import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const [user, setUser] = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(
      window.location.hash.replace("#", "?")
    );
    const accessToken = urlParams.get("access_token");

    if (accessToken === null) {
      alert("User denied login");
      return;
    }

    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        setUser({
          ...user,
          name: response.data.display_name,
          email: response.data.email,
          image: response.data.images[0].url,
          accessToken: accessToken,
          isLoggedIn: true,
        });
        setRedirect(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [user, setUser]);

  if (redirect) {
    return <Redirect to="/" />;
  }

  return <div></div>;
};

export default Callback;
