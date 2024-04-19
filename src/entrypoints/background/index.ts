export default defineBackground({
	type: "module",
	main: () => {
		console.log("Hello background!", { id: browser.runtime.id });
	},
});
