import React, { useRef, useState, useEffect, useContext } from 'react';
import '../styles/Main.scss';
import Button from '@material-ui/core/Button';
// import Resizer from './Resizer';
import readImgAsync from '../Utils/FileRead';
import CanvasTypeModal from './CanvasTypeModal';
import CanvasContainer from './CanvasContainer';
import { CropperInfoContext } from '../context/CropperInfoContext';
import { ResizerContext } from '../context/ResizerContext';

const Main = () => {
  const canvasRef = useRef(null);
  const [canvasScale, setCanvasScale] = useState({});
  const [isResize, setIsResize] = useState(false);
  // const [cropperInfo, setCropperInfo] = useState({});

  // const [isResize, setIsResize] = useState(false);
  const { state, dispatch } = useContext(CropperInfoContext);
  const [resizerState, resizerDispatch] = useContext(ResizerContext);
  const [imgEl, setImgEl] = useState(null);

  useEffect(() => {
    if (Object.keys(canvasScale).length) {
      const canvasEl = canvasRef.current;

      canvasEl.style.width = `${canvasScale.width}px`;
      canvasEl.style.height = `${canvasScale.height}px`;
    }
  }, [canvasScale]);

  useEffect(() => {
    if (isResize) {
      console.log('img', imgEl.width, imgEl.height);
      if (canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        const { left, top, width, height, first } = resizerState;

        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(
          imgEl,
          first.left,
          first.top,
          first.width,
          first.height,
          left,
          top,
          width,
          height,
        );
      }
    }
  }, [resizerState]);

  const openImage = async evt => {
    const img = evt.target.files[0];
    const imgSrc = await readImgAsync(img);
    const canvasEl = canvasRef.current;
    const context = canvasEl.getContext(`2d`);
    const image = new Image();

    image.src = imgSrc;
    image.onload = () => {
      setImgEl(image);

      canvasEl.width = canvasScale.width;
      canvasEl.height = canvasScale.height;
      context.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        canvasScale.width,
        canvasScale.height,
      );

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
        resizerDispatch({
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
      const canvasEl = canvasRef.current;
      const ctx = canvasEl.getContext('2d');
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

      const newImg = new Image();
      newImg.src = canvasEl.toDataURL();
      newImg.onload = () => {
        setImgEl(newImg);
      };
    };
    resizerDispatch({ type: 'first' });
    setCropIsActive(false);
  };

  const startResize = e => {
    e.preventDefault();
    // if (canvasRef.current) {
    //   if (imgEl) {
    //     resizerDispatch({ type: 'init',  });
    //   }
    // }
    resizerDispatch({ type: 'first' });
    setIsResize(true);
  };

  const finishResize = e => {
    e.preventDefault();
    setIsResize(false);
  };

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
          <Button className="open-btn" variant="contained" color="primary" onClick={startResize}>
            Resize
          </Button>
        </aside>
        <article className="editor-container horizontal">
          <CanvasContainer
            canvasScale={canvasScale}
            cropIsActive={cropIsActive}
            applyCropper={applyCropper}
            isResize={isResize}
            finishResize={finishResize}
          >
            <canvas className="editor" ref={canvasRef} />
          </CanvasContainer>
        </article>
      </section>
    </>
  );
};

export default Main;
