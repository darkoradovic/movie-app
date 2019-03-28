import React, { Component } from 'react';
import './Home.css';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config';
import HeroImage from '../Elements/HeroImage/HeroImage';
import SearchBar from '../Elements/SearchBar/SearchBar';
import FourColGrid from '../Elements/FourColGrid/FourColGrid';
import MovieThumb from '../Elements/MovieThumb/MovieThumb';
import Spinner from '../Elements/Spinner/Spinner';
import LoadMoreBtn from '../Elements/LoadMoreBtn/LoadMoreBtn';

class Home extends Component {

  state = {
    movies: [],
    heroImage: null,
    loader: false,
    currnetPage: 0,
    totalPages: 0,
    searchTerm: ''
  };

  componentDidMount() {
    if (localStorage.getItem('HomeState')) {
      const state = JSON.parse(localStorage.getItem('HomeState'));
      this.setState({ ...state });
    } else {

      this.setState({ loader: true });
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

      this.fetchItems(endpoint);
    }
  };

  searchItems = (searchTerm) => {
    console.log(searchTerm)
    let endpoint = '';
    this.setState({
      movies: [],
      loader: true,
      searchTerm: searchTerm
    })
    if (searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  };

  loadMoreItems = () => {
    let endpoint = '';
    this.setState({ loader: true });

    if (this.state.searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currnetPage + 1}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currnetPage + 1}`
    }
    this.fetchItems(endpoint);
  };


  fetchItems = (endpoint) => {
    fetch(endpoint).then(result => result.json())
      .then(result => {
        //console.log(result);
        this.setState({
          movies: [...this.state.movies, ...result.results],
          heroImage: this.state.heroImage || result.results[0],
          loader: false,
          currnetPage: result.page,
          totalPages: result.totalPages
        }, () => {
          if (this.state.searchTerm === '') {
            localStorage.setItem('HomeState', JSON.stringify(this.state));
          }
        })
      })
  };

  render() {
    const { movies, heroImage, loader, searchTerm } = this.state;

    return (
      <div className="rmdb-home">
        {heroImage ?
          <div>
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
              title={heroImage.original_title}
              text={heroImage.overview}
            />
            <SearchBar callback={this.searchItems} />
          </div> : null}
        <div className="rmdb-home-grid">
          <FourColGrid
            header={searchTerm ? 'Search Result' : 'Popular Movies'}
            loader={loader}
          >
            {movies.map((element, i) => (
              <MovieThumb
                key={i}
                clickable={true}
                image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                movieId={element.id}
                movieName={element.original_title}
              />
            ))}

          </FourColGrid>
          {loader ? <Spinner /> : null}
          <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
        </div>

      </div>

    )
  }
}


export default Home;