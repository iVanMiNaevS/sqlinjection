import React, { useEffect, useState } from "react";
import { Loading } from "../../components/Loading/Loading";
import { IPost, PostCard } from "../../components/PostCard/PostCard";
import "./PostsPage.css";
import { useLocation } from "react-router-dom";
export const PostsPage = () => {
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState<IPost[]>([]);
	const [error, setError] = useState("");
	const params = useLocation();
	console.log(params);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response: IPost[] = await (
					await fetch(`http://localhost:3500/posts/get${params.search}`)
				).json();
				setPosts(response);
			} catch (e) {
				setError((e as Error).message);
			}
			setLoading(false);
		};
		fetchData();
	}, []);
	return (
		<div className="container">
			{!loading ? (
				<>
					{posts.length === 0 ? (
						<h2 style={{ textAlign: "center" }}>
							{error ? error : "Постов пока что нет"}
						</h2>
					) : (
						<div className="posts_list">
							{posts.map((post) => (
								<PostCard key={post.id} post={post} myPost={false} />
							))}
						</div>
					)}
				</>
			) : (
				<Loading />
			)}
		</div>
	);
};
