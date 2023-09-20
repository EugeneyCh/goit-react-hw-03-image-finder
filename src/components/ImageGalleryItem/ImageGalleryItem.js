import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends React.Component {
  render() {
    const { itemKey, image } = this.props;
    return (
      <li
        key={itemKey}
        className={css.galleryItem}
        onClick={this.props.onClick}
      >
        <img src={image} alt={image} />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  itemKey: PropTypes.number,
  image: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
