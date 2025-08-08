<template>
	<client-only>
		<Swiper
			:modules="modules"
			:slides-per-view="1"
			:loop="true"
			:navigation="true"
			:pagination="{ clickable: true }"
			:autoplay="{
				delay: 3000,
				disableOnInteraction: false,
				pauseOnMouseEnter: false,
			}"
			@swiper="onSwiper"
			@mouseenter="onEnter"
			@mouseleave="onLeave">
			<SwiperSlide
				v-for="post in posts"
				:key="post.id">
				<Card
					:post="post"
					:authorName="post.authorName"
					:avatarUrl="post.avatarUrl" />
			</SwiperSlide>
		</Swiper>
	</client-only>

	<div class="swiper-footer">
		<button
			class="swiper-button"
			@click="isAutoplay = !isAutoplay">
			{{ isAutoplay ? "autoplay: on" : "autoplay: off" }}
		</button>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Card from "~/components/Card.vue";

const props = defineProps({ posts: { type: Array, required: true } });

const modules = [Navigation, Pagination, Autoplay];
const isAutoplay = ref(true);

const swiper = ref(null);
const onSwiper = (inst) => {
	swiper.value = inst;
	isAutoplay.value ? inst.autoplay?.start() : inst.autoplay?.stop();
};

watch(isAutoplay, (v) => {
	if (!swiper.value) return;
	v ? swiper.value.autoplay?.start() : swiper.value.autoplay?.stop();
});

const onEnter = () => isAutoplay.value && swiper.value?.autoplay?.pause();
const onLeave = () => isAutoplay.value && swiper.value?.autoplay?.resume();
</script>

<style lang="scss">
.swiper {
	border-radius: 10px;

	&-pagination {
		position: relative;
	}

	&-footer {
		display: flex;
		justify-content: center;
		margin-top: 10px;
	}

	&-button {
		appearance: none;
		border: 0;
		background: $color-primary;
		color: $color-white;
		padding: 8px 14px;
		border-radius: 8px;
		font-size: 14px;
		line-height: 1;
		cursor: pointer;
		transition: box-shadow 0.2s ease, transform 0.2s ease;
		box-shadow: $shadow-sm;

		&:hover {
			box-shadow: $shadow-md;
		}
	}
}
</style>
