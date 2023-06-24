import React from 'react';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends React.Component {
  render() {
    const { key, image } = this.props;
    console.log(key, image);
    return (
      <li key={key} className={css.galleryItem} onClick={this.props.onClick}>
        <img src={image} alt={image} />
      </li>
    );
  }
}

export default ImageGalleryItem;
