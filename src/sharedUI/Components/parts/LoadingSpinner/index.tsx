import { ProgressSpinner } from "primereact/progressspinner";

export const LoadingSpinner = () => {
	return (
		<ProgressSpinner
			strokeWidth="8"
			fill="var(--surface-ground)"
			animationDuration=".5s"
		/>
	);
};
