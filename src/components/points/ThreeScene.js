import React from "react";
import { ThreeContainer } from "./ThreeScene.styles.js";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "../../hooks/useMediaQuery.js";

const ThreeScene = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width: 900px)");
  return (
    <ThreeContainer>
      <Canvas
        camera={{ position: [0, 0, -3] }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          top: isDesktop ? "0" : "-50px",
        }}
      >
        {children}
      </Canvas>
    </ThreeContainer>
  );
};

export default ThreeScene;
