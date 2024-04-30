import type { ReactNode } from "react";

interface Props {
	children?: ReactNode;
}
export const UIProvider = ({ children }: Props) => {
	return <>{children}</>;
};
