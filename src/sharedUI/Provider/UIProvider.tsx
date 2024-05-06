import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeflex/primeflex.css";
import type { ReactNode } from "react";

type PrimeReactProviderProps = Parameters<typeof PrimeReactProvider>[0];
export type UIProviderConfig = PrimeReactProviderProps["value"];

type Props = {
	children: ReactNode;
} & { config?: UIProviderConfig };
export const UIProvider = ({ children, config }: Props) => {
	return <PrimeReactProvider value={config}>{children}</PrimeReactProvider>;
};
