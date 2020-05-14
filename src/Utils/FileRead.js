const readImgAsync = img => {
  return new Promise((res, rej) => {
    const reader = new FileReader();

    reader.onload = () => {
      res(reader.result);
    };

    reader.onerror = rej;
    reader.readAsDataURL(img);
  });
};

export default readImgAsync;
