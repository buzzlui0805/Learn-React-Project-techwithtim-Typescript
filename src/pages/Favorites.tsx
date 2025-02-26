import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContexts";
import MovieCard from "../components/MovieCard";

function Favorites() {
	const { favorites } = useMovieContext();

	if (favorites) {
		return (
			<div className="favorites">
				<h2>Your Favorites</h2>
				<div className="movies-grid">
					{favorites.map((movie) => (
						<MovieCard key={movie.id} {...movie} />
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="favorites-empty">
			<h2>No Favorites Movies Yet</h2>
			<p>Go to the home page and select some favorites movies</p>
		</div>
	);
}

export default Favorites;
