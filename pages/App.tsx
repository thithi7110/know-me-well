import style from '../styles/App.module.css'
import { useState, useRef, useEffect } from "react";
import { Canvas, MeshProps, useFrame, useThree } from "@react-three/fiber";
import { Physics, useSphere } from '@react-three/cannon';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import THREE from 'three';
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { MeshBasicMaterial } from "three/src/materials/MeshBasicMaterial";

const Box = () => {
  const ref = useRef<MeshProps>(null);
  //const [ref, api] = useSphere(() => ({ args: [1.2], mass: 1, material: { restitution: 0.95 } }))
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState();

  const loader = new TextureLoader();
  const materials = [
    new MeshBasicMaterial({map: loader.load('/anime/nanati2.jpg')}),
    new MeshBasicMaterial({map: loader.load('/anime/akira.jpg')}),
    new MeshBasicMaterial({map: loader.load('/anime/dominator.jpg')}),
    new MeshBasicMaterial({map: loader.load('/anime/kingxkomugi2.jpg')}),
    new MeshBasicMaterial({map: loader.load('/mush.png')}),
    new MeshBasicMaterial({map: loader.load('/anime/arrow.png')}),
  ];

  return (
    <mesh
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      material={materials}
    >
      <camera></camera>
      <boxBufferGeometry args={isHovered ? [1.5, 1.5, 1.5] : [1.5, 1.5, 1.5]} />
      <meshLambertMaterial color={isHovered ? "black" : 0x9178e6} />
    </mesh>
  );
};


const Box2 = () => {
  const ref = useRef<MeshProps>(null);
  //const [ref, api] = useSphere(() => ({ args: [1.2], mass: 1, material: { restitution: 0.95 } }))
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState();

  const loader = new TextureLoader();
  const materials = [
    new MeshBasicMaterial({map: loader.load('/engineer/python.webp')}),
    new MeshBasicMaterial({map: loader.load('/engineer/react.png')}),
    new MeshBasicMaterial({map: loader.load('/engineer/threeJS.png')}),
    new MeshBasicMaterial({map: loader.load('/engineer/aws.png')}),
    new MeshBasicMaterial({map: loader.load('/engineer/Csharp.png')}),
    new MeshBasicMaterial({map: loader.load('/engineer/docker.png')}),
  ];
  return (
    <mesh
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      material={materials}
      position={[2,1.5,1]}
    >
      <camera></camera>
      <boxBufferGeometry args={isHovered ? [1.5, 1.5, 1.5] : [1.5, 1.5, 1.5]} />
      <meshLambertMaterial color={isHovered ? "black" : 0x9178e6} />
    </mesh>
  );
};

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


export default function App() {
  return (
    <>
      <div style={{ width: "100vw", height: "100vh"}}>
        <Canvas
          dpr={2} className={style.canvas}>
          <Physics iterations={5} gravity={[0, 0, 0]}>       
            <CameraController />
            <ambientLight intensity={0.5} />
            <directionalLight intensity={0.5} position={[-10, 10, 10]} />
            <Box />
            <Box2 />
          </Physics>
        </Canvas>
      </div>
    </>
  );
}
