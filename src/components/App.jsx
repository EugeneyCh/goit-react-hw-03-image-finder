import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import React from 'react';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends React.Component {
  state = {
    // pictures: [],
    searchQuerry: '',
    // currentPage: 1,
    // url: '',
  };

  handleFormSubmit = searchQuerry => {
    // console.log(this.state.searchQuerry);

    this.setState({ searchQuerry });
    // console.log('Search :', searchQuerry);
    // console.log(this.state.searchQuerry);
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchQuerry={this.state.searchQuerry}
          // currentPage={this.state.currentPage}
        />
        {/* <ImageGallery
          children={<ImageGalleryItem pictures={this.state.pictures} />}
        /> */}
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    );
  }
}

export default App;
