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
    // showLoadMore: true,
    // showModal: false,
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
      console.log('New pictures', newPictures);
      // this.setState({ pictures: data, totalCount: data.totalHits });
      this.setState({ totalCount });
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...newPictures],
      }));
      console.log('Pictures in state', this.state);
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
    if (
      prevProps.searchQuerry !== this.props.searchQuerry
      // prevState.currentPage !== this.state.currentPage
    ) {
      this.setState({ currentPage: 1, pictures: [] });

      console.log('Changed searchQuerry');
      console.log('State will be empty', this.state);
      this.getFetchImages();
      return;
    } else if (prevState.currentPage !== this.state.currentPage) {
      console.log('Changed  current page');
      this.getFetchImages();
    } else return;

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

  toggleModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const pictures = this.state.pictures;
    // const totalPictures = this.state.totalHits;
    const { isLoading } = this.state;
    // const { showLoadMore } = this.state;
    // const { showModal } = this.state;
    const { selectedImage } = this.state;
    // if (this.state.pictures.totalHits - this.state.currentPage * 12 <= 12) {
    //   showLoadMore = false;
    // }

    {
      // console.log('Quantity of pictures', pictures);
    }
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

export default ImageGallery;
