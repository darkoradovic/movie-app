import React, { Component } from 'react'
import { API_URL, API_KEY } from '../../config';
import Navigation from '../Elements/Navigation/Navigation';
import MovieInfo from '../Elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../Elements/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../Elements/FourColGrid/FourColGrid';
import Actor from '../Elements/Actor/Actor';
import Spinner from '../Elements/Spinner/Spinner';
import './Movie.css';

class Movie extends Component {

    state = {
        movie: null,
        actors: null,
        directors: [],
        loader: false
    }

    componentDidMount() {
        if (localStorage.getItem(`${this.props.match.params.movieId}`)) {
            const state = JSON.parse(localStorage.getItem(`${this.props.match.params.movieId}`))
            this.setState({ ...state });
        } else {
            this.setState({ loader: true });

            const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-us`;

            this.fetchItems(endpoint);
        }

    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                //console.log(result);
                if (result.status_code) {
                    this.setState({ loader: false });
                } else {
                    this.setState({ movie: result }, () => {
                        const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
                        fetch(endpoint)
                            .then(result => result.json())
                            .then(result => {
                                const directors = result.crew.filter((member) => member.job === 'Director');

                                this.setState({ actors: result.cast, directors: directors, loader: false })
                            }, () => {
                                localStorage.setItem(`${this.props.match.params}`, JSON.stringify(this.state))
                            })
                    })
                }
            })
            .catch(error => console.log('Error: ', error))
    }

    render() {
        return (
            <div className="rmdb-movie">
                {this.state.movie ?
                    <div>
                        <Navigation movie={this.props.location.movieName} />
                        <MovieInfo movie={this.state.movie} directors={this.state.directors} />
                        <MovieInfoBar time={this.state.movie.runtime} budget={this.state.movie.budget} revenue={this.state.movie.revenue} />
                    </div>
                    : null}

                {this.state.actors ?
                    <div className="rmdb-movie-grid">
                        <FourColGrid header={'Actors'}>
                            {this.state.actors.map((element, i) => {
                                return <Actor key={i} actor={element} />
                            })}
                        </FourColGrid>
                    </div>
                    : null}

                {!this.state.actors && !this.state.loader ? <h1>No Movie Found</h1> : null}

                {this.state.loader ? <Spinner /> : null}
            </div>
        )
    }
}

export default Movie;