import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import CanvasLoader from "../Loader";
import * as THREE from "three";

const Computers = ({ isMobile }) => {
  const { scene } = useGLTF("./Avatar/6756e17a1aa3af1c627b3bec.glb");
  const modelRef = useRef();

  // Check for model loading errors
  if (!scene) {
    console.error("Failed to load model.");
    return null;
  }

  scene.traverse((node) => {
    if (node.isMesh && node.material.map) {
      node.material.map.encoding = THREE.sRGBEncoding;
    }
  });

  // Set initial rotation to look left when loaded
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = 1;
    }
  }, []);

  // Add rotation animation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
      modelRef.current.scale.set(2, 2, 2);
    }
  });

  return (
    <mesh ref={modelRef}>
      <primitive
        object={scene}
        position={[0, -1.5, 0]}
        rotation={[-0.01, 0, 0]}
        material={{ color: "#FFFFFF" }}
        scale={[2, 2, 2]}
      />
      <meshStandardMaterial attach="shadow" color="#000000" />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <ErrorBoundary fallback={null}>
      <Canvas
        frameloop="always"
        shadows
        dpr={[1, 2]}
        camera={{ position: [10, 5, 10], fov: 35 }}
        gl={{ preserveDrawingBuffer: true }}
        className="z-10"
      >
        {/* Boosted lighting so the model isn't too dark */}
        <ambientLight intensity={2.5} />
        <pointLight position={[10, 10, 10]} intensity={600} />
        <pointLight position={[-10, 5, -5]} intensity={300} color="#b0c4ff" />
        <directionalLight position={[0, 10, 5]} intensity={1.5} />

        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
            rotateSpeed={0.5}
          />
          <Computers isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </ErrorBoundary>
  );
};

export default ComputersCanvas;
