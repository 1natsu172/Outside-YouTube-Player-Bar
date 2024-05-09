import { Card, Group, Text, Title } from "@mantine/core";
import { LoadingSpinner } from "../../parts/LoadingSpinner/index.js";
import { useStorage } from "@/core/presenters/storagePresenter/useStorageHooks/index.js";
import { debugMode } from "@/core/repositories/options.repository.js";

export type FieldViewProps = {
	title: string;
	description?: string;
	isLoading: boolean;
	children?: JSX.Element;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	formState?: any;
};
export const FormField = ({
	children: FormField,
	isLoading,
	title,
	description,
	formState,
}: FieldViewProps) => {
	const { store: isDebug } = useStorage(debugMode);

	return (
		<>
			<Group justify="space-between" pl={"lg"}>
				<div>
					<Title>{title}</Title>
					<Text size="xs" c="dimmed">
						{description}
					</Text>
				</div>
				<Group>
					{isLoading && <LoadingSpinner />}
					{FormField}
				</Group>
			</Group>
			<Card withBorder radius={"md"}>
				{isDebug && (
					<pre>{JSON.stringify({ [title]: formState }, null, 2)}</pre>
				)}
			</Card>
		</>
	);
};
