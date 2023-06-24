import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends React.Component {
  render() {
    const { key, image } = this.props;
    return (
      <li key={key} className={css.galleryItem} onClick={this.props.onClick}>
        <img src={image} alt={image} />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  key: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
