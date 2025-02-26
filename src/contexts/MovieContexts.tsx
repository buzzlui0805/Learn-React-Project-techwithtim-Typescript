/* The The Context file is a manager of Context
Each Context file provides global state and helper function that can be used in multiple application
In this case the global state is the remember the movie that is being favourited by the user
*/

import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { movieProps } from "../components/MovieCard.tsx";

const MovieContext = createContext<MovieContextType | null>(null);

// export const useMovieContext = () => useContext(MovieContext);

export const useMovieContext = () => {
	const context = useContext(MovieContext);
	if (!context) {
		throw new Error("useMovieContext must be used within a MovieProvider");
	}
	return context;
};

// Define the context type
interface MovieContextType {
	favorites: movieProps[];
	addToFavorites: (movie: movieProps) => void;
	removeFromFavorites: (movieId: number) => void;
	isFavorited: (movieId: number) => boolean;
}

// Provide state to any component that is wrapped in the MovieProvider
// In this case, the state is wrap in the entire <App /> component in src/index.tsx
// children in a component a param is a reserve word that means anything that's inside of the component rendered
export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [favorites, setFavorites] = useState<movieProps[]>([]);

	// looking into the local storage when we first load the app
	// to see if there is any favourited movie
	useEffect(() => {
		const storedFavs = localStorage.getItem("favorites");

		// if there is any favourited movie, we will setFavourites in a JSON Format
		//  as local storage only store string
		if (storedFavs) {
			setFavorites(JSON.parse(storedFavs));
		}
	}, []);

	// Anytime favourites change, we will update the local storage
	// to reflect the new state of the favourites
	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	// Add a movie to the favourites
	const addToFavorites = (movie: movieProps) => {
		setFavorites((prev) => [...prev, movie]);
	};

	// Remove a movie from the favourites
	const removeFromFavorites = (movieId: number) => {
		setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
	};

	// Check if a movie is under the favourites context
	const isFavorited = (movieId: number) => {
		return favorites.some((movie) => movie.id === movieId);
	};

	const value: MovieContextType = {
		favorites,
		addToFavorites,
		removeFromFavorites,
		isFavorited,
	};

	return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
