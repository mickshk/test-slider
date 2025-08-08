<template>
	<div
		class="card"
		@click="toggleFull">
		<div class="card-head">
			<img
				:alt="`Avatar of user ${post.id}`"
				:src="avatarUrl"
				height="48"
				loading="lazy"
				width="48"
				class="card-img" />
			<a
				:href="`https://jsonplaceholder.typicode.com/users/${post.id}`"
				@click.stop
				rel="noopener noreferrer"
				target="_blank"
				class="card-name">
				{{ authorName }}
			</a>
		</div>
		<span class="card-title">{{ post.title }}</span>
		<p class="card-text">{{ showFull ? post.body : trimmedBody }}</p>
	</div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
	post: { type: Object, required: true },
	authorName: { type: String, default: "Unknown author" },
	avatarUrl: { type: String, required: true },
});

const showFull = ref(false);
const toggleFull = () => {
	showFull.value = !showFull.value;
};

const trimmedBody = computed(() => {
	const text = props.post?.body ?? "";
	return text.length <= 100 ? text : text.slice(0, 100).trim() + "…";
});
</script>

<style lang="scss">
.card {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	max-width: 500px;
	background: $color-white;
	border: 1px solid $border-color;
	border-radius: 12px;
	padding: 16px;
	margin: 20px auto;
	transition: box-shadow 0.2s ease, transform 0.2s ease;
	box-shadow: $shadow-sm;
	cursor: pointer;

	&:hover {
		box-shadow: $shadow-md;
	}

	&-head {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
		margin-bottom: 8px;
	}

	&-img {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		border: 2px solid $border-color;
		background: #f3f4f6;
	}

	&-name {
		font-size: 14px;
		color: $color-primary;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}

		&:focus-visible {
			outline: 2px solid rgba($color-primary, 0.35);
			outline-offset: 2px;
			border-radius: 4px;
		}
	}

	&-title {
		font-size: 16px;
		font-weight: 600;
		color: $text-color;
		margin-bottom: 8px;
	}

	&-text {
		font-size: 15px;
		color: $color-secondary;
		line-height: 1.5;
		margin: 0;
	}
}
</style>
