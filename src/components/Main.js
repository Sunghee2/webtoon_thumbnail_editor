import React, { useRef, useState, useEffect, useContext } from 'react';
import { Button, Drawer, IconButton, Divider } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import '../styles/Main.scss';
import readImgAsync from '../utils/FileRead';
import CanvasTypeModal from './CanvasTypeModal';
import CanvasContainer from './CanvasContainer';
import AddText from './AddText/AddText';
import AddTextList from './AddText/AddTextList';
import AddTextDraw from './AddText/AddTextDraw';
import AdjustList from './Adjust/AdjustList';
import { CropperInfoContext, ResizerContext, AddTextContext, AdjustContext } from '../context';

const Main = () => {
  const canvasRef = useRef(null);
  const [canvasScale, setCanvasScale] = useState({});
  const [isResize, setIsResize] = useState(false);
  const [imgEl, setImgEl] = useState(null);
  const [cropIsActive, setCropIsActive] = useState(false);
  const [focusedTextID, setFocusedTextID] = useState('');
  const [textCanvasIsSaving, setTextCanvasSaving] = useState(false);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [mode, setMode] = useState('');
  const { state, dispatch } = useContext(CropperInfoContext);
  const [resizerState, resizerDispatch] = useContext(ResizerContext);
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
    Resize: {
      start: () => {
        resizerDispatch({ type: 'first' });
        setIsResize(true);
      },
      end: () => {
        setIsResize(false);
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
    Save: {
      start: () => {
        setTextCanvasSaving(true);
      },
      end: () => {},
    },
  };

  useEffect(() => {
    if (Object.keys(canvasScale).length) {
      const canvasEl = canvasRef.current;

      canvasEl.style.width = `${canvasScale.width}px`;
      canvasEl.style.height = `${canvasScale.height}px`;
    }
  }, [canvasScale]);

  useEffect(() => {
    if (isResize) {
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
    resizerDispatch({ type: 'first' });
    setCropIsActive(false);
  };

  const finishResize = e => {
    e.preventDefault();

    saveNewImage();
    resizerDispatch({ type: 'first' });
    setIsResize(false);
  };

  const drawTextCanvas = textCanvas => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(textCanvas, 0, 0);
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

          {imgEl &&
            Object.keys(Modes).map(key => (
              <Button
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
            isResize={isResize}
            finishResize={finishResize}
          >
            <canvas className="editor" ref={canvasRef} />
            {textContents.length > 0 && (
              <AddTextList
                focusedTextID={focusedTextID}
                setFocusedTextID={setFocusedTextID}
                canvasScale={canvasScale}
              />
            )}
          </CanvasContainer>
          {textCanvasIsSaving && (
            <AddTextDraw
              canvasScale={canvasScale}
              setFocusedTextID={setFocusedTextID}
              mergingCanvas={drawTextCanvas}
              setTextCanvasSaving={setTextCanvasSaving}
            />
          )}
        </article>
      </section>
      <Drawer variant="persistent" anchor="right" open={visibleDrawer}>
        <div className="drawer">
          <IconButton onClick={handleDrawerClose}>
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
