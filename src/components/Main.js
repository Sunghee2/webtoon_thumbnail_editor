import React, { useRef, useState, useContext } from 'react';
import { Button, Drawer, IconButton, Divider } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { AddTextContext } from '../context/AddTextContext';
import Cropper from './Cropper';
import AddText from './AddText/AddText';
import AddTextList from './AddText/AddTextList';
import AddTextDraw from './AddText/AddTextDraw';
import '../styles/Main.scss';

const Main = () => {
  const canvasRef = useRef(null);
  const [canvasScale, setCanvasScale] = useState({});

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

  const [focusedTextID, setFocusedTextID] = useState('');
  const [textCanvasIsSaving, setTextCanvasSaving] = useState(false);
  const { textContents } = useContext(AddTextContext);

  const drawTextCanvas = textCanvas => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(textCanvas, 0, 0);
  };

  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setVisibleDrawer(true);
  };

  const handleDrawerClose = () => {
    setVisibleDrawer(false);
    setFocusedTextID('');
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

          {canvasRef.current && (
            <>
              <Button className="open-btn" variant="contained" color="primary" onClick={startCrop}>
                Crop
              </Button>
              <Button
                className="open-btn"
                variant="contained"
                color="primary"
                onClick={handleDrawerOpen}
              >
                Adjust
              </Button>
              <Button
                className="add-text-btn open-btn"
                variant="contained"
                color="primary"
                onClick={handleDrawerOpen}
              >
                TEXT ADD
              </Button>
              <Button
                className="add-text-btn open-btn"
                variant="contained"
                color="primary"
                onClick={() => setTextCanvasSaving(true)}
              >
                SAVE
              </Button>
            </>
          )}
        </aside>
        <article className="editor-container horizontal">
          <canvas className="editor" ref={canvasRef} />
          {cropIsActive && <Cropper canvasScale={canvasScale} />}
          {textCanvasIsSaving && (
            <AddTextDraw
              canvasScale={canvasScale}
              setFocusedTextID={setFocusedTextID}
              mergingCanvas={drawTextCanvas}
              setTextCanvasSaving={setTextCanvasSaving}
            />
          )}
          {textContents.length > 0 && (
            <AddTextList
              focusedTextID={focusedTextID}
              setFocusedTextID={setFocusedTextID}
              canvasScale={canvasScale}
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
            {/* <AdjustList /> */}
            <AddText
              focusedTextID={focusedTextID}
              canvasScale={canvasScale}
              setFocusedTextID={setFocusedTextID}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Main;
