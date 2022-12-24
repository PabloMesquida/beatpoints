import React, { useState, useEffect, useContext, useRef } from "react";
import BufferBeatsPoints from "./BufferBeatsPoints.js";
import BufferTatumsPoints from "./BufferTatumsPoints.js";
import { aContext } from "../../context/Context.js";
import { OrbitControls, CameraShake, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import ThreeScene from "./ThreeScene.js";

import { PointsContainer } from "./Display.styles.js";

const Display = ({ spotifyApi, track }) => {
  const [secTempoArray, setSecTempoArray] = useState([]);
  const [secStartArray, setSecStartArray] = useState([]);
  const [energy, setEnergy] = useState(0);
  const { play, setArtist, setTrackInfo, setNextTrack, tiempoAcumulado } =
    useContext(aContext);

  const [iSec, setISec] = useState(0);

  const OCRef = useRef();
  const spRef = useRef();

  function getTrackInfo() {
    // if (!track) return;

    let sectionTempo = [];
    let sectionStart = [];

    spotifyApi.getAudioFeaturesForTrack(track.id).then((res) => {
      setEnergy(res.body.energy);
    });

    spotifyApi.getAudioAnalysisForTrack(track.id).then((res) => {
      res.body.sections.forEach((el) => {
        sectionTempo.push(el.tempo);
        sectionStart.push(el.start);
      });
      setSecTempoArray(sectionTempo);
      setSecStartArray(sectionStart);
    });

    spotifyApi.getTrack(track.id).then((res) => {
      setTrackInfo(res.body);
      spotifyApi
        .getRecommendations({
          limit: 1,
          seed_artists: res.body.artists[0].id,
          seed_tracks: track.id,
        })
        .then((res) => {
          setNextTrack(res.body.tracks[0]);
          //  console.log("RECOM: ", res.body.tracks[0]);
        });
      spotifyApi
        .getArtist(res.body.artists[0].id)
        .then((res) => setArtist(res.body));
    });
  }

  useEffect(() => {
    track && getTrackInfo();
  }, [track]);

  const ControlTime = () => {
    useFrame(() => {
      if (play) {
        const tempoSecAct = secStartArray[iSec];
        if (tiempoAcumulado >= tempoSecAct) {
          OCRef.current.autoRotateSpeed =
            secTempoArray[iSec] * secTempoArray[iSec] * 0.0004;
          // (Math.pow(secTempoArray[iSec], secTempoArray[iSec] / 100) / 20) * 0.4;
          //console.log("rotate", OCRef.current.autoRotateSpeed, iSec);
          if (iSec !== secTempoArray.length - 1) setISec(iSec + 1);
        }
      }
    });
    return null;
  };
  return (
    <PointsContainer>
      <ThreeScene>
        <ControlTime />
        <Sparkles
          ref={spRef}
          speed={play ? secTempoArray[iSec] * 0.025 : 0.2 || 0.2}
        />
        <BufferBeatsPoints
          spotifyApi={spotifyApi}
          trackId={track?.id}
          estado={play}
          energy={energy}
        />
        <BufferTatumsPoints
          spotifyApi={spotifyApi}
          trackId={track?.id}
          estado={play}
          energy={energy}
        />
        <OrbitControls
          makeDefault
          ref={OCRef}
          autoRotate={play}
          autoRotateSpeed={
            secTempoArray[iSec] * secTempoArray[iSec] * 0.0004 || 1
          }
          enableZoom={false}
          enablePan={false}
        />
        <CameraShake
          yawFrequency={1}
          maxYaw={0.2}
          pitchFrequency={1}
          maxPitch={0.2}
          rollFrequency={1}
          maxRoll={0.2}
          intensity={0.2}
        />
      </ThreeScene>
    </PointsContainer>
  );
};

export default Display;
