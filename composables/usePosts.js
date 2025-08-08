export const usePosts = () => {
	const { data } = useAsyncData(
		"posts",
		async () => {
			const posts = await $fetch(
				"https://jsonplaceholder.typicode.com/posts?_limit=10"
			);

			const users = await $fetch("https://jsonplaceholder.typicode.com/users");
			const userById = new Map(users.map((user) => [user.id, user]));

			return posts.map((post) => ({
				...post,
				authorName: userById.get(post.id)?.name ?? "Unknown author",
				avatarUrl: `https://api.dicebear.com/9.x/avataaars/svg?seed=${post.id}`,
			}));
		},
		{ server: true }
	);

	return { posts: data };
};
