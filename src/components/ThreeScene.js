import React from "react";
import { ThreeContainer } from "./ThreeScene.styles.js";
import { Canvas } from "@react-three/fiber";

const ThreeScene = ({ children }) => {
  return (
    <ThreeContainer>
      <Canvas
        camera={{ position: [0, 0, -3] }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {children}
      </Canvas>
    </ThreeContainer>
  );
};

export default ThreeScene;
