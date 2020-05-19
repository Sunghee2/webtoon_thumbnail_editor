import React, { useRef, useState, useEffect, useContext } from 'react';
import { Button, Drawer, IconButton, Divider } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import '../styles/Main.scss';
import readImgAsync from '../utils/FileRead';
import CanvasTypeModal from './CanvasTypeModal';
import CanvasContainer from './CanvasContainer';
import AddText from './AddText/AddText';
import AddTextList from './AddText/AddTextList';
import AdjustList from './Adjust/AdjustList';
import { CropperInfoContext, AddTextContext, AdjustContext } from '../context';

const Main = () => {
  const canvasRef = useRef(null);
  const [canvasScale, setCanvasScale] = useState({});
  const [imgEl, setImgEl] = useState(null);
  const [cropIsActive, setCropIsActive] = useState(false);
  const [focusedTextID, setFocusedTextID] = useState('');
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [mode, setMode] = useState('');
  const { state, dispatch } = useContext(CropperInfoContext);
  const { textContents } = useContext(AddTextContext);
  const [adjust, adjustDispatch] = useContext(AdjustContext);

  const Modes = {
    Crop: {
      start: () => {
        setCropIsActive(!cropIsActive);
      },
      end: () => {
        setCropIsActive(false);
      },
    },
    Adjust: {
      start: () => {
        setVisibleDrawer(true);
      },
      end: () => {
        setVisibleDrawer(false);
      },
    },
    Text: {
      start: () => {
        setVisibleDrawer(true);
      },
      end: () => {
        setVisibleDrawer(false);
        setFocusedTextID('');
      },
    },
  };

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
      let { width, height } = image;
      const maxWidth = 800;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        width *= maxWidth / height;
        height = maxWidth;
      }

      canvasEl.width = width;
      canvasEl.height = height;
      context.drawImage(image, 0, 0, width, height);
      const canvasData = new Image();
      canvasData.src = canvasEl.toDataURL();

      canvasData.onload = () => {
        setImgEl(canvasData);
      };

      if (canvasRef.current) {
        const { offsetLeft, offsetTop } = canvasRef.current;
        setCanvasScale({
          left: offsetLeft,
          top: offsetTop,
          width,
          height,
        });
        dispatch({
          type: 'init',
          offsetLeft,
          offsetTop,
          width: canvasScale.width,
          height: canvasScale.height,
        });
        adjustDispatch({ type: 'RESET' });
      }
    };
  };

  const getScale = () => {
    const currentImage = new Image();
    currentImage.src = canvasRef.current.toDataURL();
    const { naturalWidth, naturalHeight } = currentImage;
    const { width, height } = canvasRef.current;
    return { x: naturalWidth / width, y: naturalHeight / height };
  };

  const saveNewImage = () => {
    const newImg = new Image();
    newImg.src = canvasRef.current.toDataURL();
    newImg.onload = () => {
      setImgEl(newImg);
    };
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

      saveNewImage();
    };
    setCropIsActive(false);
  };

  const handleDrawerClose = () => {
    setVisibleDrawer(false);
    setFocusedTextID('');
  };

  const handleButtonClick = e => {
    if (mode) Modes[mode].end();

    Modes[e.currentTarget.id].start();
    setMode(e.currentTarget.id);
  };

  return (
    <>
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

          {imgEl &&
            Object.keys(Modes).map(key => (
              <Button
                key={key}
                id={key}
                className="open-btn"
                variant="contained"
                color="primary"
                onClick={handleButtonClick}
              >
                {key}
              </Button>
            ))}
        </aside>
        <article className="editor-container horizontal">
          <CanvasContainer
            canvasScale={canvasScale}
            cropIsActive={cropIsActive}
            applyCropper={applyCropper}
          >
            <canvas id="editor" className="editor" ref={canvasRef} />
            {textContents.length > 0 && (
              <AddTextList
                focusedTextID={focusedTextID}
                setFocusedTextID={setFocusedTextID}
                canvasScale={canvasScale}
                textMode={mode === 'Text'}
              />
            )}
          </CanvasContainer>
        </article>
      </section>
      <Drawer variant="persistent" anchor="right" open={visibleDrawer}>
        <div className="drawer">
          <IconButton className="close-drawer" onClick={handleDrawerClose}>
            <ChevronRight />
          </IconButton>
          <Divider />
          <div className="drawer-content">
            {mode === 'Text' && (
              <AddText
                focusedTextID={focusedTextID}
                canvasScale={canvasScale}
                setFocusedTextID={setFocusedTextID}
              />
            )}
            {mode === 'Adjust' && <AdjustList canvasRef={canvasRef} image={imgEl} />}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Main;
