import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WidgetSm() {
	const [newUsers, setNewUsers] = useState([]);

	useEffect(() => {
		const getNewUsers = async () => {
			try {
				const res = await axios.get(
					"http://127.0.0.1:5000/api/users?new=true",
					{
						headers: {
							token:
								"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjAwMjk0MDU1M2JjMDU1ZDBlNjYyMCIsImlhdCI6MTY0MzIwNzI2MCwiZXhwIjoxNjUwOTgzMjYwfQ.7TF7cAxqIhHR5oe7qRwNZ1DBbztsf3gncDmtFWxLbrY",
						},
					}
				);
				//console.log(res.data.data);
				setNewUsers(res.data);
				//console.log(newUsers);
			} catch (err) {
				console.log(err);
			}
		};
		getNewUsers();
	}, []);

	return (
		<div className="widgetSm">
			<span className="widgetSmTitle">New Join Members</span>
			<ul className="widgetSmList">
				{newUsers.map((user) => (
					<li className="widgetSmListItem">
						<img
							src={
								user.profilePic ||
								"https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
							}
							alt=""
							className="widgetSmImg"
						/>
						<div className="widgetSmUser">
							<span className="widgetSmUsername">{user.username}</span>
						</div>
						<button className="widgetSmButton">
							<Visibility className="widgetSmIcon" />
							Display
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
