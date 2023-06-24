import React from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Modal from 'components/Modal/Modal';

class ImageGallery extends React.Component {
  state = {
    pictures: [],
    totalCount: null,
    isLoading: false,
    currentPage: 1,
    showLoadMore: true,
    showModal: false,
    selectedImage: null,
  };

  createSearchOptions(searchQuery) {
    const BASE_URL = 'https://pixabay.com/api/';
    const My_API_key = '35792081-ad86e3eac8072124d950161bb';
    // const pageNumber = 1;
    const options = new URLSearchParams({
      key: My_API_key,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: 1,
      per_page: 12 * this.state.currentPage,
    });
    return BASE_URL + `?` + options.toString();
  }
  async getFetchImages() {
    try {
      const { data } = await axios.get(
        this.createSearchOptions(this.props.searchQuerry)
      );
      this.setState({ pictures: data, totalCount: data.totalHits });

      console.log(this.state.pictures);
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
      // if (this.state.pictures.totalHits - this.state.currentPage * 12 <= 12) {
      //   this.setState.showLoadMore = false;
      // }
    }
  }

  handleClickLoadMore = () => {
    // if (this.state.pictures - this.state.currentPage * 12 >= 12) {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchQuerry !== this.props.searchQuerry
      // prevState.currentPage !== this.state.currentPage
    ) {
      this.setState({ currentPage: 1 });
      // console.log('Choose searchQuerry');
      // console.log(this.state);
      this.getFetchImages();
      // return;
    } else return;
    if (prevState.currentPage !== this.state.currentPage) {
      this.getFetchImages();
    }

    this.setState({ isLoading: true });
    // const { showLoadMore } = this.state;

    console.log(this.state);

    // try {
    //   const { data } = await axios.get(
    //     this.createSearchOptions(this.props.searchQuerry)
    //   );
    //   this.setState({ pictures: data, totalCount: data.totalHits });

    //   console.log(this.state.pictures);
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   this.setState({ isLoading: false });
    //   // if (this.state.pictures.totalHits - this.state.currentPage * 12 <= 12) {
    //   //   this.setState.showLoadMore = false;
    //   // }
    // }
  }

  render() {
    const pictures = this.state.pictures.hits;
    const totalPictures = this.state.total;
    const { isLoading } = this.state;
    const { showLoadMore } = this.state;
    const { showModal } = this.state;
    const { selectedImage } = this.state;
    // if (this.state.pictures.totalHits - this.state.currentPage * 12 <= 12) {
    //   showLoadMore = false;
    // }

    {
      console.log('Quantity of pictures', pictures);
    }
    return (
      <>
        {isLoading && <Loader />}
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
        {showLoadMore &&
          pictures &&
          this.state.pictures.totalHits - this.state.currentPage * 12 >= 12 && (
            <button
              type="button"
              className={css.loadMore}
              onClick={this.handleClickLoadMore}
            >
              Load More
            </button>
          )}
        {selectedImage && <Modal image={this.state.selectedImage} />}
      </>
    );
  }
}

export default ImageGallery;
