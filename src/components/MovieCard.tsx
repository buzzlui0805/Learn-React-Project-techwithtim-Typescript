import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContexts";

export interface movieProps {
	id: number;
	title: string;
	release_date: string;
	poster_path: string;
}

function MovieCard({ title, release_date, poster_path, id }: movieProps) {
	const { addToFavorites, removeFromFavorites, isFavorited } = useMovieContext();
	const favorite = isFavorited(id);

	function onFavoriteClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		if (favorite) {
			removeFromFavorites(id);
		} else {
			addToFavorites({ title, release_date, poster_path, id });
		}
	}

	return (
		<div className="movie-card">
			<div className="movie-poster">
				<img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
				<div className="movie-overlay">
					<button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
						♥
					</button>
				</div>
			</div>
			<div className="movie-info">
				<h3>{title}</h3>
				<p>{release_date?.split("-")[0]}</p>
			</div>
		</div>
	);
}

export default MovieCard;
