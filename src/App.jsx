import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Three from "./components/three/Three";

function App() {
  return (
    <Canvas id="three-canvas-container" shadows>
      <Suspense fallback={null}>
        <Three />
      </Suspense>
    </Canvas>
  );
}

export default App;

//Suspense helps to write lazy working components
