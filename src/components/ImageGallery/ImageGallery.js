import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Modal from 'components/Modal/Modal';

class ImageGallery extends React.Component {
  state = {
    pictures: [],
    totalCount: 0,
    isLoading: false,
    currentPage: 1,
    selectedImage: null,
  };

  createSearchOptions(searchQuery) {
    const BASE_URL = 'https://pixabay.com/api/';
    const My_API_key = '35792081-ad86e3eac8072124d950161bb';
    const options = new URLSearchParams({
      key: My_API_key,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.state.currentPage,
      per_page: 12,
    });
    return BASE_URL + `?` + options.toString();
  }
  async getFetchImages() {
    this.setState({ isLoading: true });

    try {
      const { data } = await axios.get(
        this.createSearchOptions(this.props.searchQuerry)
      );
      const totalCount = data.totalHits;
      const newPictures = data.hits;
      this.setState({ totalCount });
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...newPictures],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleClickLoadMore = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuerry === this.props.searchQuerry) {
      if (
        prevState.currentPage !== this.state.currentPage &&
        this.state.currentPage !== 1
      ) {
        // console.log('Changed  current page');
        this.getFetchImages();
      }
      return;
    }
    if (prevProps.searchQuerry !== this.props.searchQuerry) {
      this.setState({ currentPage: 1, pictures: [] }, () => {
        this.getFetchImages();
        // console.log('Render new query');
      });
    }
  }

  toggleModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { pictures, isLoading, selectedImage } = this.state;

    return (
      <>
        <ul className={css.imageGallery}>
          {pictures &&
            pictures.map(picture => (
              <ImageGalleryItem
                key={picture.id}
                image={picture.webformatURL}
                onClick={() => {
                  this.setState({ selectedImage: picture.largeImageURL });
                }}
              />
            ))}
        </ul>
        {isLoading && <Loader />}

        {!isLoading &&
          pictures &&
          this.state.totalCount - (this.state.currentPage - 1) * 12 >= 12 && (
            <button
              type="button"
              className={css.button}
              onClick={this.handleClickLoadMore}
            >
              Load More
            </button>
          )}
        {selectedImage && (
          <Modal image={this.state.selectedImage} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchQuerry: PropTypes.string.isRequired,
};

export default ImageGallery;
