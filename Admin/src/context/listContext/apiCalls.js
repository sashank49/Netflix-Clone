import axios from "axios";
import {
	createListFailure,
	createListStart,
	createListSuccess,
	deleteListFailure,
	deleteListStart,
	deleteListSuccess,
	getListsFailure,
	getListsStart,
	getListsSuccess,
} from "./ListActions";

export const getLists = async (dispatch) => {
	dispatch(getListsStart());
	try {
		console.log("hello");
		const res = await axios.get("http://127.0.0.1:5000/api/lists", {
			headers: {
				token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
			},
		});
		console.log(res.data);
		dispatch(getListsSuccess(res.data));
	} catch (err) {
		dispatch(getListsFailure());
	}
};

//create
export const createList = async (list, dispatch) => {
	dispatch(createListStart());
	try {
		const res = await axios.post("http://127.0.0.1:5000/api/lists", list, {
			headers: {
				token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
			},
		});
		console.log(res.data);
		dispatch(createListSuccess(res.data));
	} catch (err) {
		dispatch(createListFailure());
	}
};

//delete
export const deleteList = async (id, dispatch) => {
	dispatch(deleteListStart());
	try {
		await axios.delete("http://127.0.0.1:5000/api/lists/" + id, {
			headers: {
				token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
			},
		});
		dispatch(deleteListSuccess(id));
	} catch (err) {
		dispatch(deleteListFailure());
	}
};
