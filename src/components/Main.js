import React, { useRef, useState, useEffect, useContext } from 'react';
import { Button, Drawer, IconButton, Divider } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import '../styles/Main.scss';
import readImgAsync from '../utils/FileRead';
import CanvasContainer from './CanvasContainer';
import AddText from './AddText/AddText';
import AddTextList from './AddText/AddTextList';
import AdjustList from './Adjust/AdjustList';
import { CropperInfoContext, AddTextContext, AdjustContext } from '../context';

const Main = () => {
  const canvasRef = useRef(null);
  const [backgroundCanvas, setBackgroundCanvas] = useState(null);
  const [canvasScale, setCanvasScale] = useState({});
  const [imgEl, setImgEl] = useState(null);
  const [notFilteredImgEl, setNotFilteredImgEl] = useState(null);
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
        const img = new Image();
        img.src = canvasRef.current.toDataURL();
        img.onload = () => {
          setImgEl(img);
          setCropIsActive(!cropIsActive);
        };
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
    const canvas = document.createElement('canvas');
    canvas.width = canvasRef.current.width;
    canvas.height = canvasRef.current.height;
    setBackgroundCanvas(canvas);
  }, []);

  useEffect(() => {
    if (Object.keys(canvasScale).length) {
      backgroundCanvas.width = canvasRef.current.width;
      backgroundCanvas.height = canvasRef.current.height;
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
      const maxWidth = 600;

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
        setNotFilteredImgEl(canvasData);
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
          width: canvasEl.width / 2,
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

  const saveNewImage = (sx, sy, swidth, sheight, x, y, width, height) => {
    const backgroundContext = backgroundCanvas.getContext('2d');
    backgroundContext.clearRect(0, 0, backgroundContext.width, backgroundContext.height);
    backgroundContext.drawImage(notFilteredImgEl, sx, sy, swidth, sheight, x, y, width, height);
    const notFilteredImg = new Image();
    notFilteredImg.src = backgroundCanvas.toDataURL();
    notFilteredImg.onload = () => setNotFilteredImgEl(notFilteredImg);
  };

  const applyCropper = e => {
    e.preventDefault();
    const currentImage = new Image();
    currentImage.src = canvasRef.current.toDataURL();
    currentImage.onload = () => {
      const canvasEl = canvasRef.current;
      const ctx = canvasEl.getContext('2d');
      const scale = getScale();
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      canvasEl.width = state.isWide ? 800 : 300;
      canvasEl.height = state.isWide ? 450 : 400;
      const { width, height, offsetTop, offsetLeft } = canvasEl;
      ctx.drawImage(
        currentImage,
        (state.left - offsetLeft) * scale.x,
        (state.top - offsetTop) * scale.y,
        state.width * scale.x,
        state.height * scale.y,
        0,
        0,
        width,
        height,
      );

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
        width: canvasEl.width / 2,
      });

      saveNewImage(
        (state.left - offsetLeft) * scale.x,
        (state.top - offsetTop) * scale.y,
        state.width * scale.x,
        state.height * scale.y,
        0,
        0,
        width,
        height,
      );
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

  const rotateCanvas = (context, img, rotateCount, width, height) => {
    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2);
    context.rotate((rotateCount * (90 * Math.PI)) / 180);
    context.translate(-1 * (width / 2), -1 * (height / 2));

    if (rotateCount % 2) {
      if (width > height) {
        context.drawImage(
          img,
          (width - height) / 2,
          (height - height ** 2 / width) / 2,
          height,
          height ** 2 / width,
        );
      } else {
        context.drawImage(
          img,
          (width - width ** 2 / height) / 2,
          (height - width) / 2,
          width ** 2 / height,
          width,
        );
      }
    } else {
      context.drawImage(img, 0, 0);
    }
    context.restore();
  };

  const rotate = rightOrLeft => {
    // 1: right, -1: left
    const canvasEl = canvasRef.current;
    const { width, height } = canvasEl;
    const rotateCount = (state.rotateCount + rightOrLeft) % 4;
    dispatch({ type: 'rotate', rotateCount });

    rotateCanvas(canvasEl.getContext('2d'), imgEl, rotateCount, width, height);
    rotateCanvas(backgroundCanvas.getContext('2d'), notFilteredImgEl, rotateCount, width, height);
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
            rotate={rotate}
            canvasRef={canvasRef}
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
            {mode === 'Adjust' && <AdjustList canvasRef={canvasRef} image={notFilteredImgEl} />}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Main;
