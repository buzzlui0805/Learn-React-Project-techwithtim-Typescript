import MovieCard, { movieProps } from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
	const [searchQuery, setSearchQuery] = useState("");
	const [movies, setMovies] = useState<movieProps[]>([]);

	// Set most recent error message
	const [error, setError] = useState("");

	// Loading state
	const [loading, setLoading] = useState(false);

	// The useEffect is a hook that allows you to perform side effects in your function components.
	// Which means the code inside the useEffect will run after the component is rendered.
	// The second argument of the useEffect is an array of dependencies.
	// If the dependencies change, the code inside the useEffect will run again.
	// If the dependencies are an empty array, the code inside the useEffect will run only once.
	useEffect(() => {
		const loadPopularMovies = async () => {
			try {
				const popularMovies = await getPopularMovies();
				setMovies(popularMovies);
			} catch (err) {
				console.error(err);
				setError("Failed to load popular movies");
			} finally {
				setLoading(false);
			}
		};

		// useContext is used to access the global context value from a parent component.
		// Prevent Prop Drilling
		// Transfer state throught multiple pages in LocalStorage

		loadPopularMovies();
	}, []);

	// Handle search form submission
	const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!searchQuery.trim()) return;
		if (loading) return;
		setLoading(true);

		try {
			const searchResult: movieProps[] = await searchMovies(searchQuery);
			setMovies(searchResult);
			setError("");
		} catch (err) {
			console.error(err);
			setError("Failed to search movies");
		} finally {
			setLoading(false);
		}
		searchMovies(searchQuery);
	};

	return (
		<div className="home">
			<form onSubmit={handleSearch} className="search-form">
				<input
					type="text"
					placeholder="Search for a movies..."
					className="search-input"
					value={searchQuery}
					onChange={(event) => setSearchQuery(event.target.value)}
				/>
				<button type="submit" className="search-button">
					Search
				</button>
			</form>

			{error && <div className="error-message">{error}</div>}

			{loading ? (
				<div className="loading">Loading...</div>
			) : (
				<div className="movies-grid">
					{movies.map((movie) => (
						<MovieCard {...movie} key={movie.id} />
					))}
				</div>
			)}
		</div>
	);
}

export default Home;
