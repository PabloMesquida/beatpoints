import { useState, useEffect } from "react";
import { LinkFooter } from "../../pages/Login.styles.js";
import {
  UserDataContainer,
  AvatarImage,
  ImageContainer,
  BeatpointsText,
} from "./UserData.styles.js";

const UserData = ({ spotifyApi, accessToken }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getMe().then(
      function (data) {
        setUserData(data.body);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [accessToken]);

  return (
    userData && (
      <UserDataContainer>
        <ImageContainer>
          <AvatarImage
            src={userData.images[0].url}
            alt={userData.display_name}
          />
        </ImageContainer>
        <BeatpointsText>beatpoints</BeatpointsText>
        <LinkFooter><a href="https://pablopx.vercel.app/" target="_blanck"> PM</a></LinkFooter>
      </UserDataContainer>
    )
  );
};

export default UserData;
