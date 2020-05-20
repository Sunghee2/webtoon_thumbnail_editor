const drawText = (canvas, textContents) => {
  const context = canvas.getContext('2d');
  const padding = 10;
  const border = 3;
  const containerPadding = parseFloat(getComputedStyle(document.documentElement).fontSize, 0) * 3;

  textContents.forEach(item => {
    const { width, font, text, fontSize } = item;
    let { top, left } = item;
    context.textBaseline = 'top';
    context.textAlign = 'center';
    context.font = `${fontSize}px ${font}`;
    context.strokeStyle = 'white';
    context.lineWidth = 2;

    const textSplits = text.split(' ');
    const maxWidth = width - padding * 2;
    let line = '';
    left += width / 2 + border * 2 - containerPadding;
    top += padding - containerPadding;

    for (let i = 0; i < textSplits.length; i += 1) {
      let test = textSplits[i];
      let metrics = context.measureText(test);
      while (metrics.width > maxWidth) {
        test = test.substring(0, test.length - 1);
        metrics = context.measureText(test);
      }
      if (textSplits[i] !== test) {
        textSplits.splice(i + 1, 0, textSplits[i].substr(test.length));
        textSplits[i] = test;
      }

      test = `${line + textSplits[i]} `;
      metrics = context.measureText(test);

      if (metrics.width > maxWidth && i > 0) {
        context.strokeText(line, left, top);
        context.fillText(line, left, top);
        line = `${textSplits[i]} `;
        top += fontSize;
      } else {
        line = test;
      }
    }
    context.strokeText(line, left, top);
    context.fillText(line, left, top);
  });
};

export default drawText;
