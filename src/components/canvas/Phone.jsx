import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Environment } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import CanvasLoader from "../Loader";

const Model = () => {
  const { scene } = useGLTF("./Phone/scene.gltf");
  const ref = useRef();

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child.geometry?.attributes?.position) {
        const position = child.geometry.attributes.position;
        const array = position.array;
        let hasNaN = false;
        for (let i = 0; i < array.length; i++) {
          if (isNaN(array[i])) {
            array[i] = 0;
            hasNaN = true;
          }
        }
        if (hasNaN) child.geometry.computeBoundingSphere();
      }
    }
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.15;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={2.2}
      position={[0, -0.5, 0]}
      rotation={[0.1, 0, 0]}
    />
  );
};

const SceneCanvas = () => {
  return (
    <ErrorBoundary fallback={null}>
      <Canvas
        shadows
        frameloop="always"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        style={{ background: "transparent" }}
        camera={{ fov: 40, near: 0.1, far: 500, position: [0, 2, 18] }}
      >
        {/* Rich lighting setup */}
        <ambientLight intensity={1.8} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} castShadow color="#ffffff" />
        <directionalLight position={[-5, 5, -5]} intensity={1.2} color="#b0c4ff" />
        <pointLight position={[0, 8, 8]} intensity={300} color="#a78bfa" />
        <pointLight position={[8, -4, 4]} intensity={150} color="#60a5fa" />
        <Environment preset="city" />

        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
          <Model />
          <Preload all />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
};

export default SceneCanvas;
