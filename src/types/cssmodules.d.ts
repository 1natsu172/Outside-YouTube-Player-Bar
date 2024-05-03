// ref: https://github.com/mrmckeb/typescript-plugin-css-modules?tab=readme-ov-file#custom-definitions
// FIXME(future): ViteがCSSの型生成まだ難しそうなのでTSコンパイラにまかせて実際はなにも型生成しない

declare module "*.module.css" {
	const classes: { [key: string]: string };
	export default classes;
}

declare module "*.module.scss" {
	const classes: { [key: string]: string };
	export default classes;
}

declare module "*.module.sass" {
	const classes: { [key: string]: string };
	export default classes;
}

declare module "*.module.less" {
	const classes: { [key: string]: string };
	export default classes;
}

declare module "*.module.styl" {
	const classes: { [key: string]: string };
	export default classes;
}
