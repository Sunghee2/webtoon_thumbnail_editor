import React, { useRef, useState, useEffect } from 'react';
import '../styles/Main.scss';
import Button from '@material-ui/core/Button';
import Cropper from './Cropper';
import CanvasTypeModal from './CanvasTypeModal';

const Main = () => {
  const canvasRef = useRef(null);
  const [canvasScale, setCanvasScale] = useState({});

  useEffect(() => {
    if (Object.keys(canvasScale).length) {
      const canvasEl = canvasRef.current;

      canvasEl.style.width = `${canvasScale.width}px`;
      canvasEl.style.height = `${canvasScale.height}px`;
    }
  }, [canvasScale]);

  const openImage = evt => {
    const canvasEl = canvasRef.current;
    const context = canvasEl.getContext(`2d`);
    const img = evt.target.files[0];
    const reader = new FileReader();

    reader.onload = readerEvt => {
      const image = new Image();

      image.src = readerEvt.target.result;
      image.onload = () => {
        const maxWidth = 800;
        let { width } = image;
        let { height } = image;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else if (height > maxWidth) {
          width *= maxWidth / height;
          height = maxWidth;
        }
        // canvasEl.width = width;
        // canvasEl.height = height;
        canvasEl.width = image.width;
        canvasEl.height = image.height;

        context.drawImage(image, 0, 0);

        canvasEl.style.width = `${canvasScale.width}px`;
        canvasEl.style.height = `${canvasScale.height}px`;
      };
    };
    if (img) {
      reader.readAsDataURL(img);
    }
  };

  const [cropIsActive, setCropIsActive] = useState(false);
  const startCrop = e => {
    e.preventDefault();
    setCropIsActive(!cropIsActive);
    if (canvasRef.current) {
      const { offsetLeft, offsetTop, width, height } = canvasRef.current;
      setCanvasScale({
        left: offsetLeft,
        top: offsetTop,
        width,
        height,
      });
    }
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
          {cropIsActive && <Cropper canvasScale={canvasScale} />}
        </article>
      </section>
    </>
  );
};

export default Main;
