import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignInPage } from "./pages/SignInPage";
import { PostsPage } from "./pages/posts/PostsPage";
import { Root } from "./Root";
import { CreatePost } from "./pages/createPost/CreatePost";
import { MyPosts } from "./pages/myPosts/MyPosts";
import { PostsByUser } from "./pages/PostsByUser/PostsByUser";
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <App />,
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/signIn",
				element: <SignInPage />,
			},
			{
				path: "/posts",
				element: <PostsPage />,
			},
			{
				path: "/create-post",
				element: <CreatePost />,
			},
			{
				path: "/my-posts",
				element: <MyPosts />,
			},
			{
				path: "/posts-by-user",
				element: <PostsByUser />,
			},
		],
	},
]);

root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
