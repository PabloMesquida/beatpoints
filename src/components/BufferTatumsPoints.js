import React from "react";
import { useState, useMemo, useRef, useEffect } from "react";
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import { extend, useFrame } from "@react-three/fiber";
import { BufferAttribute, MathUtils } from "three";

const TWEEN = require("@tweenjs/tween.js");

const BufferTatumsPoints = ({ spotifyApi, trackId, estado }) => {
  const count = 1200;
  const [tatumsArray, setTatumsArray] = useState([]);
  const [energy, setEnergy] = useState(0);
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

  function getTrackTatums() {
    let analisysTrackTatums = [];
    let analisysStartSec = [];
    let analisysLoudSec = [];

    spotifyApi.getAudioFeaturesForTrack(trackId).then((res) => {
      setEnergy(res.body.energy);
    });

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
  }, [trackId, estado]);

  const PointsShaderMaterial = shaderMaterial(
    // Uniforms
    {
      uPixelRatio: Math.min(window.devicePixelRatio, 2),
      uSize: 2,
      uScale: 2,
      uRad: 0,
      uTime: 0,
    },
    // Vertex
    glsl`
      uniform float uPixelRatio;
      uniform float uSize;
      uniform float uRad;
      uniform float uTime;
      uniform float uScale;

      varying float vAngle;
      varying vec4 vPosition;

      void main(){
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);

        float angle = atan(modelPosition.x, modelPosition.z);
        float distanceToCenter = length(modelPosition.xz);

        float angleOffset = (1.0 / distanceToCenter) * uTime * 2.0;
        angle += angleOffset;

        // modelPosition.x = cos(angle) * distanceToCenter;
        // modelPosition.z = sin(angle) * distanceToCenter;


        modelPosition.x *= 1.0 + (uRad * sin(angle)); // sin(uTime + modelPosition.x * 5.0) * uScale * 0.2;
        modelPosition.y *= 1.0 + (uRad * cos(angle)); // sin(uTime + modelPosition.x * 5.0) * uScale * 0.2;
        modelPosition.z *= 1.0 + (uRad * sin(angle)); // sin(uTime + modelPosition.x * 5.0) * uScale * 0.2;
        
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;

        gl_Position = projectionPosition;

        gl_PointSize = uSize * uScale * uPixelRatio;
        gl_PointSize *= (1.0 / - viewPosition.z);
        
        vAngle = angle;
        vPosition = modelPosition;
      }
      `,
    // Fragment
    glsl`

     uniform float uRad;
     uniform float uTime;

     varying float vAngle;
     varying vec4 vPosition;

      void main() {
        float r = 0.75 +  sin(uRad * 15.0)  ;
        float g = 0.0;
        float b = 0.75 -  sin(uRad * 5.0) ;

        gl_FragColor = vec4(r, g, b, 1.0);
     }`
  );

  extend({ PointsShaderMaterial });

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
      switch (true) {
        case loudSec <= 4:
          setLoud(0.07);
          break;
        case loudSec > 4 && loudSec <= 9:
          setLoud(0.05);
          break;
        case loudSec > 9 && loudSec <= 15:
          setLoud(0.03);
          break;
        case loudSec > 1:
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

      tiempoAcu = roundEpsilon(tiempoAcu + realTime);

      const ats = roundEpsilon(secStartArray[iSec]);

      const att = roundEpsilon(tatumsArray[iTat] - duraAnim / 100);

      loudSections(tiempoAcu, ats, Math.abs(secLoudArray[iSec]));

      if (tiempoAcu >= att) {
        tweenRad.start();
        setITat(iTat + 1);

        if (tatumsArray.length === iTat + 1) {
          setIStart(false);
          estado = false;
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
    const positionArray = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = MathUtils.randFloatSpread(360);
      const phi = MathUtils.randFloatSpread(360);

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
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach={"attributes-position"}
          {...points}
          needsUpdate={true}
        />
      </bufferGeometry>
      <pointsShaderMaterial ref={refMaterial} transparent={true} />
    </points>
  );
};

export default BufferTatumsPoints;
