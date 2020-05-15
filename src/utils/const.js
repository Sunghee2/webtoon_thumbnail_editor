// eslint-disable-next-line import/prefer-default-export
export const defaultAdjust = {
  brightness: {
    type: 'slider',
    min: -100,
    max: 100,
    step: 1,
    default: 0,
  },
  contrast: {
    type: 'slider',
    min: -100,
    max: 100,
    step: 1,
    default: 0,
  },
  gray: {
    type: 'checkbox',
    default: false,
  },
  blur: {
    type: 'slider',
    min: 0,
    max: 100,
    step: 1,
    default: 0,
  },
};
