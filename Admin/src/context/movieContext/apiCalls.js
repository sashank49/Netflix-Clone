import axios from "axios";
import {
	createMovieFailure,
	createMovieStart,
	createMovieSuccess,
	deleteMovieFailure,
	deleteMovieStart,
	deleteMovieSuccess,
	getMoviesFailure,
	getMoviesStart,
	getMoviesSuccess,
} from "./movieActions";

export const getMovies = async (dispatch) => {
	dispatch(getMoviesStart());
	try {
		console.log(JSON.parse(localStorage.getItem("user")).token);
		const res = await axios.get("http://127.0.0.1:5000/api/movies", {
			headers: {
				token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
			},
		});
		console.log(res.data);
		dispatch(getMoviesSuccess(res.data.data));
	} catch (err) {
		console.log(err);
		dispatch(getMoviesFailure());
	}
};

//create
export const createMovie = async (movie, dispatch) => {
	dispatch(createMovieStart());
	try {
		const res = await axios.post("http://127.0.0.1:5000/api/movies", movie, {
			headers: {
				token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
			},
		});
		dispatch(createMovieSuccess(res.data));
	} catch (err) {
		dispatch(createMovieFailure());
	}
};

//delete
export const deleteMovie = async (id, dispatch) => {
	dispatch(deleteMovieStart());
	try {
		await axios.delete("http://127.0.0.1:5000/api/movies/" + id, {
			headers: {
				token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
			},
		});
		dispatch(deleteMovieSuccess(id));
	} catch (err) {
		dispatch(deleteMovieFailure());
	}
};
