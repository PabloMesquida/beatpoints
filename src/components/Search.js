import { useState, useEffect } from "react";
import { SearchContainer, SearchInput } from "./Search.styles.js";

const Search = ({ accessToken, spotifyApi }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      console.log(res);
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            id: track.id,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <SearchContainer>
      <SearchInput
        type="search"
        placeholder="Search Song"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </SearchContainer>
  );
};

export default Search;
