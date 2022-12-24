import { useState, useMemo, useRef, useEffect } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { BufferAttribute, MathUtils } from "three";

import { BeatPointsShaderMaterial } from "./shaders/BeatPointsShaderMaterial.js";

const TWEEN = require("@tweenjs/tween.js");

const BufferBeatsPoints = ({ spotifyApi, trackId, estado, energy }) => {
  const [beatsArray, setBeatsArray] = useState([]);
  const [segments, setSegments] = useState(0);
  const [tatums, setTatums] = useState(0);
  const [iSec, setISec] = useState(0);
  const [iBeats, setIBeats] = useState(0);
  const [loud, setLoud] = useState(0);
  const [secStartArray, setSecStartArray] = useState([]);
  const [secLoudArray, setSecLoudArray] = useState([]);
  const [tiempoRef, setTiempoRef] = useState(Date.now());
  const [iStart, setIStart] = useState(false);
  const [pauseControl, setPauseControl] = useState(true);
  const [realTime, setRealTime] = useState(0);
  const [delayControl, setDelayControl] = useState(true);

  const COUNT = 2000;

  extend({ BeatPointsShaderMaterial });

  function getTrackBeats() {
    let analisysTrackBeats = [];
    let analisysStartSec = [];
    let analisysLoudSec = [];

    spotifyApi.getAudioAnalysisForTrack(trackId).then((res) => {
      res.body.beats.forEach(async (el) => {
        analisysTrackBeats.push(el.start);
      });

      if (
        analisysTrackBeats.length > 0 &&
        analisysTrackBeats.length === res.body.beats.length
      ) {
        setBeatsArray(analisysTrackBeats);
        setSegments(res.body.segments.length);
        setTatums(res.body.tatums.length);
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
    setIBeats(0);
    setISec(0);
    getTrackBeats();
  }, [trackId]);

  const refMaterial = useRef();
  let tweenRad;
  let tweenRadBack;
  let duraAnim = 160 - energy * 80;
  let tweenRadValue = { value: 0 };

  if (beatsArray.length > 0) {
    tweenRad = new TWEEN.Tween(tweenRadValue);
    tweenRad.to({ value: loud }, duraAnim);
    tweenRad.repeat(1);
    tweenRad.delay(0);
    tweenRad.yoyo(true);
    tweenRad.easing(TWEEN.Easing.Circular.In);
    tweenRad.onUpdate(() => {
      refMaterial.current.uRad = tweenRadValue.value;
    });

    tweenRadBack = new TWEEN.Tween(tweenRadValue);
    tweenRadBack.to({ value: loud / 2 }, duraAnim);
    tweenRadBack.repeat(1);
    tweenRadBack.delay(0);
    tweenRadBack.yoyo(true);
    tweenRadBack.easing(TWEEN.Easing.Circular.In);
    tweenRadBack.onUpdate(() => {
      refMaterial.current.uRad = tweenRadValue.value;
    });
  }

  let beatType;

  if (segments < tatums) {
    beatType = true;
  } else {
    beatType = false;
  }

  function roundEpsilon(n) {
    n = Math.round((n + Number.EPSILON) * 100) / 100;
    return n;
  }

  function loudSections(time, ats, loudSec) {
    if (time >= ats) {
      switch (true) {
        case loudSec <= 2:
          setLoud(0.3);
          break;
        case loudSec > 2 && loudSec <= 5:
          setLoud(0.2);
          break;
        case loudSec > 5 && loudSec <= 8:
          setLoud(0.15);
          break;
        case loudSec > 8 && loudSec <= 12:
          setLoud(0.1);
          break;
        case loudSec > 12 && loudSec <= 17:
          setLoud(0.05);
          break;
        case loudSec > 17:
          setLoud(0.01);
          break;
        default:
          break;
      }
      setISec(iSec + 1);
    }
  }

  let tiempoAcu;

  useFrame(({ clock }) => {
    if (beatsArray.length > 0 && iStart && estado) {
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

      tiempoAcu = roundEpsilon(tiempoAcu + realTime);

      const ats = roundEpsilon(secStartArray[iSec]);

      const atb = roundEpsilon(beatsArray[iBeats] - duraAnim / 100);

      loudSections(tiempoAcu, ats, Math.abs(secLoudArray[iSec]));

      if (tiempoAcu >= atb) {
        if (beatType === true) {
          if (iBeats % 2 !== 0) {
            tweenRad.start();
          } else {
            tweenRadBack.start();
          }
        } else {
          tweenRad.start();
        }
        setIBeats(iBeats + 1);
        if (beatsArray.length + 1 === iBeats) {
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
      const theta = MathUtils.randFloatSpread(360);
      const phi = MathUtils.randFloatSpread(360);

      positionArray[i * 3] =
        Math.sin(theta) * Math.cos(phi) - MathUtils.randFloatSpread(1) * 0.3;
      positionArray[i * 3 + 1] =
        Math.sin(theta) * Math.sin(phi) - MathUtils.randFloatSpread(1) * 0.3;
      positionArray[i * 3 + 2] =
        Math.cos(theta) - MathUtils.randFloatSpread(1) * 0.3;
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
      <beatPointsShaderMaterial ref={refMaterial} transparent={true} />
    </points>
  );
};

export default BufferBeatsPoints;
