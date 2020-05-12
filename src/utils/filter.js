const brightnessFilter = (pixels, value) => {
  const d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] += value / 3;
    d[i + 1] += value / 3;
    d[i + 2] += value / 3;
  }
  return pixels;
};

export default brightnessFilter;
