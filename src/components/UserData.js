import { useState, useEffect } from "react";
import { UserDataContainer, AvatarImage } from "./UserData.styles.js";

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
        <AvatarImage src={userData.images[0].url} alt={userData.display_name} />
      </UserDataContainer>
    )
  );
};

export default UserData;
