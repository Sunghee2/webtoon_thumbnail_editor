export const brightnessFilter = (pixels, value) => {
  const d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] += value / 3;
    d[i + 1] += value / 3;
    d[i + 2] += value / 3;
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
