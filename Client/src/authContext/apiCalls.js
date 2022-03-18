import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./authAction";

export const login = async (user, dispatch) => {
	dispatch(loginStart());
	try {
		const res = await axios.post("http://127.0.0.1:5000/api/auth/login", user);
        console.log(res)
		dispatch(loginSuccess(res.data));
	} catch (err) {
		dispatch(loginFailure());
	}
};
