import { useStorage } from "@/core/presenters/storagePresenter/useStorageHooks/index.js";
import { debugMode } from "@/core/repositories/options.repository.js";
import { Card, Group, ThemeIcon, Title } from "@mantine/core";
import type { Icon, IconProps } from "@tabler/icons-react";
import type {
	ForwardRefExoticComponent,
	ReactNode,
	RefAttributes,
} from "react";

export type FormGroupProps = {
	title: string;
	Icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
	children?: ReactNode;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	formState?: any;
};
export const FormGroup = ({
	title,
	Icon,
	children,
	formState,
}: FormGroupProps) => {
	const { store: isDebug } = useStorage(debugMode);

	return (
		<Card withBorder radius="lg" mb={"md"}>
			<Group gap={"sm"} mb={"sm"}>
				<ThemeIcon
					variant="gradient"
					size="lg"
					aria-label="Gradient action icon"
					gradient={{ from: "blue", to: "cyan", deg: 90 }}
				>
					<Icon />
				</ThemeIcon>
				<Title order={2}>{title}</Title>
			</Group>
			{children}
			{isDebug && (
				<Card.Section withBorder>
					<pre>{JSON.stringify({ [title]: formState }, null, 2)}</pre>
				</Card.Section>
			)}
		</Card>
	);
};
