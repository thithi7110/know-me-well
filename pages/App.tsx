import Image from 'next/image';
import Link from 'next/link';
import React, { MouseEventHandler, ReactNode, useCallback, useState } from 'react';
import style from 'styles/App.module.css'
import { Vector3 } from 'three';
import Box from './Box';
import MyCanvas from './MyCanvas';


const Img = (props: { id: string, imgsrc: string, onClick: (event: React.MouseEvent<HTMLInputElement>, id: string, imagedata: string | ArrayBuffer | null) => void, imgalt?: string }) => {
  // const Img = (props: { id: string, imgsrc: string, onClick: (id: string) => void, imgalt?: string }) => {

  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {

    let img = document.querySelector<HTMLImageElement>('#img_' + props.id);
    if (img) {
      // New Canvas
      let canvas = document.createElement('canvas');
      // canvas.width = img.width;
      // canvas.height = img.height;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      // Draw Image
      let ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        // To Base64
        const base64Text = canvas.toDataURL("image/jpeg");
        props.onClick(e, props.id, base64Text);
      }
    }


    // const readFile = async (json) =>
    //   new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     const blob = new Blob([JSON.stringify(json)]);

    //     reader.onload = async (e) => resolve(JSON.parse(e.target.result));
    //     reader.readAsText(blob);
    //   });


    // const uploadImage = document.querySelector('#img_' + props.id)
    // if (uploadImage && (uploadImage as HTMLInputElement).files) {
    //   const files = (uploadImage as HTMLInputElement).files;

    //   if (files) {

    //     const file = files.length > 0 ? files[0] : null;

    //     const reader: FileReader = new FileReader()
    //     reader.onload = (event) => {
    //       const base64Text = reader.result
    //       props.onClick(e, props.id, base64Text);
    //     }
    //     reader.readAsArrayBuffer(props.imgsrc);

    //   }
    // }

    // props.onClick(props.id);
  }

  return (
    <>
      <div className='relative p-1' id={"imgcontainer_" + props.id}>
        <input className="sr-only peer" type="checkbox" value="yes" name="answer" id={props.id} onClick={onClick} />

        <label className="flex rounded-sm cursor-pointer focus:outline-none
           hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-transparent
           " htmlFor={props.id}><img className="rounded-sm" id={"img_" + props.id} src={props.imgsrc} alt={props.imgalt ? props.imgalt : ""} /></label>

        <div className="absolute hidden w-5 h-5 peer-checked:block top-1 left-1">
          ✅
        </div>
      </div>
    </>
  )
}

export default function App() {

  const [imgs, setImgs] = useState<ReactNode>();

  const [box, setBox] = useState<ReactNode>();
  const [box2, setBox2] = useState<ReactNode>();

  type ImageInfo = {
    imageName: string,
    data: string | ArrayBuffer | null
  }
  type ImageInfo2 = {
    datas: ImageInfo[],
    position: Vector3
  }
  const [selectedImgs, setSelectedImgs] = useState<ImageInfo[]>([]);
  const [selectedImgs2, setSelectedImgs2] = useState<Array<ImageInfo2>>([]);

  //const onClick = useCallback((e:React.MouseEvent<HTMLInputElement>,id:string) => {
  const onClick = useCallback((e: React.MouseEvent<HTMLInputElement>, id: string, imagedata: string | ArrayBuffer | null) => {

    //prev使わないと毎回初期化された値が返されるため前回Stateを操作する
    let count = 0;
    setSelectedImgs(
      (prevSelectedImgs) => {
        let wkselectedImgs = [...prevSelectedImgs];
        if ((e.target as HTMLInputElement).checked) {
          wkselectedImgs.push({ imageName: id, data: imagedata });

          count = wkselectedImgs.length;

          wkselectedImgs = [...wkselectedImgs]
        } else {
          count = wkselectedImgs.length;

          wkselectedImgs = [...wkselectedImgs.filter((v) => v.imageName != id)]
        }

        //6面揃ったらBox作成
        // if (count > 5) {
        {
          let imagedata: string[] = [];
          wkselectedImgs.map((r) => {
            imagedata.push(String(r.data));
          })

          let box =
            <Box imageData={imagedata} position={new Vector3(0, 0, 0)} size={[2, 2, 2]} />

          setBox(box);

        }

        return wkselectedImgs;
      });



  }, [selectedImgs]);

  const getImages = () => {
    //TBD★
    let list: ReactNode[] = [];

    let data = "/anime/akira.jpg"
    let data2 = "/anime/nanati.jpg"

    for (let i: number = 0; i < 20; i++) {
      let ret = "img" + ('000' + i).slice(-3);

      if (i % 2 == 0) {
        list.push(
          // <Img id={ret} imgsrc='/anime/akira.jpg' onClick={onClick} />        
          <Img id={ret} imgsrc={data} onClick={onClick} />
        );
      } else {
        list.push(
          <Img id={ret} imgsrc={data2} onClick={onClick} />
        );
      }
    }

    const wk_imgs = (() => {
      return <div className="grid grid-cols-4">
        {list}
      </div>
    });

    setImgs(wk_imgs);
  }

  const onBlur = () => {

    getImages();
  }
  const getRandomInt = (max:number) => {
    return Math.floor(Math.random() * max);
  }

  const onClickBox2 = () => {
    let wkselectedImgs2: Array<ImageInfo2> = [];
    if (selectedImgs2) {
      wkselectedImgs2 = selectedImgs2;
      
      wkselectedImgs2.push({datas:selectedImgs,position:new Vector3(getRandomInt(10),getRandomInt(10),getRandomInt(10))});
    }
    else {
      wkselectedImgs2.push({datas:selectedImgs,position:new Vector3(0,0,0)});
    }
    setSelectedImgs2(wkselectedImgs2);

    if (wkselectedImgs2) {
      setBox2(
        wkselectedImgs2.map(b => {


          let imagedata: string[] = [];
          b.datas.map((r) => {
            imagedata.push(String(r.data));
            
          })

          let box =
            <Box imageData={imagedata} position={b.position} size={[2, 2, 2]} />

          return box;

        })
      )
    }
  }


  return (
    <>
      <div className='bg-red-500'>
        <p><Link href="/">Top</Link></p>
        <br />
        <h1 className='text-2xl' >Know Me Well!</h1>
        <p>Let me your favarite things..</p>
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </span>
          <input className="placeholder:italic placeholder:text-slate-400 block w-full border border-slate-300 rounded-md 
        py-2 pl-9 pr-3 shadow-sm focus:outline-none 
        focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"

            onBlur={onBlur}
          />
        </label>
        <div>
          {imgs}
        </div>

      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={onClickBox2}
      >追加</button>
      <MyCanvas>{box}</MyCanvas>
      <MyCanvas>{box2}</MyCanvas>
    </>
  );
}
