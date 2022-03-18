import React, { useState, useEffect } from "react";
import "./home.scss";
import NavBar from "../../components/NavBar";
import Featured from "../../components/Featured";
import List from "../../components/List";
import Register from "../Register/Register";
import Login from "../Login/Login";
import axios from "axios";

const Home = ({ type }) => {
	const [lists, setLists] = useState([]);
	const [genre, setGenre] = useState(null);
	console.log(
		`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`
	);
	useEffect(() => {
		const getRandomLists = async () => {
			try {
				const res = await axios.get(
					`lists${type ? "?type=" + type : ""}${
						genre ? "&genre=" + genre : ""
					}`,
					{
						headers: {
							token:
								"Bearer " +
								JSON.parse(localStorage.getItem("user")).accessToken,
							// JSON.parse(localStorage.getItem("user")).accessToken,
						},
					}
				);
				console.log(res.data);
				setLists(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getRandomLists();
	}, [type, genre]);
	return (
		<div className="home">
			<NavBar />
			<Featured type={type} setGenre={setGenre} />
			{lists.map((list) => (
				<List list={list} />
			))}
		</div>
	);
};

export default Home;
