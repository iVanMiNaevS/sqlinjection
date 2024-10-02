import React, { useEffect, useState } from "react";
import { Loading } from "../../components/Loading/Loading";

export const PostsPage = () => {
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const response = await (
				await fetch("http://localhost:3500/posts/get")
			).json();
			setPosts(response);
			setLoading(false);
		};
		fetchData();
	}, []);
	return (
		<div>
			{!loading ? (
				<>
					{posts.length === 0 ? (
						<h2 style={{ textAlign: "center" }}>Постов пока что нет</h2>
					) : (
						<div>Posts</div>
					)}
				</>
			) : (
				<Loading />
			)}
		</div>
	);
};
