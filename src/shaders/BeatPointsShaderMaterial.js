import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

export const BeatPointsShaderMaterial = shaderMaterial(
  // Uniforms
  {
    uPixelRatio: Math.min(window.devicePixelRatio, 2),
    uSize: 2,
    uScale: 2,
    uRad: 0,
    uTime: 0,
    uTipe: 0,
  },
  // Vertex
  glsl`
      uniform float uPixelRatio;
      uniform float uSize;
      uniform float uRad;
      uniform float uTime;
      uniform float uScale;

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
      }
      `,
  // Fragment
  glsl`
     uniform float uRad;

      void main() {

        float r = 0.75 + sin(uRad) * 2.0;
        float g = 0.75 + sin(uRad) * 2.0;
        float b = 0.75 + sin(uRad) * 0.1;

        gl_FragColor = vec4( r, g, b, 1.0);
     }`
);

//
