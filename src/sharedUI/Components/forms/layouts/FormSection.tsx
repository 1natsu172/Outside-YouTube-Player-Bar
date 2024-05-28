import { Card, Text } from "@mantine/core";
import type { ReactNode } from "react";

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
}: { children?: ReactNode; title: string }) => {
	return (
		<Card withBorder p={"md"} radius={"md"}>
			<Text fz={"h3"} fw={"bold"} mb={"md"}>
				{title}
			</Text>
			{children}
		</Card>
	);
};
