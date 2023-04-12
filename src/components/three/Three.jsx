import React, { useEffect, useRef } from "react";
import { angleToRadians } from "../../utils/angle";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { Car } from "./Car";

export default function Three() {
  const orbitControlsRef = useRef(null);

  // Code to move the camera around while dragging mouse
  //   useFrame((state) => {
  //     if (!!orbitControlsRef.current) {
  //       const { x, y } = state.mouse;
  //       orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45));
  //       orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30));
  //       orbitControlsRef.current.update();
  //     }
  //   });

  //animation
  const ballRef = useRef(null);
  useEffect(() => {
    if (!!ballRef.current) {
      //   console.log(ballRef); //you can animate any property in the object.
      // Timeline
      const timeline = gsap.timeline({ paused: true });

      // x-axis motion
      timeline.to(ballRef.current.position, {
        x: 1,
        duration: 2,
        ease: "power2.out",
      });

      // y-axis motion
      timeline.from(
        ballRef.current.position,
        {
          y: 2,
          duration: 1.2,
          ease: "bounce.out",
        },
        "<" //this symbol shows that this animation should start at the sam time with the prev animation
      );

      // Play
      timeline.play();
    }
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      <OrbitControls
        // ref={orbitControlsRef}
        minPolarAngle={angleToRadians(60)}
        maxPolarAngle={angleToRadians(80)}
      />
      {/* camera cant go more than  minPolarAngle={angleToRadians(60)}, maxPolarAngle={angleToRadians(80)*/}

      {/* sphere */}
      <mesh position={[0, 0.5, 1]} castShadow ref={ballRef}>
        {/* SphereGeometry(radius, widthSegment, heightSegment)*/}
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* car */}

      <Car />

      {/* floor */}
      <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#ffa000" metalness={0.6} roughness={0.5} />
      </mesh>

      {/* ambient light */}
      {/* takes in two arguments, the color of the light and intensity */}
      <ambientLight args={["#ffffff", 0.02]} />

      {/* directional light */}
      <pointLight args={["#ffffff", 1, 10]} position={[-2, 1, 0]} castShadow />

      {/* environment */}
      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial color="#f56f00" side={THREE.BackSide} />
        </mesh>
      </Environment>
    </>
  );
}

//args takes a list of all the parameters you will parse into the constructor
