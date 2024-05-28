import { useStorage } from "@/core/presenters/storagePresenter/useStorageHooks/index.js";
import { debugMode } from "@/core/repositories/options.repository.js";
import { Card, Flex, Group, Text } from "@mantine/core";
import style from "./FormField.module.css";

export type FieldViewProps = {
	title: string;
	description?: string;
	isLoading: boolean;
	children?: JSX.Element;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	formState?: any;
};
export const FormField = ({
	children: FieldKnob,
	isLoading,
	title,
	description,
	formState,
}: FieldViewProps) => {
	const { store: isDebug } = useStorage(debugMode);

	return (
		<Flex
			align="center"
			justify="space-between"
			wrap="wrap"
			pl={"lg"}
			mb={"xl"}
			columnGap={"xl"}
			rowGap={"md"}
		>
			<Flex direction={"column"}>
				<Text fz={"h3"} fw={"bold"}>
					{title}
				</Text>
				<Text size="md" c="dimmed" className={style.description}>
					{description}
				</Text>
			</Flex>
			<Flex direction={"column"} maw={"100%"} flex={1}>
				<Group justify="flex-end">{FieldKnob}</Group>
				{isDebug && (
					<Card withBorder radius={"md"} mt={"md"}>
						<pre className={style.pre}>
							{JSON.stringify({ [title]: formState }, null, 2)}
						</pre>
					</Card>
				)}
			</Flex>
		</Flex>
	);
};
