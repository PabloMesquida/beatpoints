import React, { useState, useEffect, useContext, useRef } from "react";
import BufferBeatsPoints from "./BufferBeatsPoints.js";
import { aContext } from "../context/Context.js";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import ThreeScene from "./ThreeScene.js";
import BufferTatumsPoints from "./BufferTatumsPoints.js";

const Display = ({ spotifyApi, track }) => {
  const [secTempoArray, setSecTempoArray] = useState([]);
  const [secStartArray, setSecStartArray] = useState([]);
  const { play } = useContext(aContext);
  const [tiempoRef, setTiempoRef] = useState(Date.now());
  const [iSec, setISec] = useState(0);

  const OCRef = useRef();

  function getTrackInfo() {
    let sectionTempo = [];
    let sectionStart = [];

    spotifyApi.getAudioAnalysisForTrack(track.id).then((res) => {
      res.body.sections.forEach((el) => {
        sectionTempo.push(el.tempo);
        sectionStart.push(el.start);
      });

      setSecTempoArray(sectionTempo);
      setSecStartArray(sectionStart);
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
          (Math.pow(secTempoArray[iSec], secTempoArray[iSec] / 100) / 20) * 0.7;
        setISec(iSec + 1);
      }
    });
    return null;
  };

  return (
    <ThreeScene>
      <ControlTime />
      <OrbitControls
        ref={OCRef}
        autoRotate={play}
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
      />
      {track && (
        <>
          <BufferBeatsPoints
            spotifyApi={spotifyApi}
            trackId={track.id}
            estado={play}
          />
          <BufferTatumsPoints
            spotifyApi={spotifyApi}
            trackId={track.id}
            estado={play}
          />
        </>
      )}
    </ThreeScene>
  );
};

export default Display;
