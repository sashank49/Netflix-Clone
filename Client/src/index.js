import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./authContext/authContext";

ReactDOM.render(
	<BrowserRouter>
		<React.StrictMode>
			<AuthContextProvider>
				<App />
			</AuthContextProvider>
		</React.StrictMode>
	</BrowserRouter>,
	document.getElementById("root")
);
