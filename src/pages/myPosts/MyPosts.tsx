import React, { useEffect, useState } from "react";
import { Loading } from "../../components/Loading/Loading";
import { IPost, PostCard } from "../../components/PostCard/PostCard";
import "./MyPosts.css";
import { useLocation } from "react-router-dom";
type body = { id: number };

export const MyPosts = () => {
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState<IPost[]>([]);
	const [error, setError] = useState("");
	const [update, setUpdate] = useState(true);
	const params = useLocation();
	const fetchData = async () => {
		try {
			const response: IPost[] = await (
				await fetch(`http://localhost:3500/post/getUserPosts${params.search}`, {
					method: "Get",
					headers: {
						"Content-Type": "application/json;charset=utf-8",
					},
				})
			).json();
			console.log(response);
			setPosts(response);
		} catch (e) {
			setError((e as Error).message);
		}
		setLoading(false);
		console.log("render");
	};
	useEffect(() => {
		fetchData();
	}, [update]);
	// //////////////////////////////////////////////////////////////////из за posts в зависимостях создаётся бесконечный rerender
	return (
		<div className="container myPosts">
			{!loading ? (
				<>
					{posts.length === 0 ? (
						<h2 style={{ textAlign: "center" }}>
							{error ? error : "У вас пока что нет постов"}
						</h2>
					) : (
						<>
							<h2>My posts</h2>
							<div className="posts_list">
								{posts.map((post) => (
									<PostCard
										key={post.id}
										post={post}
										myPost={true}
										setUpdate={setUpdate}
									/>
								))}
							</div>
						</>
					)}
				</>
			) : (
				<Loading />
			)}
		</div>
	);
};
