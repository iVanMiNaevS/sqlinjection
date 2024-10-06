import React, { useEffect, useState } from "react";
import { Loading } from "../../components/Loading/Loading";
import { IPost, PostCard } from "../../components/PostCard/PostCard";
import { useLocation } from "react-router-dom";
type body = { id: number };
export const PostsByUser = () => {
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState<IPost[]>([]);
	const [error, setError] = useState("");
	const [update, setUpdate] = useState(true);
	const [name, setName] = useState("");
	const params = useLocation();
	async function startFetch() {
		try {
			const response: IPost[] = await (
				await fetch(`http://localhost:3500/post/getByUser${params.search}`, {
					method: "get",
					headers: {
						"Content-Type": "application/json;charset=utf-8",
					},
				})
			).json();
			setPosts(response);
			const response2 = await (
				await fetch("http://localhost:3500/user/getOne", {
					method: "POST",
					headers: {
						"Content-Type": "application/json;charset=utf-8",
					},
					body: JSON.stringify({ id: params.search.split("=")[1] }),
				})
			).json();
			setName(`${response2.name} ${response2.surname}`);
		} catch (e) {
			setError((e as Error).message);
		}
		setLoading(false);
	}
	useEffect(() => {
		startFetch();
	}, []);
	return (
		<div className="container postsByUser">
			{!loading ? (
				<>
					{posts.length === 0 ? (
						<h2 style={{ textAlign: "center" }}>
							{error ? error : "У этого пользователя пока что нет постов"}
						</h2>
					) : (
						<>
							<h2 style={{ marginBottom: "30px" }}>Posts user {name}</h2>
							<div className="posts_list">
								{posts.map((post) => (
									<PostCard
										key={post.id}
										post={post}
										myPost={false}
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
