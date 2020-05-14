import React, { useRef, useState, useEffect } from 'react';
import '../styles/Main.scss';
import Button from '@material-ui/core/Button';
import Cropper from './Cropper';
import Resizer from './Resizer';
import readImgAsync from '../Utils/FileRead';
import CanvasTypeModal from './CanvasTypeModal';


const Main = () => {
  const canvasRef = useRef(null);
  // const [canvasScale, setCanvasScale] = useState({});
  const [cropperInfo, setCropperInfo] = useState({});
  const [imgEl, setImgEl] = useState(null);
  const [isResize, setIsResize] = useState(false);
  
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
      setImgEl(image);
      canvasEl.width = image.width;
      canvasEl.height = image.height;

      context.drawImage(image, 0, 0);

      canvasEl.style.width = `${canvasScale.width}px`;
      canvasEl.style.height = `${canvasScale.height}px`;
    }
  const [cropIsActive, setCropIsActive] = useState(false);
  const startCrop = e => {
    e.preventDefault();
    setCropIsActive(!cropIsActive);
  };

  const [cropperChange, setCropperChange] = useState({
    prevWidth: 0,
    prevHeight: 0,
    prevX: 0,
    prevY: 0,
    startX: 0,
    startY: 0,
  });

  const [activeResize, setActiveResize] = useState(false);
  const [activeImgResize, setActiveImgResize] = useState(false);
  const [activeImgMove, setActiveImgMove] = useState(false);
  const [direction, setDirection] = useState('');
  const [isImgMove, setIsImgMove] = useState(false);

  const startResize = e => {
    e.preventDefault();
    setActiveResize(true);
    setDirection(e.target.dataset.dir);
    setCropperChange({
      prevWidth: cropperInfo.width,
      prevHeight: cropperInfo.height,
      prevX: cropperInfo.left,
      prevY: cropperInfo.top,
      startX: e.clientX,
      startY: e.clientY,
    });
  };

  const startImgResize = e => {
    e.preventDefault();
    setIsResize(true);
    setActiveImgResize(true);
    setIsImgMove(false);
    setActiveImgMove(false);
    setDirection(e.target.dataset.dir);
    setCropperChange({
      prevWidth: cropperInfo.width,
      prevHeight: cropperInfo.height,
      prevX: cropperInfo.left,
      prevY: cropperInfo.top,
      startX: e.clientX,
      startY: e.clientY,
    });
  };

  const resizing = e => {
    e.preventDefault();
    const diffX = cropperChange.startX - e.clientX;
    const diffY = cropperChange.startY - e.clientY;
    const { prevWidth, prevHeight, prevX, prevY } = cropperChange;
    if (activeResize) {
      switch (direction) {
        case 'se':
          setCropperInfo(prev => ({
            ...prev,
            width: prevWidth - diffX,
            height: prevHeight - diffY,
          }));
          break;
        case 'ne':
          setCropperInfo(prev => ({
            ...prev,
            top: prevY - diffY,
            width: prevWidth - diffX,
            height: prevHeight + diffY,
          }));
          break;
        case 'sw':
          setCropperInfo(prev => ({
            ...prev,
            left: prevX - diffX,
            width: prevWidth + diffX,
            height: prevHeight - diffY,
          }));
          break;
        case 'nw':
          setCropperInfo({
            top: prevY - diffY,
            left: prevX - diffX,
            width: prevWidth + diffX,
            height: prevHeight + diffY,
          });
          break;
        default:
          break;
      }
    } else if (activeImgResize) {
      switch (direction) {
        case 'se':
          setCropperInfo(prev => ({
            ...prev,
            width: prevWidth - diffX,
            height: prevHeight - diffY,
          }));
          break;
        case 'ne':
          setCropperInfo(prev => ({
            ...prev,
            top: prevY - diffY,
            width: prevWidth - diffX,
            height: prevHeight + diffY,
          }));
          break;
        case 'sw':
          setCropperInfo(prev => ({
            ...prev,
            left: prevX - diffX,
            width: prevWidth + diffX,
            height: prevHeight - diffY,
          }));
          break;
        case 'nw':
          setCropperInfo(prev => ({
            ...prev,
            top: prevY - diffY,
            left: prevX - diffX,
            width: prevWidth + diffX,
            height: prevHeight + diffY,
          }));
          break;
        default:
          break;
      }
    } else if (activeImgMove) {
      setCropperInfo(prev => ({
        ...prev,
        top: prevY - diffY,
        left: prevX - diffX,
      }));
    }
  };
  const finishResize = e => {
    e.preventDefault();
    setActiveResize(false);
    setActiveImgResize(false);
    setActiveImgMove(false);
  };

  useEffect(() => {
    if (isResize || isImgMove) {
      if (canvasRef.current) {
        const canvasEl = canvasRef.current;
        const context = canvasEl.getContext(`2d`);

        const { left, top, width, height } = cropperInfo;

        context.clearRect(0, 0, canvasEl.width, canvasEl.height);
        context.drawImage(imgEl, left, top, width, height);
      }
    }
  }, [cropperInfo]);

  const startImgMove = e => {
    e.preventDefault();
    setIsImgMove(true);
    setActiveImgMove(true);
    setCropperChange({
      prevWidth: cropperInfo.width,
      prevHeight: cropperInfo.height,
      prevX: cropperInfo.left,
      prevY: cropperInfo.top,
      startX: e.clientX,
      startY: e.clientY,
    });
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
          {canvasRef.current && (
            <Button className="open-btn" variant="contained" color="primary" onClick={startCrop}>
              Crop
            </Button>
          )}
        </aside>
        <article className="editor-container horizontal">
          <canvas className="editor" ref={canvasRef} />
          {cropIsActive && <Cropper startResize={startResize} cropperInfo={cropperInfo} />}
          {isResize && (
            <Resizer
              startImgResize={startImgResize}
              startImgMove={startImgMove}
              cropperInfo={cropperInfo}
            />
          )}
        </article>
      </section>
    </>
  );
};

export default Main;
