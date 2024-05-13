import { MantineProvider, createTheme } from "@mantine/core";
import type { ReactNode } from "react";

type MantineProviderProps = Parameters<typeof MantineProvider>[0];
export type UIProviderConfig = MantineProviderProps;

const theme = createTheme({
	/** Put your mantine theme override here */
});

type Props = {
	children: ReactNode;
} & { config?: UIProviderConfig };
export const UIProvider = ({ children, config }: Props) => {
	return (
		<MantineProvider theme={theme} {...config}>
			{children}
		</MantineProvider>
	);
};
