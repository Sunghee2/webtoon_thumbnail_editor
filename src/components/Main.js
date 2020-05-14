import React, { useRef, useState, useEffect, useContext } from 'react';
import '../styles/Main.scss';
import Button from '@material-ui/core/Button';
// import Resizer from './Resizer';
import readImgAsync from '../Utils/FileRead';
import CanvasTypeModal from './CanvasTypeModal';
import CanvasContainer from './CanvasContainer';
import { CropperInfoContext } from '../context/CropperInfoContext';

const Main = () => {
  const canvasRef = useRef(null);
  const [canvasScale, setCanvasScale] = useState({});
  // const [cropperInfo, setCropperInfo] = useState({});

  // const [isResize, setIsResize] = useState(false);
  const { state, dispatch } = useContext(CropperInfoContext);

  useEffect(() => {
    if (Object.keys(canvasScale).length) {
      const canvasEl = canvasRef.current;

      canvasEl.style.width = `${canvasScale.width}px`;
      canvasEl.style.height = `${canvasScale.height}px`;
    }
  }, [canvasScale]);

  const openImage = async evt => {
    const img = evt.target.files[0];
    const imgSrc = await readImgAsync(img);
    const canvasEl = canvasRef.current;
    const context = canvasEl.getContext(`2d`);
    const image = new Image();

    image.src = imgSrc;
    image.onload = () => {
      canvasEl.width = image.width;
      canvasEl.height = image.height;

      context.drawImage(image, 0, 0);

      canvasEl.style.width = `${canvasScale.width}px`;
      canvasEl.style.height = `${canvasScale.height}px`;
      if (canvasRef.current) {
        const { offsetLeft, offsetTop } = canvasRef.current;
        setCanvasScale({
          left: offsetLeft,
          top: offsetTop,
          width: canvasScale.width,
          height: canvasScale.height,
        });
        dispatch({
          type: 'init',
          offsetLeft,
          offsetTop,
          width: canvasScale.width,
          height: canvasScale.height,
        });
      }
    };
  };

  const [cropIsActive, setCropIsActive] = useState(false);

  const startCrop = e => {
    e.preventDefault();
    setCropIsActive(!cropIsActive);
  };

  const getScale = () => {
    const currentImage = new Image();
    currentImage.src = canvasRef.current.toDataURL();
    const { naturalWidth, naturalHeight } = currentImage;
    const { width, height } = canvasRef.current;
    return { x: naturalWidth / width, y: naturalHeight / height };
  };

  const applyCropper = e => {
    e.preventDefault();
    const currentImage = new Image();
    currentImage.src = canvasRef.current.toDataURL();
    currentImage.onload = () => {
      const ctx = canvasRef.current.getContext('2d');
      const scale = getScale();
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(
        currentImage,
        state.left * scale.x,
        state.top * scale.y,
        state.width * scale.x,
        state.height * scale.y,
        state.left,
        state.top,
        state.width,
        state.height,
      );
    };
    setCropIsActive(false);
  };

  // const [isImgMove, setIsImgMove] = useState(false);

  // useEffect(() => {
  //   if (isResize || isImgMove) {
  //     if (canvasRef.current) {
  //       const canvasEl = canvasRef.current;
  //       const context = canvasEl.getContext(`2d`);

  //       const { left, top, width, height } = cropperInfo;

  //       context.clearRect(0, 0, canvasEl.width, canvasEl.height);
  //       context.drawImage(imgEl, left, top, width, height);
  //     }
  //   }
  // }, [cropperInfo]);

  return (
    <>
      <CanvasTypeModal setCanvasScale={setCanvasScale} canvasRef={canvasRef} />
      <section>
        <aside>
          <Button className="open-btn" variant="contained" color="primary">
            OPEN IMAGE
            <input
              className="open-file"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={openImage}
            />
          </Button>
          <Button className="open-btn" variant="contained" color="primary" onClick={startCrop}>
            Crop
          </Button>
        </aside>
        <article className="editor-container horizontal">
          <CanvasContainer
            canvasScale={canvasScale}
            cropIsActive={cropIsActive}
            applyCropper={applyCropper}
          >
            <canvas className="editor" ref={canvasRef} />
          </CanvasContainer>
        </article>
      </section>
    </>
  );
};

export default Main;
