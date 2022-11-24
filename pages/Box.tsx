import style from '../styles/App.module.css'
import { useState, useRef, useEffect, ReactNode } from "react";
import { Canvas, MeshProps, useFrame, useThree } from "@react-three/fiber";
import { Physics, useSphere } from '@react-three/cannon';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { MeshBasicMaterial } from "three/src/materials/MeshBasicMaterial";
import { Mesh, Texture, Vector3 } from 'three';
import { promises } from 'stream';

// type BoxProps = {
//   imageData?: string[],
//   imageUrls?: string[],
//   size?: Vector3,
//   position?: Vector3,
// }

// export default function Box(props: BoxProps) {
//   const ref = useRef<Mesh>(null);
//   const [isHovered, setIsHovered] = useState(false);

//   useFrame(() => {
//     if (ref && ref.current) {
//       ref.current.rotation.x += 0.01;
//       ref.current.rotation.y += 0.01;
//     }
//   })

//   const loader = new TextureLoader();
//   const materials: MeshBasicMaterial[] = [];

//   props.imageData?.forEach(data => {
//     materials.push(new MeshBasicMaterial({ map: loader.load(data) }));
//   });

//   return (
//     <mesh
//       ref={ref}
//       onPointerOver={() => setIsHovered(true)}
//       onPointerOut={() => setIsHovered(false)}
//       material={materials}
//       position={props.position ? props.position : [0,0,0]}
//     >
//       <camera></camera>
//       <boxBufferGeometry args={props.size ? props.size : [1.5,1.5,1.5]} />
//       <meshLambertMaterial color={"black"}/>
//     </mesh>
//   );
// };

type BoxProps = {
  imageData?: string[],
  imageUrls?: string[],
  size?: number[],
  position?: Vector3,
}

export default function Box(props: BoxProps) {

  const ref = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  let initstate = (
    <mesh
      ref={ref}
      position={props.position ? props.position : [0, 0, 0]}
    >
      <camera></camera>
      <boxBufferGeometry args={props.size ? props.size : [1.5, 1.5, 1.5]} />
      <meshLambertMaterial color={"black"} />
    </mesh>
  );
  const [state, setState] = useState<ReactNode>(initstate);
  useFrame(() => {
    if (ref && ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }
  })

  useEffect(() => {

    const loader = new TextureLoader();
    const materials: MeshBasicMaterial[] = [];


    const asyncLoad = async (object: Texture) => {
      materials.push(new MeshBasicMaterial({ map: object }));
    }

    const promisses = props.imageData?.map(data => {
      let promise = loader.load(data);
      return promise
    });
    let promisses2: Texture[] = [];
    if (promisses) {
      promisses2 = promisses?.filter((e): e is Exclude<typeof e, undefined> => e !== undefined);
    }

    // promiseAll
    (async () => {

      const results = await Promise.all<Texture[]>(promisses2);

      // Promise.all完了後materials作成
      results.map((texture) => {
        materials.push(new MeshBasicMaterial({ map: texture }));
      })
      console.log("★Promise終了")

      // setState (
      //   <mesh
      //     ref={ref}
      //     // onPointerOver={() => setIsHovered(true)}
      //     // onPointerOut={() => setIsHovered(false)}
      //     material={materials}
      //     position={props.position ? props.position : [0, 0, 0]}
      //   >
      //     <camera></camera>
      //     <boxBufferGeometry args={props.size ? props.size : [1.5, 1.5, 1.5]} />
      //     <meshLambertMaterial color={"black"} />
      //   </mesh>
      // );

    })();

    setState(
      <mesh
        ref={ref}
        // onPointerOver={() => setIsHovered(true)}
        // onPointerOut={() => setIsHovered(false)}
        material={materials}
        position={props.position ? props.position : [0, 0, 0]}
      >
        <camera></camera>
        <boxBufferGeometry args={props.size ? props.size : [1.5, 1.5, 1.5]} />
        <meshLambertMaterial color={"black"} />
      </mesh>
    );
  }, [props])

  return (
    <>
      {state}
    </>);
};

// export default function Box() {
//   const ref = useRef<Mesh>(null);
//   //const [ref, api] = useSphere(() => ({ args: [1.2], mass: 1, material: { restitution: 0.95 } }))
//   const [isHovered, setIsHovered] = useState(false);
//   const [mousePosition, setMousePosition] = useState();

//   useFrame(() => {
//     if (ref && ref.current) {
//       ref.current.rotation.x += 0.01;
//       ref.current.rotation.y += 0.01;
//     }
//   })

//   const loader = new TextureLoader();
//   const materials = [
//     new MeshBasicMaterial({ map: loader.load('/anime/nanati2.jpg') }),
//     new MeshBasicMaterial({ map: loader.load('/anime/akira.jpg') }),
//     new MeshBasicMaterial({ map: loader.load('/anime/dominator.jpg') }),
//     new MeshBasicMaterial({ map: loader.load('/anime/kingxkomugi2.jpg') }),
//     new MeshBasicMaterial({ map: loader.load('/mush.png') }),
//     new MeshBasicMaterial({ map: loader.load('/anime/arrow.png') }),
//   ];

//   return (
//     <mesh
//       ref={ref}
//       onPointerOver={() => setIsHovered(true)}
//       onPointerOut={() => setIsHovered(false)}
//       material={materials}
//     >
//       <camera></camera>
//       <boxBufferGeometry args={isHovered ? [1.5, 1.5, 1.5] : [1.5, 1.5, 1.5]} />
//       <meshLambertMaterial color={isHovered ? "black" : 0x9178e6} />
//     </mesh>
//   );
// }