import React, { useState, useEffect, useContext, useRef } from "react";
import BufferBeatsPoints from "./BufferBeatsPoints.js";
import { aContext } from "../context/Context.js";
import { OrbitControls, CameraShake, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import ThreeScene from "./ThreeScene.js";
import BufferTatumsPoints from "./BufferTatumsPoints.js";
import { PointsContainer } from "./Display.styles.js";

const Display = ({ spotifyApi, track }) => {
  const [secTempoArray, setSecTempoArray] = useState([]);
  const [secStartArray, setSecStartArray] = useState([]);
  const [energy, setEnergy] = useState(0);
  const { play, setArtist } = useContext(aContext);
  const [tiempoRef] = useState(Date.now());
  const [iSec, setISec] = useState(0);

  const OCRef = useRef();

  function getTrackInfo() {
    if (!track) return;

    let sectionTempo = [];
    let sectionStart = [];

    console.log(track);

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
      spotifyApi
        .getArtist(res.body.artists[0].id)
        .then((res) => setArtist(res.body));
    });
  }

  useEffect(() => {
    getTrackInfo();
  }, [track]);

  const ControlTime = () => {
    useFrame(() => {
      let tiempoAcu = (Date.now() - tiempoRef) / 1000;
      tiempoAcu = Math.round((tiempoAcu + Number.EPSILON) * 100) / 100;
      const tempoSecAct =
        Math.round((secStartArray[iSec] + Number.EPSILON) * 100) / 100;
      if (tiempoAcu >= tempoSecAct) {
        OCRef.current.autoRotateSpeed =
          (Math.pow(secTempoArray[iSec], secTempoArray[iSec] / 100) / 20) * 0.4;

        if (iSec !== secTempoArray.length - 1) setISec(iSec + 1);
      }
    });
    return null;
  };

  return (
    <PointsContainer>
      <ThreeScene>
        <Sparkles
          speed={
            play
              ? (Math.pow(secTempoArray[iSec], secTempoArray[iSec] / 100) /
                  20) *
                0.1
              : 0.2
          }
        />
        <ControlTime />
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
            (Math.pow(secTempoArray[iSec], secTempoArray[iSec] / 100) / 20) *
            0.4
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
