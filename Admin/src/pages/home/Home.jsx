import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function Home() {
	const MONTHS = useMemo(
		() => [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Agu",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		[]
	);

	const [userStats, setUserStats] = useState([]);

	useEffect(() => {
		const getStats = async () => {
			try {
				console.log(111111111);
				const res = await axios.get("http://127.0.0.1:5000/api/users/stats", {
					headers: {
						token:
							"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjAwMjk0MDU1M2JjMDU1ZDBlNjYyMCIsImlhdCI6MTY0MzIwNzI2MCwiZXhwIjoxNjUwOTgzMjYwfQ.7TF7cAxqIhHR5oe7qRwNZ1DBbztsf3gncDmtFWxLbrY",
					},
				});
				const statsList = res.data.sort(function (a, b) {
					return a._id - b._id;
				});
				// console.log(res);
				statsList.map((item) =>
					setUserStats((prev) => [
						...prev,
						{ name: MONTHS[item._id - 1], "New User": item.total },
					])
				);
			} catch (err) {
				console.log(err);
			}
		};
		getStats();
	}, [MONTHS]);

	return (
		<div className="home">
			<FeaturedInfo />
			<Chart data={userStats} title="User Analytics" grid dataKey="New User" />
			<div className="homeWidgets">
				<WidgetSm />
				<WidgetLg />
			</div>
		</div>
	);
}
