import React, { useState, useMemo, useRef, useEffect } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { BufferAttribute, MathUtils } from "three";
import { TatumsPointsShaderMaterial } from "./shaders/TatumsPointsShaderMaterial.js";

const TWEEN = require("@tweenjs/tween.js");

const BufferTatumsPoints = ({ spotifyApi, trackId, estado, energy }) => {
  const [tatumsArray, setTatumsArray] = useState([]);
  const [iTat, setITat] = useState(0);
  const [tiempoRef, setTiempoRef] = useState(Date.now());
  const [loud, setLoud] = useState(0);
  const [secStartArray, setSecStartArray] = useState([]);
  const [secLoudArray, setSecLoudArray] = useState([]);
  const [iSec, setISec] = useState(0);
  const [iStart, setIStart] = useState(false);
  const [pauseControl, setPauseControl] = useState(true);
  const [realTime, setRealTime] = useState(0);
  const [delayControl, setDelayControl] = useState(true);

  const COUNT = 3200;

  extend({ TatumsPointsShaderMaterial });

  function getTrackTatums() {
    if (!trackId) {
      console.log("NO.TRACK");
    } else {
      console.log("TRACK");
    }

    //return;
    let analisysTrackTatums = [];
    let analisysStartSec = [];
    let analisysLoudSec = [];

    spotifyApi.getAudioAnalysisForTrack(trackId).then((res) => {
      res.body.tatums.forEach(async (el) => {
        analisysTrackTatums.push(el.start);
      });

      if (
        analisysTrackTatums.length > 0 &&
        analisysTrackTatums.length === res.body.tatums.length
      ) {
        setTatumsArray(analisysTrackTatums);
      }

      res.body.sections.forEach((el) => {
        analisysStartSec.push(el.start);
        analisysLoudSec.push(el.loudness);
      });

      if (analisysStartSec.length === res.body.sections.length) {
        setSecStartArray(analisysStartSec);
      }

      if (analisysLoudSec.length === res.body.sections.length) {
        setSecLoudArray(analisysLoudSec);
      }
    });
  }

  useEffect(() => {
    setTiempoRef(Date.now());
    setRealTime(0);
    setIStart(true);
    setITat(0);
    setISec(0);
    getTrackTatums();
  }, [trackId]);

  const refMaterial = useRef();

  let tweenRad;
  let duraAnim = 80 - energy * 50;

  let tweenRadValue = { value: 0 };

  if (tatumsArray.length > 0) {
    tweenRad = new TWEEN.Tween(tweenRadValue);
    tweenRad.to({ value: loud }, duraAnim);
    tweenRad.repeat(1);
    tweenRad.delay(0);
    tweenRad.yoyo(true);
    tweenRad.easing(TWEEN.Easing.Circular.In);
    tweenRad.onUpdate(() => {
      refMaterial.current.uRad = tweenRadValue.value;
    });
  }

  function roundEpsilon(n) {
    n = Math.round((n + Number.EPSILON) * 100) / 100;
    return n;
  }

  function loudSections(time, ats, loudSec) {
    if (time >= ats) {
      const loudness =
        loudSec <= 4 ? 0.07 : loudSec <= 9 ? 0.05 : loudSec <= 15 ? 0.03 : 0.01;
      setLoud(loudness);
      setISec((iSec | 0) + 1);
    }
  }

  // function loudSections(time, ats, loudSec) {
  //   if (time >= ats) {
  //     switch (true) {
  //       case loudSec <= 4:
  //         setLoud(0.07);
  //         break;
  //       case loudSec > 4 && loudSec <= 9:
  //         setLoud(0.05);
  //         break;
  //       case loudSec > 9 && loudSec <= 15:
  //         setLoud(0.03);
  //         break;
  //       case loudSec > 1:
  //         setLoud(0.01);
  //         break;
  //       default:
  //         break;
  //     }
  //     setISec(iSec + 1);
  //   }
  // }

  let tiempoAcu;

  useFrame(({ clock }) => {
    if (tatumsArray.length > 0 && iStart && estado) {
      if (delayControl) {
        setTiempoRef(Date.now());
        setDelayControl(false);
      }
      if (!pauseControl) {
        setTiempoRef(Date.now());
        setPauseControl(true);
      }

      refMaterial.current.uTime = clock.getElapsedTime();

      tiempoAcu = (Date.now() - tiempoRef) / 1000;
      // console.log("realtime on", realTime);
      tiempoAcu = roundEpsilon(tiempoAcu + realTime);

      const ats = roundEpsilon(secStartArray[iSec]);

      const att = roundEpsilon(tatumsArray[iTat] - duraAnim / 100);

      loudSections(tiempoAcu, ats, Math.abs(secLoudArray[iSec]));

      if (tiempoAcu >= att) {
        tweenRad.start();
        setITat(iTat + 1);

        if (tatumsArray.length + 1 === iTat) {
          setIStart(false);
        }
      }
    }
    if (!estado) {
      if (pauseControl) {
        tiempoAcu = (Date.now() - tiempoRef) / 1000;
        tiempoAcu = roundEpsilon(tiempoAcu);
        setRealTime(realTime + tiempoAcu - 0.1);
        setPauseControl(false);
        tiempoAcu = 0;
      }
    }
    TWEEN.update();
  });

  const points = useMemo(() => {
    const positionArray = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const theta = MathUtils.randFloatSpread(180);
      const phi = MathUtils.randFloatSpread(180);

      positionArray[i * 3] =
        Math.sin(theta) * Math.cos(phi) - MathUtils.randFloatSpread(1) * 0.1;
      positionArray[i * 3 + 1] =
        Math.sin(theta) * Math.sin(phi) - MathUtils.randFloatSpread(1) * 0.1;
      positionArray[i * 3 + 2] =
        Math.cos(theta) - MathUtils.randFloatSpread(1) * 0.1;
    }

    return new BufferAttribute(positionArray, 3);
  });

  return (
    <points rotation={[Math.PI * 0.5, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach={"attributes-position"}
          {...points}
          needsUpdate={true}
        />
      </bufferGeometry>
      <tatumsPointsShaderMaterial ref={refMaterial} transparent={true} />
    </points>
  );
};

export default BufferTatumsPoints;
