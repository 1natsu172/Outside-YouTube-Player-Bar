import { useStorage } from "@/core/presenters/storagePresenter/useStorageHooks/index.js";
import { debugMode } from "@/core/repositories/options.repository.js";
import { Card, Title } from "@mantine/core";
import type { ReactNode } from "react";

export type FormGroupProps = {
	title: string;
	children?: ReactNode;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	formState?: any;
};
export const FormGroup = ({ title, children, formState }: FormGroupProps) => {
	const { store: isDebug } = useStorage(debugMode);

	return (
		<Card withBorder radius="lg" mb={"md"}>
			<Title order={2} mb={"md"}>
				{title}
			</Title>
			{children}
			{isDebug && (
				<Card.Section withBorder>
					<pre>{JSON.stringify({ [title]: formState }, null, 2)}</pre>
				</Card.Section>
			)}
		</Card>
	);
};
