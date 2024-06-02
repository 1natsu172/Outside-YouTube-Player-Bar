import { MantineProvider, createTheme } from "@mantine/core";
import type { ReactNode } from "react";

type MantineProviderProps = Parameters<typeof MantineProvider>[0];
export type UIProviderConfig = MantineProviderProps;

const theme = createTheme({
	colors: {
		// NOTE: YT color based colors that created at https://mantine.dev/colors-generator/?color=FF0000
		myColor: [
			"#ffe8e8",
			"#ffcfcf",
			"#ff9b9c",
			"#ff6464",
			"#fe3837",
			"#fe1b19",
			"#ff0909",
			"#e40000",
			"#cb0000",
			"#b10000",
		],
	},
	/** Put your mantine theme override here */
	primaryColor: "myColor",
	autoContrast: true,
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
