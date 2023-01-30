import React from 'react';

interface GalleryItemProps {
  index: number;
  imgUrl: string;
  title: string;
  width: number;
  height: number;
}

const GalleryItem = (props: GalleryItemProps) => {
  return (
    <div
      className={`card card-${props.index}`}
      style={{ height: props.height, width: props.width }}
    >
      <img
        src="/image1.jpg"
        alt=""
        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
      />
      <p>card text</p>
    </div>
  );
};

export default GalleryItem;
