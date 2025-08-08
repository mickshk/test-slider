// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	ssr: true,
	app: { head: { title: "test-slider" } },
	css: [
		"normalize.css",
		"swiper/css",
		"swiper/css/navigation",
		"swiper/css/pagination",
		"~/assets/main.scss",
	],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "@/assets/variables.scss" as *;`,
				},
			},
		},
	},
});
