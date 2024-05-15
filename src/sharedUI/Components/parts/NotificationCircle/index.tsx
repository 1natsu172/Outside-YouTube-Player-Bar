import style from "./index.module.css";

type P = {
	circleFill?: string;
};
export const NotificationCircle = ({ circleFill }: P) => {
	return (
		<div
			className={style.circle}
			data-circle-fill={circleFill ? circleFill : undefined}
			// @ts-expect-error
			style={{ "--circle-fill": circleFill }}
		/>
	);
};
