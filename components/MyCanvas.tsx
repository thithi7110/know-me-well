import style from '../styles/App.module.css'
import { useEffect, ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Physics } from '@react-three/cannon';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 3;
      controls.maxDistance = 20;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};

export default function MyCanvas(props:{children?:ReactNode}) {
  return (
    <>
      <div style={{ width: "100%", height: "40vh" }}>
        <Canvas
          dpr={2} className={style.canvas}>
          <Physics iterations={5} gravity={[0, 0, 0]}>
            <CameraController />
            <ambientLight intensity={0.5} />
            <directionalLight intensity={0.5} position={[-10, 10, 10]} />
            {props.children}
            {/* <Box  /> */}
          </Physics>
        </Canvas>
      </div>
    </>
  );
}
