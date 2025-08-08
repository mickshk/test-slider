<template>
	<main>
		<Slider :posts="posts" />
	</main>
</template>

<script setup>
import { usePosts } from "~/composables/usePosts";
import Slider from "~/components/Slider.vue";

const { posts } = usePosts();
</script>
