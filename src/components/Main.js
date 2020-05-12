import React, { useRef, useState, useContext } from 'react';
import '../styles/Main.scss';
import Button from '@material-ui/core/Button';
import CanvasContainer from './CanvasContainer';
import { CropperInfoContext } from '../context/CropperInfoContext';

const Main = props => {
  const canvasRef = useRef(null);
  const [canvasScale, setCanvasScale] = useState({});
  const { state, dispatch } = useContext(CropperInfoContext);
  const openImage = evt => {
    console.log(evt.target.files[0]);
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
        canvasEl.width = width;
        canvasEl.height = height;
        context.drawImage(image, 0, 0, width, height);
        if (canvasRef.current) {
          const { offsetLeft, offsetTop } = canvasRef.current;
          setCanvasScale({
            left: offsetLeft,
            top: offsetTop,
            width,
            height,
          });
          dispatch({ type: 'init', offsetLeft, offsetTop, width, height });
        }
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
  };
  return (
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
        <CanvasContainer cropIsActive={cropIsActive}>
          <canvas className="editor" ref={canvasRef} />
        </CanvasContainer>
      </article>
    </section>
  );
};

export default Main;
