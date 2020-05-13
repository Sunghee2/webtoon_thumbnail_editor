import React, { useRef, useState } from 'react';
import '../styles/Main.scss';
import { Button, Drawer, IconButton, Divider } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import Cropper from './Cropper';
import AddText from './AddText/AddText';
import AddTextList from './AddText/AddTextList';

const Main = props => {
  const canvasRef = useRef(null);
  const [canvasScale, setCanvasScale] = useState({});
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setVisibleDrawer(true);
  };

  const handleDrawerClose = () => {
    setVisibleDrawer(false);
  };

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
  const [textContents, setTextContents] = useState([]);

  const addTextContent = () => {
    const { width, height } = canvasScale;
    const id = `text_${new Date().getTime()}`;
    const newContent = {
      id,
      width,
      height,
      top: height / 2,
      left: width / 2,
      text: `글자를 입력하세요.`,
      font: `BlackHanSans`,
      focused: true,
    };
    setFocusedTextID(id);
    setTextContents(prevState => [...prevState, newContent]);
  };

  const handleTextPosition = (id, position) => {
    const { top, left } = position;
    setTextContents(prevState =>
      prevState.map(item => (item.id === id ? { ...item, top, left } : item)),
    );
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
        {canvasRef.current && (
          <Button className="open-btn" variant="contained" color="primary" onClick={startCrop}>
            Crop
          </Button>
        )}
        {canvasRef.current && (
          <Button
            className="add-text-btn open-btn"
            variant="contained"
            color="primary"
            onClick={handleDrawerOpen}
          >
            TEXT ADD
          </Button>
        )}
      </aside>
      <article className="editor-container horizontal">
        <canvas className="editor" ref={canvasRef}></canvas>
        {cropIsActive && <Cropper canvasScale={canvasScale} />}
        {textContents.length > 0 && (
          <AddTextList
            focusedTextID={focusedTextID}
            textContents={textContents}
            handleTextPosition={handleTextPosition}
            handleFocusedID={setFocusedTextID}
          />
        )}
      </article>
      <Drawer variant="persistent" anchor="right" open={visibleDrawer}>
        <div className="drawer">
          <IconButton onClick={handleDrawerClose}>
            <ChevronRight />
          </IconButton>
          <Divider />
          <div className="drawer-content">
            <AddText
              addTextContent={addTextContent}
              focusedTextID={focusedTextID}
              textContents={textContents}
            />
          </div>
        </div>
      </Drawer>
    </section>
  );
};

export default Main;
