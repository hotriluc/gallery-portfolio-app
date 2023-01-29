import React from 'react';

interface GalleryItemProps {
  index: number;
  imgUrl: string;
  title: string;
}

const GalleryItem = (props: GalleryItemProps) => {
  return (
    <div
      className={`card card-${props.index}`}
      style={{ height: 400, width: 300 }}
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
