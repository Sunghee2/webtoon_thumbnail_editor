const truncate = value => {
  if (value > 255) return 255;
  if (value < 0) return 0;
  return value;
};

export const brightnessFilter = (pixels, value) => {
  const d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] += value / 3;
    d[i + 1] += value / 3;
    d[i + 2] += value / 3;
  }
  return pixels;
};

export const contrastFilter = (pixels, value) => {
  const d = pixels.data;
  const factor = (259 * (value + 255)) / (255 * (259 - value));
  for (let i = 0; i < d.length; i += 4) {
    d[i] = truncate((d[i] - 128) * factor + 128);
    d[i + 1] = truncate((d[i + 1] - 128) * factor + 128);
    d[i + 2] = truncate((d[i + 2] - 128) * factor + 128);
  }
  return pixels;
};

export const grayscaleFilter = pixels => {
  const d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    const v = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
    d[i] = v;
    d[i + 1] = v;
    d[i + 2] = v;
  }
  return pixels;
};

export const blurFilter = (pixels, value, line) => {
  const d = pixels.data;
  for (let v = 0; v < value; v += 1) {
    for (let i = 0; i < d.length; i += 4) {
      const closeData = [
        i - line - 4,
        i - line,
        i - line + 4,
        i - 4,
        i + 4,
        i + line - 4,
        i + line,
        i + line + 4,
      ];

      let sumRed = 0;
      let sumGreen = 0;
      let sumBlue = 0;
      let sumAlpha = 0;
      let cnt = 0;
      for (let j = 0; j < closeData.length; j += 1) {
        if (closeData[j] >= 0 && closeData[j] <= d.length - 3) {
          sumRed += d[closeData[j]];
          sumGreen += d[closeData[j] + 1];
          sumBlue += d[closeData[j] + 2];
          sumAlpha += d[closeData[j] + 3];
          cnt += 1;
        }
      }

      d[i] = sumRed / cnt;
      d[i + 1] = sumGreen / cnt;
      d[i + 2] = sumBlue / cnt;
      d[i + 3] = sumAlpha / cnt;
    }
  }

  return pixels;
};
