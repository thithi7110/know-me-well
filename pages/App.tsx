import style from '../styles//App.module.css'
import { useState, useRef } from "react";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { Physics, useSphere } from '@react-three/cannon';

const Box = () => {
  const ref = useRef<MeshProps>(null);
  //const [ref, api] = useSphere(() => ({ args: [1.2], mass: 1, material: { restitution: 0.95 } }))
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState();

  // useFrame((state) => {
  //   if (ref && ref.current
  //     && api) {
  //     console.log(state.mouse.x);
  //     // console.log(state.mouse.y);
  //     //console.log(ref.current.position.x);
  //     // console.log(ref.current.position.y);
  //     //console.log(api.rotation);
  //     console.log(ref);
  //     setMousePosition(state.mouse.x);
  //     ref.current.rotation.x = state.mouse.x;
  //     // api.position.set(state.mouse.x, 0, 0), 

  //     // api.rotation.set(0, 0, (state.mouse.x * Math.PI) / 4)

  //     // api.rotation.set(state.mouse.x,state.mouse.y,0);
  //   }
  // }, 0);
  useFrame(({ mouse }) => {
    const x = (mouse.x * 10) / 2
    const y = (mouse.y * 5) / 2
    if (ref.current) {

      ref.current.rotation.set(-y, x, 0)
    }
  })


  return (
    <mesh
      ref={ref}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <boxBufferGeometry args={isHovered ? [1.2, 1.2, 1.2] : [1, 1, 1]} />
      <meshLambertMaterial color={isHovered ? 0x44c2b5 : 0x9178e6} />
    </mesh>
  );
};

export default function App() {
  return (
    <>
      <div style={{width:"100vw",height:"100vh"}}>
        <Canvas
          dpr={2} className={style.canvas}>
          <Physics iterations={5} gravity={[0, 0, 0]}>
            <color attach="background" args={[0xf5f3fd]} />
            <ambientLight intensity={0.5} />
            <directionalLight intensity={0.5} position={[-10, 10, 10]} />
            <Box />
          </Physics>
        </Canvas>
      </div>
    </>
  );
}
