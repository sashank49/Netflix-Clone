import Home from "./pages/home/Home";
import "./app.scss";
import Watch from "./pages/watch/Watch.js";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/authContext";

const App = () => {
	const { user } = useContext(AuthContext);
	console.log(user);
	return (
		<Switch>
			<Route exact path="/">
				{user ? <Home /> : <Redirect to="/login" />}
			</Route>

			<Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
			<Route path="/register">
				{!user ? <Register /> : <Redirect to="/" />}
			</Route>
			{user && (
				<>
					<Route path="/movies">
						<Home type="movie" />
					</Route>
					<Route path="/series">
						<Home type="series" />
					</Route>
					<Route path="/watch">
						<Watch />
					</Route>
				</>
			)}
		</Switch>
	);
};

export default App;
