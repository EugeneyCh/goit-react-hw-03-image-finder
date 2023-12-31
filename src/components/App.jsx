import Searchbar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import PropTypes from 'prop-types';
import React from 'react';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends React.Component {
  state = {
    searchQuerry: '',
  };

  handleFormSubmit = searchQuerry => {
    this.setState({ searchQuerry });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuerry={this.state.searchQuerry} />
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    );
  }
}

App.propTypes = {
  searchQuerry: PropTypes.string,
};

export default App;
