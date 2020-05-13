import React from 'react';

const AddTextContent = ({ contentAttribute }) => {
  const { id, width, height, top, left, text, font } = contentAttribute;
  return (
    <div className="add-text-content" style={{ top, left }}>
      {text}
    </div>
  );
};

export default AddTextContent;
