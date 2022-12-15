import React from "react";
import { ThreeContainer } from "./ThreeScene.styles.js";
import { Canvas } from "@react-three/fiber";

const ThreeScene = ({ children }) => {
  return (
    <ThreeContainer>
      <Canvas
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: "-1",
        }}
      >
        {children}
      </Canvas>
    </ThreeContainer>
  );
};

export default ThreeScene;
