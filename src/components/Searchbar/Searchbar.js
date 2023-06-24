import React from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

class Searchbar extends React.Component {
  state = {
    searchWord: '',
  };
  handleChange = e => {
    this.setState({ searchWord: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    // console.log(this.state.searchWord);
    if (this.state.searchWord.trim() === '') {
      toast('Enter search value');
      this.reset();
      return;
    }
    this.props.onSubmit(this.state.searchWord);
    this.reset();
  };

  reset = () => {
    this.setState({ searchWord: '' });
  };

  render() {
    return (
      <header className={css.searchbar} onSubmit={this.handleSubmit}>
        <form className={css.searchForm}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            value={this.state.searchWord}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
