import { Card, Group, Text, ThemeIcon } from "@mantine/core";
import type { Icon, IconProps } from "@tabler/icons-react";
import type {
	ForwardRefExoticComponent,
	ReactNode,
	RefAttributes,
} from "react";

export const FormFieldsSection = ({
	children,
	title,
}: { children?: ReactNode; title: string }) => {
	return (
		<Card.Section withBorder p={"md"}>
			<Text fz={"h3"} fw={"bold"} mb={"md"}>
				{title}
			</Text>
			{children}
		</Card.Section>
	);
};

export const FormFieldsCard = ({
	children,
	title,
	Icon,
}: {
	children?: ReactNode;
	title: string;
	Icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}) => {
	return (
		<Card withBorder p={"md"} radius={"md"}>
			<Group gap={"5"}>
				<ThemeIcon
					variant="gradient"
					size="lg"
					aria-label="Gradient action icon"
					gradient={{ from: "blue", to: "cyan", deg: 90 }}
				>
					<Icon />
				</ThemeIcon>
				<Text fz={"h3"} fw={"bold"}>
					{title}
				</Text>
			</Group>
			{children}
		</Card>
	);
};
